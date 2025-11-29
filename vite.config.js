import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './src/index.html',
                about: './src/about.html',
                awards: './src/awards.html',
                conference: './src/conference.html',
                contact: './src/contact.html',
                delegation: './src/delegation.html',
                exhibition: './src/exhibition.html',
                partners: './src/partners.html',
                registration: './src/registration.html'
            }
        }
    }
})
