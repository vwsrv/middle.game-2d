import React, { createContext, useContext, ReactNode } from 'react';

export interface SSRConfig {
  isServer: boolean;
  isDarkMode: boolean;
  isMobile: boolean;
  language: string;
  currentYear: number;
}

const defaultSSRConfig: SSRConfig = {
  isServer: false,
  isDarkMode: false,
  isMobile: false,
  language: 'ru',
  currentYear: 2024,
};

const SSRContext = createContext<SSRConfig>(defaultSSRConfig);

export const useSSRConfig = () => {
  return useContext(SSRContext);
};

interface SSRProviderProps {
  children: ReactNode;
  config: SSRConfig;
}

export const SSRProvider: React.FC<SSRProviderProps> = ({
  children,
  config,
}) => {
  return <SSRContext.Provider value={config}>{children}</SSRContext.Provider>;
};
