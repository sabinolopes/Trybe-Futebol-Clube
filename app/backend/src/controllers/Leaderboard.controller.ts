import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/Leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getLeaderboard(_req: Request, res: Response, teamType: string) {
    const { status, data } = await this.leaderboardService.getLeaderboard(teamType);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default LeaderboardController;
