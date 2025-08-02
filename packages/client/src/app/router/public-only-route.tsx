import { useAuth } from '@/features/auth'
import { Navigate } from 'react-router-dom'

export const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useAuth()

  if (isAuth) {
    // Если пользователь авторизован, редирект на главную
    return <Navigate to="/" replace />
  }

  return children
}
