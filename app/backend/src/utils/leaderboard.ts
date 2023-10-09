import { ILeaderBoard } from '../Interfaces/leaderboards/ILeaderboard';

export default class LeaderBoardUtil {
  public _name: string;
  public _totalPoints: number;
  public _totalGames: number;
  public _totalVictories: number;
  public _totalDraws: number;
  public _totalLosses: number;
  public _goalsFavor: number;
  public _goalsOwn: number;
  public _goalsBalance: number;
  public _efficiency: number;

  constructor() {
    this._name = ''; // done
    this._totalPoints = 0; // done
    this._totalGames = 0; // done
    this._totalVictories = 0; // done
    this._totalDraws = 0; // done
    this._totalLosses = 0; // done
    this._goalsFavor = 0; // done
    this._goalsOwn = 0; // done
    this._goalsBalance = 0; // done
    this._efficiency = 0; // done
  }

  public totalPoints(home: number, away: number) {
    if (home > away) {
      this._totalPoints += 3;
      this._totalVictories += 1;
    }

    if (home < away) {
      this._totalLosses += 1;
    }

    if (home === away) {
      this._totalDraws += 1;
      this._totalPoints += 1;
    }

    this._totalGames += 1;
    this._goalsFavor += home;
    this._goalsOwn += away;
  }

  public goalsBalance() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    // console.log(this._goalsBalance);
  }

  public efficiency() {
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  public getLeaderBoard(name: string): ILeaderBoard | null {
    this._name = name;
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
