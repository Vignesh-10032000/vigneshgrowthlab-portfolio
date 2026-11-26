import { pageForPath } from './src/data/marketingPages.js'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { marketingHead, sitemap } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  build: { manifest: true },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'vgl-marketing-dev-pages',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const path = new URL(req.url, 'http://localhost').pathname;
          if (path === '/sitemap.xml') {
            res.setHeader('Content-Type', 'application/xml');
            return res.end(sitemap());
          }
          if (pageForPath(path)) req.url = '/index.html';
          next();
        });
      },
      transformIndexHtml(html, ctx) {
        const path = new URL(ctx.originalUrl || ctx.path, 'http://localhost').pathname;
        return html.replace('<!--vgl-head-->', () => marketingHead(pageForPath(path)));
      },
    },
  ],
  ssr: { noExternal: ['gsap'] },
})
