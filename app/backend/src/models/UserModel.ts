import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';
// import { NewEntity } from '../Interfaces';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: { email },
    });
    if (!user) return null;

    const { id, username, role, password } = user;

    return { id, username, role, email, password };
  }
}
