// Основной тип пользователя
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  score?: number; // Текущий счёт в игре
}

// Данные для авторизации
export interface AuthData {
  email: string;
  password: string;
}

// Данные для регистрации
export interface RegistrationData extends AuthData {
  username: string;
}
