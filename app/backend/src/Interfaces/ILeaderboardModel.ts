import { Statistics } from '../types/Statistics';

export interface ILeaderboardModel {
  getLeaderboard(teamType: string): Promise<Statistics[]>;
}
