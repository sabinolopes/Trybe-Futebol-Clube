import { ITeams } from './ITeams';

export interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams | null>;
}
