#!/bin/sh

set -e

cd /var/www



# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h"mysql" -P"3306" --silent; do
    sleep 1
done

echo "MySQL is ready! Running migrations..."

# Run migrations
php artisan migrate --force

# Start PHP-FPM
exec "$@"
