import { ThemeConfig, theme } from 'antd';

export const antdTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Основные цвета через CSS-переменные
    colorPrimary: 'var(--ant-primary-color)',
    colorPrimaryHover: 'var(--ant-primary-color-hover)',
    colorPrimaryActive: 'var(--ant-primary-color-active)',
    colorPrimaryBg: 'var(--ant-primary-bg)',
    colorPrimaryText: 'var(--ant-primary-color-text)',
    colorBgLayout: 'var(--ant-primary-bg)',

    // Цвета текста и фона
    colorText: 'var(--ant-text-color)',
    colorBgContainer: 'var(--ant-bg-container)',
    colorBorder: 'var(--ant-border-color)',

    colorBorderSecondary: 'var(--ant-border-color-secondary)',
    colorTextSecondary: 'var(--ant-secondary-color-text)',

    colorTextPlaceholder: 'var(--ant-placeholder-color)',
  },
  components: {
    Button: {
      colorPrimary: 'var(--ant-primary-color)',
      colorPrimaryHover: 'var(--ant-primary-color-hover)',
      colorPrimaryActive: 'var(--ant-primary-color-active)',
      colorLink: 'var(--ant-link-color)',
      colorLinkHover: 'var(--ant-link-hover-color)',
      colorPrimaryText: 'var(--ant-primary-color-text)', // цвет текста (белый)

      colorBgContainerDisabled: 'rgba(0, 0, 0, 0.04)', // цвет disabled-состояния
      colorTextDisabled: 'rgba(0, 0, 0, 0.25)', // текст disabled

      colorTextPlaceholder: 'var(--ant-placeholder-color)',
    },
    Input: {
      colorBorder: 'var(--ant-input-border-color)',
      hoverBorderColor: 'var(--ant-primary-color-hover)',
      activeBorderColor: 'var(--ant-primary-color-active)',
    },
    Card: {
      colorTextDescription: 'var(--ant-secondary-color-text)',
    },
    Layout: {
      colorBgLayout: 'var(--ant-primary-bg)',
      headerBg: 'var(--ant-primary-bg)', // Используем ваш основной цвет фона
      colorText: 'var(--ant-text-color)', // Цвет текста
    },
    Typography: {
      colorTextSecondary: 'var(--ant-secondary-color-text)',
    },
  },
};

export const antdDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...antdTheme.token,
    colorTextSecondary: '#ffffff73',
    colorTextDescription: 'rgba(255, 255, 255, 0.65)',
  },
  components: {
    Typography: {
      colorTextSecondary: 'var(--ant-secondary-color-text)',
    },
    Card: {
      colorTextDescription: 'var(--ant-secondary-color-text)',
    },
    Layout: {
      headerBg: 'var(--ant-primary-bg)', // Темный фон для хедера
      colorText: 'var(--ant-text-color)', // Цвет текста
    },
    Button: {
      colorPrimary: 'var(--ant-primary-color)',
      colorPrimaryHover: 'var(--ant-primary-color-hover)',
      colorPrimaryActive: 'var(--ant-primary-color-active)',
      colorPrimaryText: 'var(--ant-primary-color-text)',
      colorBgContainerDisabled: 'rgba(255, 255, 255, 0.04)',
      colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
    },
  },
};
