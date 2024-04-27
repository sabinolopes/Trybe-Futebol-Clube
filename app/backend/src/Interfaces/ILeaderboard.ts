import { Statistics } from '../types/Statistics';

export interface ILeaderboard {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

export interface TeamStatistics {
  [key: string]: Statistics;
}

export interface Totals {
  victories: number;
  draws: number;
  losses: number;
}
