import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from '../model/constants';

// Валидация email (чистая функция)
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Валидация пароля
export const validatePassword = (password: string): boolean => {
  return password.length >= PASSWORD_MIN_LENGTH;
};

// Валидация данных регистрации
// export const validateRegistrationData = (data: RegistrationData): boolean => {
//   return (
//     validateEmail(data.email) &&
//     validatePassword(data.password) &&
//     data.username.trim().length > 0
//   );
// };
