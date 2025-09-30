import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserInfo;
  }
}

export interface IUserInfo {
  id: number;
  name?: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      headers: {
        Cookie: req.headers.cookie ?? '',
      },
    });

    if (!response.ok) {
      return res.status(401).json({
        error: 'Invalid authorization cookie',
        message: 'User must be authenticated via YP service',
      });
    }

    const decoded = await response.json();

    req.user = {
      id: decoded.id,
      name: decoded.first_name,
    };

    next();

    return;
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};
