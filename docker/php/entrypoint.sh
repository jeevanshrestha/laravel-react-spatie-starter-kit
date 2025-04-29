#!/bin/sh

# Generate application key
php artisan key:generate

# Storage link 
php artisan storage:link

# Run database migrations
# echo "Running database migrations..."
 php artisan migrate --force

# echo "Database seeding"
 php artisan db:seed --force

# Clear application cache, route cache, view cache, and compiled files
echo "Clearing application cache, route cache, view cache, and compiled files..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Run the default PHP-FPM entrypoint
exec docker-php-entrypoint "$@"
