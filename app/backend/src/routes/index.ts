import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matcheRouter from './matche.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matcheRouter);

export default router;
