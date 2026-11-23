import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const serverDir = await mkdtemp(join(process.cwd(), 'dist-ssr-'));
try {
  await build({
    build: { ssr: 'src/entry-server.jsx', outDir: serverDir, copyPublicDir: false },
  });

  const { renderHomepage } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
  const output = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(output, 'utf8');
  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Missing homepage root in the Vite build.');
  await writeFile(output, html.replace(root, () => '<div id="root">' + renderHomepage() + '</div>'));
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
