#use php:8.3-fpm as base
# syntax=docker/dockerfile:1
FROM php:8.3-fpm as php
# Install dependencies
# First update package lists
RUN apt-get update -y && apt-get upgrade -y

# Install system dependencies in separate RUN commands for better debugging
 

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    nodejs \
    npm \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libmagic-dev \
    libxpm-dev \
    libwebp-dev \
    libpq-dev \
    libmcrypt-dev \
    pkg-config \
    zlib1g-dev \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

 RUN docker-php-ext-install pdo pdo_mysql
 RUN docker-php-ext-install xml ctype fileinfo
 RUN docker-php-ext-install bcmath intl curl zip

# Install GD with freetype and jpeg supportR
RUN  docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm \
&& docker-php-ext-install -j$(nproc) gd \
&& apt-get purge -y --auto-remove libfreetype6-dev libjpeg-dev libpng-dev libwebp-dev libxpm-dev


 
# Install Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
 
WORKDIR /var/www

COPY . .

RUN composer install --no-interaction --optimize-autoloader --no-dev

RUN composer update

# Install npm dependencies and build assets
RUN npm install && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache


# Copy entrypoint script
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

#NGINX stage
FROM nginx:alpine  as nginx

#copy nginx configuration
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/ssl/localhost.crt /etc/nginx/ssl/localhost.crt
COPY ./docker/nginx/ssl/localhost.key /etc/nginx/ssl/localhost.key
RUN chmod 755 /etc/nginx/ssl/localhost.crt
RUN chmod 755 /etc/nginx/ssl/localhost.key

#copy build assets from PHP stage
COPY  --from=php /var/www/public /var/www/public

#Expose port 80

EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

