import {
  GamePage,
  LoginPage,
  ServerErrorPage,
  NotFoundErrorPage,
  ForumPage,
  MainPage,
  LeaderBoardPage,
  RegisterPage,
  ProfilePage,
} from '@/pages';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { PublicOnlyRoute } from './public-only-route';
import { EPages } from '@/shared/constants/paths';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: `/${EPages.LOGIN_PAGE}`,
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: `/${EPages.REGISTER_PAGE}`,
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: `/${EPages.PROFILE_PAGE}`,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${EPages.GAME_PAGE}`,
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${EPages.FORUM_PAGE}`,
    element: (
      <ProtectedRoute>
        <ForumPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${EPages.LEADER_BOARD_PAGE}`,
    element: (
      <ProtectedRoute>
        <LeaderBoardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${EPages.NOT_FOUND_PAGE}`,
    element: <NotFoundErrorPage />,
  },
  {
    path: `/${EPages.SERVER_ERROR_PAGE}`,
    element: <ServerErrorPage />,
  },
  {
    path: '*', // Любой несуществующий путь → 404
    element: <NotFoundErrorPage />,
  },
];
