import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatche } from '../Interfaces/matches/IMatche';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
// import sequelize from '../database/models';
// import { NewEntity } from '../Interfaces';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatche[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findByProgress(inProgress: boolean): Promise<IMatche[]> {
    console.log(inProgress);
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });

    // console.log('model', dbData);

    return dbData;
  }
}
