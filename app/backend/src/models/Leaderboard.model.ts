import LeaderBoard from '../utils/leaderboard.utils';
import MatchesModel from './Matches.model';
import TeamsModel from './Teams.model';
import { ILeaderboardModel } from '../Interfaces/ILeaderboardModel';

class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getLeaderboard(teamType: string) {
    const teams = await this.teamsModel.getAllTeams();
    const matches = await this.matchesModel.getInProgress(false);
    const allMatches = teams.map((team) => {
      const leaderBoard = new LeaderBoard(team.id, matches, teamType);
      return { name: team.teamName,
        totalPoints: leaderBoard.points(),
        totalGames: leaderBoard.games(),
        totalVictories: leaderBoard.victories(),
        totalDraws: leaderBoard.draws(),
        totalLosses: leaderBoard.losses(),
        goalsFavor: leaderBoard.goalsFavor(),
        goalsOwn: leaderBoard.goalsOwn(),
        goalsBalance: leaderBoard.goalsBalance(),
        efficiency: leaderBoard.efficiency() };
    });
    LeaderBoard.sortTeams(allMatches);
    return allMatches;
  }
}

export default LeaderboardModel;
