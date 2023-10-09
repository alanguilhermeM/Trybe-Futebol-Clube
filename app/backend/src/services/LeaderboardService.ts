// import { NewEntity } from '../Interfaces';

import LeaderBoard from '../models/Leaderboard';
import { ILeaderBoard } from '../Interfaces/leaderboards/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderBoardService {
  constructor(
    private leaderBoard = new LeaderBoard(),
  ) { }

  public async getLeaderBoards(path: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderBoard = await this.leaderBoard.findAll(path);
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
}
