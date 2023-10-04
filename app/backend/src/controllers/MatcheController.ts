import { Request, Response } from 'express';
import MatcheService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      let progress = false;
      if (inProgress === 'true') {
        progress = true;
        const serviceResponse = await this.matcheService.findByProgress(progress);
        return res.status(200).json(serviceResponse.data);
      }

      const serviceResponse = await this.matcheService.findByProgress(progress);
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matcheService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }

  public async finishProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matcheService.finishProgress(Number(id));

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matcheService.updateMatch(Number(id), { homeTeamGoals, awayTeamGoals });

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async create(req: Request, res: Response) {
    const { status, data } = await this.matcheService.create(req.body);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    res.status(201).json(data);
  }

  //   public async getTeamById(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const serviceResponse = await this.Matcheservice.getTeamById(Number(id));

//     if (serviceResponse.status !== 'SUCCESSFUL') {
//       return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
//     }
//     res.status(200).json(serviceResponse.data);
//   }
}
