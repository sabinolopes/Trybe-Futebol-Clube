import LeaderboardModel from '../models/Leaderboard.model';

class LeaderboardService {
  private leaderboardModel = new LeaderboardModel();

  async getLeaderboard(teamType: string) {
    try {
      const data = await this.leaderboardModel.getLeaderboard(teamType);
      return { status: 'SUCCESSFUL', data };
    } catch (error: any) {
      return { status: 'INTERNAL_SERVER_ERROR', data: error.message };
    }
  }
}

export default LeaderboardService;
