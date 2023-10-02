import { IUser } from './IUser';
// import { NewEntity } from '..';

export interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>
}
