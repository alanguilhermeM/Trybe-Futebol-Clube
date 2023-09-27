// import { NewEntity } from '../Interfaces';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/team/ITeam';
import { ITeamModel } from '../Interfaces/team/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class BookService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
