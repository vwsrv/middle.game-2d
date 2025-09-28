import { renderToString } from 'react-dom/server';
import { Suspense } from 'react';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import { routes } from './router/routes';
import { AppProviders } from './providers/app-providers';
import { createServerConfig } from '@/shared/utils/ssr-config';

export async function render(url: string): Promise<{ html: string }> {
  try {
    if (typeof window === 'undefined') {
      process.env.ANTD_DISABLE_LOCALE = 'true';
    }

    const handler = createStaticHandler(routes);
    const context = await handler.query(new Request('http://localhost' + url));

    if (context instanceof Response) {
      throw new Error('Router context is a Response, not a context object');
    }

    const router = createStaticRouter(handler.dataRoutes, context);
    const ssrConfig = createServerConfig();

    const app = (
      <Suspense fallback={<div>Loading...</div>}>
        <AppProviders config={ssrConfig}>
          <StaticRouterProvider router={router} context={context} />
        </AppProviders>
      </Suspense>
    );

    const html = renderToString(app);

    return { html };
  } catch (error) {
    console.error('SSR Error:', error);
    return { html: '<div id="root"></div>' };
  }
}

export default { render };
