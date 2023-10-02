// import { NewEntity } from '../Interfaces';
import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/user/IUserModel';
import UserModel from '../models/UserModel';
// import { ILogin } from '../Interfaces/ILogin';
import jwtUtil from '../utils/jwt.util';
import { IToken } from '../Interfaces/IToken';
import { IRole, UserInfo } from '../Interfaces/IRole';
// import { UserInfo } from 'os';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, username, role } = user;
    const payload = { id, email, role, username };

    const token = jwtUtil.sign(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public getRole(token: string): IRole {
    console.log(this.login);
    const role = jwtUtil.verify(token);

    return { status: 'SUCCESSFUL', data: role as UserInfo };
  }
}
