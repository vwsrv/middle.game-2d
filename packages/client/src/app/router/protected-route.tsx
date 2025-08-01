import { useAuth } from '@/features/auth'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth } = useAuth() // Проверяем авторизацию
  const location = useLocation()

  if (!isAuth) {
    // Редирект на /login с сохранением текущего пути (чтобы после входа вернуться обратно)
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
