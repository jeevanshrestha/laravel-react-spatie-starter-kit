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
COPY ./docker/nginx/ssl ./docker/nginx/ssl
# Build frontend assets for production
RUN npm run build

# Stage 3: Final Image with Nginx + Supervisor
FROM php_base as final

# Install Nginx 
RUN apk add --no-cache nginx  

# Ensure the Nginx configuration directory exists
RUN mkdir -p /etc/nginx/conf.d/


# Remove the default Nginx configuration file if it exists
RUN rm -f /etc/nginx/conf.d/default.conf


# Copy custom configurations
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY ./docker/nginx/ssl/localhost.key /etc/nginx/ssl/localhost.key

COPY ./docker/php/zz-docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf

# Copy built frontend assets from the node_builder stage
COPY --from=node_builder /app/public/build /var/www/html/public/build

# Expose port 9000
EXPOSE   9000

RUN sed -i 's/^listen = .*/listen = 0.0.0.0:9000/' /usr/local/etc/php-fpm.d/zz-docker.conf

# Copy the entrypoint script
COPY ./docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh


# Change current user to www
USER www-data


# Set the custom entrypoint
ENTRYPOINT ["entrypoint.sh"]

# Default command
CMD ["php-fpm"]

  