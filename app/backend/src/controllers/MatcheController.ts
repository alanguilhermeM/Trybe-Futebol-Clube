import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatcheService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log(typeof inProgress);

    if (inProgress) {
      let progress = false;
      if (inProgress === 'true') {
        progress = true;
        const serviceResponse = await this.matcheService.findByProgress(progress);
        // console.log('controler', serviceResponse.data);
        return res.status(200).json(serviceResponse.data);
      }

      const serviceResponse = await this.matcheService.findByProgress(progress);
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matcheService.getAllMatches();
    res.status(200).json(serviceResponse.data);
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
