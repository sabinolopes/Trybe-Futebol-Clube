import { IMatches } from './IMatches';

export interface IMatchesModel {
  getAll(): Promise<IMatches[]>
  getInProgress(progress: true | false): Promise<IMatches[]>
  updateMatch(id: number): Promise<IMatches | false>
  updateInProgress(id: number, htGoals: number, atGoals: number): Promise<IMatches | false>
  insertMatch(data: Partial<IMatches>): Promise<IMatches>;
}
