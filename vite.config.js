import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                conference: resolve(__dirname, 'conference.html'),
                exhibition: resolve(__dirname, 'exhibition.html'),
                awards: resolve(__dirname, 'awards.html'),
                partners: resolve(__dirname, 'partners.html'),
                registration: resolve(__dirname, 'registration.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
});
