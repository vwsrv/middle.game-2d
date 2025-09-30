import { Button, Menu, Space, Typography, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Header as Head } from 'antd/es/layout/layout';
import { getMenuItems } from '@/pages/main-page/constants/data';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/shared/i18n';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/features/global-slice/global-slice';
import { useSSRConfig } from '@/shared/contexts/ssr-context';
import { useState, useEffect } from 'react';

const { Title } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { isMobile, language } = useSSRConfig();
  const menuItems = getMenuItems(isMobile);

  const location = useLocation();
  const selectedKey =
    menuItems.find(item => item.path === location.pathname)?.key || 'home';

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setIsDarkMode(prefersDark);
      document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      localStorage.setItem('app-theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  return (
    <Head>
      <div className="logo" style={{ float: 'left', marginRight: '24px' }}>
        <Title level={3} style={{ margin: 0 }}>
          <span style={{ color: '#ff4d4f' }}>Apple</span>
          <span style={{ color: '#52c41a' }}>Worm</span>
        </Title>
      </div>

      <Menu mode="horizontal" selectedKeys={[selectedKey]} items={menuItems} />

      <Space style={{ float: 'right' }}>
        <Tooltip
          title={
            isDarkMode
              ? 'Переключить на светлую тему'
              : 'Переключить на темную тему'
          }>
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
            }}
          />
        </Tooltip>

        <Button
          type={language === 'ru' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('ru')}>
          RU
        </Button>

        <Button
          type={language === 'en' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('en')}>
          EN
        </Button>
      </Space>
    </Head>
  );
};

export default Header;
