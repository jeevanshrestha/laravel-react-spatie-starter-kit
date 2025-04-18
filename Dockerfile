# Stage 1: PHP Base with Extensions
FROM php:8.3-fpm-alpine as php_base


# Install PHP and system dependencies
RUN apk add --no-cache \
    git curl unzip zip \
    libzip-dev libpng-dev libjpeg-turbo-dev freetype-dev \
    oniguruma-dev libxml2-dev icu-dev \
    curl-dev openssl-dev pkgconfig zlib-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo pdo_mysql mbstring xml ctype fileinfo bcmath intl curl zip gd

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy basic composer files first for caching
COPY composer.json composer.lock ./

# Install composer dependencies (production)
RUN composer install --no-interaction --no-plugins --no-scripts --no-dev --prefer-dist --optimize-autoloader \
    && composer clear-cache

# Copy the rest of the application code
COPY . .

# Set permissions (ensure www-data owns storage/logs for queue worker)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Run composer scripts now that all code is present
RUN composer run-script post-install-cmd --no-interaction --no-dev

# Generate Laravel specific optimizations
RUN php artisan optimize:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

# Stage 2: Node Frontend Build
FROM node:20-alpine as node_builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy frontend source code and build configuration
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY vite.config.ts ./

# Build frontend assets for production
RUN npm run build

# Stage 3: Final Image with Nginx + Supervisor
FROM php_base as final

# Remove default Nginx config
RUN rm /etc/nginx/http.d/default.conf

# Copy custom configurations
COPY .docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY .docker/php/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf 

# Copy built frontend assets from the node_builder stage
COPY --from=node_builder /app/public/build /var/www/html/public/build

 
# Expose port 80
EXPOSE 80
 
# Healthcheck (optional but recommended)
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost/ || exit 1