import { Button, Space, Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Header as Head } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/shared/i18n';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/features/global-slice/global-slice';
import { useState, useEffect, ReactNode, FC } from 'react';
import { LogoutBtn } from '@/features/auth/components/logout-btn/logout-btn';
import { EPages } from '@/shared/constants/paths';

import {
  ArrowLeftOutlined,
  HomeOutlined,
  MessageOutlined,
  TrophyOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

import './header.scss';

export type HeadWrapperProps = {
  children?: ReactNode;
  backButton?: string | undefined;
};

const mainItems = [
  {
    key: 'home',
    href: EPages.MAIN_PAGE,
    label: 'Главная',
    icon: <HomeOutlined />,
  },
  {
    key: 'forum',
    href: EPages.FORUM_PAGE,
    label: 'Форум',
    icon: <MessageOutlined />,
  },
  {
    key: 'leaderboard',
    href: EPages.LEADER_BOARD_PAGE,
    label: 'Рейтинг',
    icon: <TrophyOutlined />,
  },
  {
    key: 'profile',
    href: EPages.PROFILE_PAGE,
    label: 'Профиль',
    icon: <ProfileOutlined />,
  },
];

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="header-menu">
      {mainItems.map(item => {
        return (
          <Button
            key={item.key}
            type="default"
            onClick={() => navigate(item.href)}
            icon={item.icon}
            size="middle">
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

const Header: FC<HeadWrapperProps> = ({ children, backButton }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const navigate = useNavigate();
  return (
    <Head className="page-header">
      <div className="page-header__actions">
        <div className="actions-start">
          {backButton && (
            <Button
              type="primary"
              onClick={() => navigate(-1)}
              icon={<ArrowLeftOutlined />}
              size="middle">
              {backButton}
            </Button>
          )}
          <Menu />
        </div>
        <div className="actions-end">
          {children || null}

          <Space>
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              onClick={toggleTheme}
            />

            <Switch
              checkedChildren="EN"
              unCheckedChildren="RU"
              onClick={checked => {
                onChangeLanguage(checked ? 'ru' : 'en');
              }}
            />
          </Space>

          <LogoutBtn />
        </div>
      </div>
    </Head>
  );
};

export default Header;
