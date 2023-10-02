import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwtUtil from '../utils/jwt.util';

export default class Validations {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;

    try {
      if (!token) return res.status(401).json({ message: 'Token not found' });
      const tokenWithoutBearer = token.split(' ')[1];
      const isValidToken = jwtUtil.verify(tokenWithoutBearer) as JwtPayload;
      console.log('oi', isValidToken);
    } catch (error) {
      if (error) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
    }

    next();
  }

  static validateInputs(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValidate = emailRegex.test(email);

    if (!emailValidate || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
