# Laravel 12 + React.js + MySQL + NGINX + Node.js + Spatie Roles & Permission Starter Kit with Docker 

A modern starter kit for building full-stack applications with **Laravel 12** and **React.js**, packed with essential tools and features:

- 🔐 **Spatie Roles & Permissions** – Easy role-based access control.
- 🐳 **Dockerized Setup** – Fast and consistent local development environment.
- 🔒 **Self-Signed SSL Support** – Secure HTTPS access with local certificates.
- ⚡ **Vite** – Lightning-fast frontend tooling.
- 🛢 **MySQL Database** – Persistent and reliable storage.

---

## 🚀 Features

- Laravel 12 API backend
- React.js frontend powered by Vite
- Spatie's `laravel-permission` for RBAC
- Docker setup with Nginx, PHP 8.3, MySQL, and Node.js
- HTTPS using self-signed SSL certificates
- Laravel Sanctum for SPA authentication
- Inertia.js for seamless frontend/backend integration

---

## 🔧 NGINX Implementation

NGINX is used as a reverse proxy to serve both the Laravel backend and the React frontend securely over HTTPS. The configuration includes:

- Serving Laravel from `/var/www/html/public`
- Proxying frontend traffic built via Vite
- Enabling SSL using self-signed certificates

Make sure to update `docker/nginx/nginx.conf` and reference the correct certificate paths:
```nginx
ssl_certificate /etc/ssl/localhost.crt;
ssl_certificate_key /etc/ssl/localhost.key;
```

---

## 🛢 MySQL Database

MySQL is used as the primary database, with persistent volume support. Configuration is defined in `docker-compose.yml` as:

```yaml
  db:
    image: mysql:8.0
    env_file:
      - ./docker/mysql/.env.db
    volumes:
      - app_db_data:/var/lib/mysql
```
To update MySQL root environment variables inside the ./docker/mysql/.env.db file, you should include the following variables (or modify existing ones) in the file:
```yaml
# .env.db

MYSQL_DATABASE=laravel
MYSQL_PASSWORD=root
MYSQL_ROOT_PASSWORD=root

```
Update your `.env` file to match these credentials:
```env
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=root
```

---

## ⚙️ Node.js Integration

Node.js is included in the Laravel container to support frontend development tools like Vite. It's used for:

- Installing frontend dependencies via `npm`
- Running development server with `npm run dev`
- Building production assets with `npm run build`

All necessary commands are executed automatically when the Docker container is built.

---
## 📦 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [OpenSSL](https://www.openssl.org/) (for manual SSL certificate generation)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jeevanshrestha/laravel-react-spatie-starter-kit.git
cd laravel-react-spatie-starter-kit
```

### 2. Create `.env` File

Copy the `.env.example` file and update necessary values:

```bash
cp .env.example .env
```

Update `.env`:

```env
APP_NAME="LaravelReactStarter"
APP_URL=https://laravel-react.local
VITE_APP_NAME="${APP_NAME}"
```

Ensure your local hosts file maps the domain:

```bash
echo "127.0.0.1 laravel-react.local" | sudo tee -a /etc/hosts
```

---

### 3. Generate SSL Certificates

Generate self-signed SSL certificates if not already present:

```bash
mkdir -p docker/nginx/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/certs/localhost.key \
  -out docker/nginx/certs/localhost.crt \
  -subj "/C=US/ST=Local/L=Local/O=Dev/OU=LocalDev/CN=localhost"
```
Update the certificate file names in the Dockerfile, vite.config.js, and docker-compose.yml if you are using custom SSL certificates instead of the default `localhost.crt` and `localhost.key`.
---

### 4. Start the Docker Containers

```bash
docker-compose up -d --build
```

All dependencies and setup tasks (composer install, npm install, key generation, migrations, etc.) are handled automatically by the Docker container.

---

## 🔐 Using Spatie Permission

To assign roles and permissions, use Laravel tinker or seeders:

```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => 'admin']);
$permission = Permission::create(['name' => 'manage users']);
$role->givePermissionTo($permission);
$user->assignRole('admin');
```

---

## 🧪 Development Tips
- Start Docker: `docker compose up -d --build`
- Log output: `docker compose logs -f` 
- SSL trust on macOS: `sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain docker/nginx/certs/localhost.crt` 

---

## 502 Error
Wait until php-fpm process starts in app container.
`NOTICE: fpm is running, pid 1`
`NOTICE: ready to handle connections`
``
---

## 📄 License

MIT © Jeevan Shrestha

---

## 🙌 Contributions

Contributions, issues, and suggestions are welcome!
