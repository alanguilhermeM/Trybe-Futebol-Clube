// import { NewEntity } from '../Interfaces';
import MatchesModel from '../models/MatchesModel';
import { IMatche } from '../Interfaces/matches/IMatche';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatcheService {
  constructor(
    private matcheModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatche[]>> {
    const allMatches = await this.matcheModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(inProgress: boolean): Promise<ServiceResponse<IMatche[]>> {
    const matchesByProgress = await this.matcheModel.findByProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matchesByProgress };
  }

//   public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
//     const team = await this.teamModel.findById(id);
//     if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
//     return { status: 'SUCCESSFUL', data: team };
//   }
}
