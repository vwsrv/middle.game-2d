import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { antdDarkTheme, antdTheme } from '@/styles/themes/antd.theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isServer = typeof window === 'undefined';
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isServer) return;

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setIsDarkMode(prefersDark);
    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  if (isServer) {
    return <StyleProvider hashPriority="high">{children}</StyleProvider>;
  }

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={isDarkMode ? antdDarkTheme : antdTheme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};
