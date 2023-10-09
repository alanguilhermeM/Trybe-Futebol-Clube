import { ILeaderBoard } from '../Interfaces/leaderboards/ILeaderboard';
import { IMatche } from '../Interfaces/matches/IMatche';
import MatchesModel from './MatchesModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import LeaderBoardUtil from '../utils/leaderboard';
import { ITeamModel } from '../Interfaces/team/ITeamModel';
import TeamModel from './TeamModel';
import { ITeam } from '../Interfaces/team/ITeam';

export default class LeaderBoard {
  private matcheModel: IMatchesModel = new MatchesModel();
  private teamModel: ITeamModel = new TeamModel();

  public static combineResults(results: ILeaderBoard[]): ILeaderBoard[] {
    const combinedResults: ILeaderBoard[] = [];

    results.forEach((result) => {
      const existingResult = combinedResults.find((item) => item.name === result.name);

      if (existingResult) {
        existingResult.totalPoints += result.totalPoints;
        existingResult.totalGames += result.totalGames;
        existingResult.totalVictories += result.totalVictories;
        existingResult.totalDraws += result.totalDraws;
        existingResult.totalLosses += result.totalLosses;
        existingResult.goalsFavor += result.goalsFavor;
        existingResult.goalsOwn += result.goalsOwn;
        existingResult.goalsBalance += result.goalsBalance;
      } else {
        combinedResults.push({ ...result });
      }
    });

    LeaderBoard.calcEfficiency(combinedResults);

    return combinedResults;
  }

  private static calcEfficiency(combinedResults: ILeaderBoard[]) {
    combinedResults.forEach((result) => {
      const efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));
      const newResult = { ...result, efficiency };
      Object.assign(result, newResult);
    });
  }

  public static sortResults(results: ILeaderBoard[]): ILeaderBoard[] {
    const sortedResults = results.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return sortedResults;
  }

  async findAll(path: string): Promise<ILeaderBoard[]> {
    const matches = await this.matcheModel.findByProgress(false);

    const leaderBoards = matches.map(async (match: IMatche): Promise<ILeaderBoard | null> => {
      const team = path === '/away' ? await this.teamModel.findById(match.awayTeamId)
        : await this.teamModel.findById(match.homeTeamId);
      if (!team) return null;
      console.log(path);

      const leaderBoard = this.leaderboard(path, match, team);
      return leaderBoard;
    });

    const results = await Promise.all(leaderBoards);
    const resultsFiltred = results.filter((result): result is ILeaderBoard => result !== null);

    const combinedResults = LeaderBoard.combineResults(resultsFiltred);

    const sortedResults = LeaderBoard.sortResults(combinedResults);
    return sortedResults;
  }

  private leaderboard(path: string, match: IMatche, team: ITeam) {
    console.log(this.findAll);
    const leaderBoardUtil = new LeaderBoardUtil();
    if (path === '/away') {
      leaderBoardUtil.totalPoints(match.awayTeamGoals, match.homeTeamGoals);
      leaderBoardUtil.goalsBalance();
    } else {
      leaderBoardUtil.totalPoints(match.homeTeamGoals, match.awayTeamGoals);
      leaderBoardUtil.goalsBalance();
    }

    const leaderBoard = leaderBoardUtil.getLeaderBoard(team.teamName);
    return leaderBoard;
  }
}
