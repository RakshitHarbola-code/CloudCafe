import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const projectRoot = process.cwd();
const htmlPath = resolve(projectRoot, 'index.html');
const originalHtml = await readFile(htmlPath, 'utf8');
const rootStart = '<!--REACT_ROOT_START-->';
const rootEnd = '<!--REACT_ROOT_END-->';
if (!originalHtml.includes(rootStart) || !originalHtml.includes(rootEnd)) {
  throw new Error('HTML shell must contain React root boundary comments before pre-rendering.');
}

const vite = await createServer({
  configFile: false,
  root: projectRoot,
  logLevel: 'error',
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
});
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(createElement(App));
  const startIndex = originalHtml.indexOf(rootStart);
  const endIndex = originalHtml.indexOf(rootEnd, startIndex + rootStart.length);
  if (endIndex < 0) throw new Error('Could not find the closing React root boundary.');
  const renderedRoot = `<div id="root">${markup}</div>`;
  const outputHtml = originalHtml.slice(0, startIndex + rootStart.length) + renderedRoot + originalHtml.slice(endIndex);
  await writeFile(htmlPath, outputHtml);
  console.log(`Pre-rendered ${markup.length.toLocaleString()} characters of React page content into index.html.`);
} finally {
  await vite.close();
}
