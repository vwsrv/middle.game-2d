import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { antdDarkTheme, antdTheme } from '@/styles/themes/antd.theme';
import { useSSRConfig } from '@/shared/contexts/ssr-context';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode, isServer } = useSSRConfig();

  useEffect(() => {
    if (isServer) return;

    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, []);

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={isDarkMode ? antdDarkTheme : antdTheme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};
