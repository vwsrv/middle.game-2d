import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import { Provider } from 'react-redux';
import { routes } from './router/routes';
import { AppProviders } from './providers/app-providers';
import { createServerConfig } from '@/shared/utils/ssr-config';
import { createStore } from '@/shared/global-store/global-store';

export async function render(
  url: string,
): Promise<{ html: string; initialState: any }> {
  try {
    if (typeof window === 'undefined') {
      process.env.ANTD_DISABLE_LOCALE = 'true';
    }

    // Создаем store для SSR
    const store = createStore();

    const handler = createStaticHandler(routes);
    const context = await handler.query(new Request('http://localhost' + url));

    if (context instanceof Response) {
      throw new Error('Router context is a Response, not a context object');
    }

    const router = createStaticRouter(handler.dataRoutes, context);
    const ssrConfig = createServerConfig();

    const app = (
      <Provider store={store}>
        <AppProviders config={ssrConfig}>
          <StaticRouterProvider router={router} context={context} />
        </AppProviders>
      </Provider>
    );

    const html = renderToString(app);
    const initialState = store.getState();

    return { html, initialState };
  } catch (error) {
    console.error('SSR Error:', error);
    return { html: '<div id="root"></div>', initialState: {} };
  }
}

export default { render };
