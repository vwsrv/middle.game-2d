import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { webcrypto } from 'crypto';

// Polyfill для crypto в Node.js 16
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as never;
}

dotenv.config();

const port = process.env.CLIENT_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '..', '..', '..');

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: clientPath,
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      let appHtml = '';
      let initialState = {};

      try {
        const { render } = await vite.ssrLoadModule(
          './src/app/entry-server.tsx',
        );
        const result = await render(url);
        if (typeof result === 'object' && result.html) {
          appHtml = result.html;
          initialState = result.initialState;
        } else {
          // Fallback для старого формата
          appHtml = result;
        }
      } catch (ssrError) {
        console.warn(
          'SSR failed, falling back to client-side rendering:',
          ssrError,
        );
        appHtml = '<div id="root">Загрузка...</div>';
      }

      const stateScript = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(
        initialState,
      ).replace(/</g, '\\u003c')}</script>`;
      const html = template.replace(
        `<!--ssr-outlet-->`,
        `${appHtml}${stateScript}`,
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
