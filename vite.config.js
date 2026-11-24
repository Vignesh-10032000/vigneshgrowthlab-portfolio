import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { homepageHead } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [
    react(),
    tailwindcss(),
    { name: 'vgl-homepage-metadata', transformIndexHtml: () => homepageHead() },
  ],
  ssr: { noExternal: ['gsap'] },
})
