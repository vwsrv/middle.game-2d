import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

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

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      let appHtml = '';

      try {
        const { render } = await vite.ssrLoadModule(
          './src/app/app-entry-server.tsx',
        );
        appHtml = await render(url);
      } catch (ssrError) {
        console.warn(
          'SSR failed, falling back to client-side rendering:',
          ssrError,
        );
        appHtml = '<div id="root">Загрузка...</div>';
      }

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

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
