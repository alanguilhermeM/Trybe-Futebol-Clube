import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';
import jwtUtil from '../utils/jwt.util';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const tokenWithoutBearer = token.split(' ')[1];
    const isValidToken = jwtUtil.verify(tokenWithoutBearer);

    if (!isValidToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const { data: { role } } = this.userService.getRole(tokenWithoutBearer);
    console.log(role);
    return res.status(200).json({ role });
  }
}
