import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/team/ITeam';
import { ITeamModel } from '../Interfaces/team/ITeamModel';
import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}