import { Request, Response, NextFunction } from 'express';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authToken = req.cookies.authCookies;

  if (!authToken) {
    return res.status(401).json({ error: 'Пользователь не авторизован' });
  }

  if (!req.session || !req.session.user) {
    return res
      .status(401)
      .json({ error: 'Сессия истекла или недействительна' });
  }

  req.user = req.session.user;
  next();
};

module.exports = authMiddleware;
