import { ErrorMessages } from '../constants/error-message';

export const loginValidation = {
  minLength: {
    value: 3,
    message: ErrorMessages.MIN_SYMBOLS(3),
  },
  maxLength: {
    value: 20,
    message: ErrorMessages.MAX_SYMBOLS(20),
  },
  pattern: {
    value: /^(?![0-9]+$)[A-Za-z0-9_-]{3,20}$/,
    message: ErrorMessages.LOGIN,
  },
  required: {
    value: true,
    message: ErrorMessages.REQUIRED,
  },
};

export const passwordValidation = {
  minLength: {
    value: 8,
    message: ErrorMessages.MIN_SYMBOLS(8),
  },
  maxLength: {
    value: 40,
    message: ErrorMessages.MAX_SYMBOLS(40),
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*\d).+$/,
    message: ErrorMessages.PASSWORD,
  },
  required: {
    value: true,
    message: ErrorMessages.REQUIRED,
  },
};

export const nameUserValidation = {
  required: {
    value: true,
    message: ErrorMessages.REQUIRED,
  },
  pattern: {
    value: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
    message: ErrorMessages.NAME,
  },
};

export const emailValidation = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: ErrorMessages.EMAIL,
  },
  required: {
    value: true,
    message: ErrorMessages.REQUIRED,
  },
};

export const phoneValidation = {
  pattern: {
    value: /^\+?\d{10,15}$/,
    message: ErrorMessages.PHONE,
  },
  required: {
    value: true,
    message: ErrorMessages.REQUIRED,
  },
};
