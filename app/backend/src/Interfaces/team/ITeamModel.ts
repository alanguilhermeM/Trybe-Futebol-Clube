import { ITeam } from './ITeam';
import { NewEntity } from '..';

export interface ITeamModel {
//   create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<ITeam[]>,
//   findById(id: IBook['id']): Promise<IBook | null>
//   update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
//   delete(id: IBook['id']): Promise<number>,
}