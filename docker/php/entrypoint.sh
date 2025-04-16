#!/bin/sh

set -e

cd /var/www

npm run install 
npm run buld


# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h"mysql" -P"3306" --silent; do
    sleep 1
done

echo "MySQL is ready! Running migrations..."

# Run migrations
php artisan migrate --force

# Continue with normal PHP-FPM startup
exec "$@"