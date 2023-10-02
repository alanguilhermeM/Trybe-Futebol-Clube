// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';
// import
// import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateInputs,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
