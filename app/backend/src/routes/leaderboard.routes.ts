// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
// import Validations from '../middlewares/validations';
import LeaderBoardController from '../controllers/LeaderBoardController';
// import Validations from '../middlewares/Validations';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderBoards(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getLeaderBoards(req, res),
);

export default router;
