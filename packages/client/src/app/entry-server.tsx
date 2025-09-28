import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { routes } from './router/routes';
import { AppProviders } from './providers/app-providers';

export async function render(url: string): Promise<{ html: string }> {
  try {
    if (typeof window === 'undefined') {
      process.env.ANTD_DISABLE_LOCALE = 'true';
    }

    const handler = createStaticHandler(routes);
    const context = await handler.query(new Request('http://localhost' + url));
    const router = createStaticRouter(handler.dataRoutes, context);

    const cache = createCache();
    const app = (
      <StyleProvider cache={cache} hashPriority="high">
        <AppProviders>
          <StaticRouterProvider router={router} context={context} />
        </AppProviders>
      </StyleProvider>
    );

    const html = renderToString(app);

    return { html };
  } catch (error) {
    console.error('SSR Error:', error);
    return { html: '<div id="root"></div>' };
  }
}

export default { render };
