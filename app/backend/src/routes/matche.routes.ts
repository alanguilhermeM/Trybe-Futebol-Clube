// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatcheController';
// import Validations from '../middlewares/Validations';

const matcheController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matcheController.getAllMatches(req, res),
);
// router.get(
//   '/:id',
//   (req: Request, res: Response) => matcheController.getTeamById(req, res),
// );

export default router;
