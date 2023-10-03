import { IMatche } from './IMatche';
// import { NewEntity } from '..';

export interface IMatchesModel {
//   create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<IMatche[]>,
  findByProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]>
//   findById(id: IMatche['id']): Promise<IMatche | null>
//   update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
//   delete(id: IBook['id']): Promise<number>,
}
