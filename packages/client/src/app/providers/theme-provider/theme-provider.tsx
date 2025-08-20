import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { antdDarkTheme, antdTheme } from '@/styles/themes/antd.theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Проверяем предпочтения пользователя
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setIsDarkMode(prefersDark);

    document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  console.log(isDarkMode, 'isDarkMode');

  return (
    <ConfigProvider theme={isDarkMode ? antdDarkTheme : antdTheme}>
      {children}
    </ConfigProvider>
  );
};
