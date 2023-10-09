import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matcheRouter from './matche.routes';
import leaderboard from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matcheRouter);
router.use('/leaderboard', leaderboard);

export default router;
