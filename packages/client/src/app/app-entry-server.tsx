import { FC, StrictMode } from 'react';
import ErrorBoundary from '@/shared/ui/error-boundary/error-boundary';
import { Provider } from 'react-redux';
import global_store from '@/shared/global-store/global-store';
import { RouterProvider, StaticRouter } from 'react-router-dom';
import { router } from '@/app/router';
import '@/styles/index.scss';
import { renderToString } from 'react-dom/server';
import { ServiceWorkerProvider } from '@/app/providers/servce-worker';
import { ThemeProvider } from '@/app/providers/theme-provider/theme-provider';
import AppAi18NextProvider from '@/app/providers/app-ai18-next/app-ai-18-next.provider';

const ServerApp: FC<{ url: string }> = ({ url }) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <ServiceWorkerProvider>
          <ThemeProvider>
            <Provider store={global_store}>
              <AppAi18NextProvider>
                <StaticRouter location={url}>
                  <RouterProvider router={router} />
                </StaticRouter>
              </AppAi18NextProvider>
            </Provider>
          </ThemeProvider>
        </ServiceWorkerProvider>
      </ErrorBoundary>
    </StrictMode>
  );
};

export async function render(url: string): Promise<string> {
  try {
    const html = renderToString(<ServerApp url={url} />);

    return html;
  } catch (error) {
    console.error('SSR Error:', error);

    return '<div id="root">Ошибка загрузки страницы</div>';
  }
}

export default { render };
