import AWS from 'aws-sdk';
import { Request, Response, NextFunction } from 'express';

AWS.config.logger = console;

const authController = (sign: Function) => {
  const getToken = (): string => {
    const token = sign(
      {
        expiresIn: '3d',
        name: 'fsgToken',
      },
      process.env.JWT_KEY,
      { algorithm: 'HS256' },
    );
    console.log('TOKEN', token);
    return token;
  };

  // eslint-disable-next-line no-unused-vars
  const get = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = getToken();

      if (token) {
        res.json({ jwt: token });
      } else {
        console.log('JWT not generated');
        res.status(500).json({
          error: true,
          message: 'JWT token not generated',
        });
      }
    } catch (error) {
      next(error);
    }
  };

  return { get };
};

export default authController;
