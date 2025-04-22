import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import fs from 'node:fs';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        https: {
          key: fs.readFileSync('./docker/nginx/ssl/localhost.key'),
          cert: fs.readFileSync('./docker/nginx/ssl/localhost.crt'),
        },
        origin: 'https://localhost:5173',
        hmr: {
          protocol: 'wss',
          host: 'localhost',
        },
        cors: {
          origin: process.env.APP_URL,
          credentials: true,
        },
      },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
