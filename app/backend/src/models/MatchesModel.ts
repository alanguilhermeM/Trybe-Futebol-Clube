import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatche, IMatcheCreate } from '../Interfaces/matches/IMatche';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { NewEntity } from '../Interfaces';
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

  async findById(id: number): Promise<IMatche | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData;
  }

  async findByProgress(inProgress: boolean): Promise<IMatche[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });

    return dbData;
  }

  async finishProgress(id: number): Promise<IMatche | null> {
    const matche = await this.model.findByPk(id);
    if (!matche) return null;
    await matche.update({
      inProgress: false,
    });

    return null;
  }

  async updateMatch(
    id: number,
    body: { homeTeamGoals: number; awayTeamGoals: number },
  ): Promise<IMatche | null> {
    const { homeTeamGoals, awayTeamGoals } = body;

    const matche = await this.model.findByPk(id);
    if (!matche) return null;
    await matche.update({
      homeTeamGoals,
      awayTeamGoals,
    });

    return matche;
  }

  async create(match: NewEntity<IMatcheCreate>): Promise<IMatche> {
    const newMatch = { ...match, inProgress: true };
    const matche = await this.model.create(newMatch);
    // console.log(matche);
    return matche;
  }
}
