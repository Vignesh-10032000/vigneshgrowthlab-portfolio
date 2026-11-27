import { mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const serverDir = await mkdtemp(join(process.cwd(), 'dist-ssr-'));
try {
  await build({
    build: { ssr: 'src/entry-server.jsx', outDir: serverDir, copyPublicDir: false },
  });

  const { renderPage, pages, marketingHead, sitemap } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
  const output = join(process.cwd(), 'dist');
  const html = await readFile(join(output, 'index.html'), 'utf8');
  const manifestPath = join(output, '.vite', 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const homeChunk = manifest['src/App.jsx'];
  if (!homeChunk?.file) throw new Error('The homepage chunk is missing from the client build.');
  const homeResources = [
    '<link rel="modulepreload" fetchpriority="low" href="/' + homeChunk.file + '">',
    ...(homeChunk.css ?? []).map(file => '<link rel="stylesheet" href="/' + file + '">'),
  ].join('\n');
  await unlink(manifestPath);
  const root = '<div id="root"></div>';
  if (!html.includes(root) || !html.includes('<!--vgl-head-->')) throw new Error('Missing marketing page template markers.');
  for (const page of [null, ...pages]) {
    const file = join(output, page?.path ?? '/', 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html.replace('<!--vgl-head-->', () => page ? marketingHead(page) : marketingHead(page) + '\n' + homeResources)
      .replace(root, () => '<div id="root">' + renderPage(page) + '</div>'));
  }
  await writeFile(join(output, 'sitemap.xml'), sitemap());
  if (['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
    const headers = join(output, '_headers');
    const rules = await readFile(headers, 'utf8');
    const globalRule = /^\/\*\r?\n/m;
    if (!globalRule.test(rules)) throw new Error('The preview requires a global noindex rule in _headers.');
    await writeFile(headers, rules.replace(globalRule, '/*\n  X-Robots-Tag: noindex\n'));
  }
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
