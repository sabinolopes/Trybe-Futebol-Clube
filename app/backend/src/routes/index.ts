import { Router } from 'express';
import teamRoute from './Team.routes';
import userRoute from './Users.routes';
import matchRoute from './Matches.routes';
import leaderboardRoute from './Leaderboard.routes';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', userRoute);
router.use('/matches', matchRoute);
router.use('/leaderboard', leaderboardRoute);

export default router;
