import { NewEntity } from '../Interfaces';
import MatchesModel from '../models/MatchesModel';
import { IMatche } from '../Interfaces/matches/IMatche';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

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

  public async finishProgress(id: number): Promise<ServiceResponse<object>> {
    await this.matcheModel.finishProgress(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, body: object): Promise<ServiceResponse<IMatche | null>> {
    const match = await this.matcheModel.updateMatch(id, body);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async create(match: NewEntity<IMatche>)
    : Promise<ServiceResponse<IMatche | ServiceMessage>> {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      return { status: 'BAD_REQUEST',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.matcheModel.findById(homeTeamId);
    const awayTeam = await this.matcheModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matcheModel.create(match);
    return { status: 'SUCCESSFUL', data: newMatch };
  }

//   public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
//     const team = await this.teamModel.findById(id);
//     if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
//     return { status: 'SUCCESSFUL', data: team };
//   }
}
