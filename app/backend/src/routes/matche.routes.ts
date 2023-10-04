// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatcheController';
import Validations from '../middlewares/validations';
// import Validations from '../middlewares/Validations';

const matcheController = new MatchesController();

const router = Router();

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matcheController.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matcheController.finishProgress(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matcheController.create(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matcheController.getAllMatches(req, res),
);
export default router;
