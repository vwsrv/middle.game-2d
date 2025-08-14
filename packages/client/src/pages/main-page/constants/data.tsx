import {
  HomeOutlined,
  PlayCircleOutlined,
  LoginOutlined,
  UserAddOutlined,
  ProfileOutlined,
  MessageOutlined,
  TrophyOutlined,
  WarningOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { EPages } from '@/shared/constants/paths';

export const getMenuItems = (isMobile: boolean) => {
  const mainItems = [
    {
      key: 'home',
      label: <a href={EPages.MAIN_PAGE}>Главная</a>,
      icon: !isMobile && <HomeOutlined />,
    },
    {
      key: 'game',
      label: <a href={EPages.GAME_PAGE}>Игра</a>,
      icon: !isMobile && <PlayCircleOutlined />,
    },
    {
      key: 'forum',
      label: <a href={EPages.FORUM_PAGE}>Форум</a>,
      icon: !isMobile && <MessageOutlined />,
    },
    {
      key: 'leaderboard',
      label: <a href={EPages.LEADER_BOARD_PAGE}>Рейтинг</a>,
      icon: !isMobile && <TrophyOutlined />,
    },
  ];

  const authItems = [
    {
      key: 'login',
      label: <a href={EPages.LOGIN_PAGE}>Вход</a>,
      icon: !isMobile && <LoginOutlined />,
      style: { marginLeft: 'auto' },
    },
    {
      key: 'register',
      label: <a href={EPages.REGISTER_PAGE}>Регистрация</a>,
      icon: !isMobile && <UserAddOutlined />,
    },
  ];

  return [...mainItems, ...authItems];
};

export const featureCards = [
  {
    key: 'game',
    path: EPages.GAME_PAGE,
    icon: (
      <PlayCircleOutlined
        style={{
          fontSize: '64px',
          color: '#52c41a',
        }}
      />
    ),
    title: 'Играть',
    description: 'Начните играть прямо сейчас!',
  },
  {
    key: 'forum',
    path: EPages.FORUM_PAGE,
    icon: (
      <MessageOutlined
        style={{
          fontSize: '64px',
          color: '#1890ff',
        }}
      />
    ),
    title: 'Форум',
    description: 'Обсудите игру с другими игроками',
  },
  {
    key: 'leaderboard',
    path: EPages.LEADER_BOARD_PAGE,
    icon: (
      <TrophyOutlined
        style={{
          fontSize: '64px',
          color: '#faad14',
        }}
      />
    ),
    title: 'Рейтинг',
    description: 'Смотрите топ игроков',
  },
  {
    key: 'profile',
    path: EPages.PROFILE_PAGE,
    icon: (
      <ProfileOutlined
        style={{
          fontSize: '64px',
          color: '#722ed1',
        }}
      />
    ),
    title: 'Профиль',
    description: 'Ваши достижения и статистика',
  },
  {
    key: 'login',
    path: EPages.LOGIN_PAGE,
    icon: (
      <LoginOutlined
        style={{
          fontSize: '64px',
          color: '#ff4d4f',
        }}
      />
    ),
    title: 'Вход',
    description: 'Войдите в свой аккаунт',
  },
  {
    key: 'register',
    path: EPages.REGISTER_PAGE,
    icon: (
      <UserAddOutlined
        style={{
          fontSize: '64px',
          color: '#13c2c2',
        }}
      />
    ),
    title: 'Регистрация',
    description: 'Создайте новый аккаунт',
  },
  {
    key: 'server_error',
    path: EPages.SERVER_ERROR_PAGE,
    icon: (
      <WarningOutlined
        style={{
          fontSize: '64px',
          color: '#f5222d',
        }}
      />
    ),
    title: 'Ошибка 500',
    description: 'Тестовая страница ошибки сервера',
  },
  {
    key: 'not_found',
    path: EPages.NOT_FOUND_PAGE,
    icon: (
      <FrownOutlined
        style={{
          fontSize: '64px',
          color: '#fa8c16',
        }}
      />
    ),
    title: 'Ошибка 404',
    description: "Тестовая страница 'Не найдено'",
  },
];
