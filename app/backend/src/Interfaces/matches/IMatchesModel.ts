import { IMatche } from './IMatche';
import { NewEntity } from '..';

export interface IMatchesModel {
//   create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<IMatche[]>,
  findByProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]>
  findById(id: IMatche['id']): Promise<IMatche | null>
  finishProgress(id: IMatche['id']): Promise<IMatche | null>,
  updateMatch(id: IMatche['id'], body: object): Promise<IMatche | null>,
  create(match: NewEntity<IMatche>): Promise<IMatche>,
//   delete(id: IBook['id']): Promise<number>,
}
