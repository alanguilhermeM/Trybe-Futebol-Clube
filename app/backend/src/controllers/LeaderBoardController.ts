import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(
    private leaderBoard = new LeaderBoardService(),
  ) { }

  public async getLeaderBoards(req: Request, res: Response) {
    const { path } = req.route;
    const serviceResponse = await this.leaderBoard.getLeaderBoards(path);
    return res.status(200).json(serviceResponse.data);
  }
}
