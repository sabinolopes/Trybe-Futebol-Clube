import { Router, Response, Request } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/away', (req: Request, res: Response) => (
  leaderboardController.getLeaderboard(req, res, 'away')
));

leaderboardRoute.get('/home', (req: Request, res: Response) => (
  leaderboardController.getLeaderboard(req, res, 'home')
));

leaderboardRoute.get('/', (req: Request, res: Response) => (
  leaderboardController.getLeaderboard(req, res, 'total')
));

export default leaderboardRoute;
