import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ServiceResponses } from '../types/Responses';
import TeamsModel from '../models/Teams.model';
import { ITeams } from '../Interfaces/ITeams';

class TeamsService {
  constructor(
    private teamModel: ITeamsModel = new TeamsModel(),
  ) {}

  async getAllTeams(): Promise<ServiceResponses<ITeams[]>> {
    try {
      const teams = await this.teamModel.getAllTeams();
      return { status: 'SUCCESSFUL', data: teams };
    } catch (error: any) {
      console.log(error);
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: error.message },
      };
    }
  }

  async getTeamById(id: number): Promise<ServiceResponses<ITeams | null>> {
    try {
      const team = await this.teamModel.getTeamById(id);
      if (!team) {
        return { status: 'BAD_REQUEST', data: { message: 'Invalid id' } };
      }
      return { status: 'SUCCESSFUL', data: team };
    } catch (error: any) {
      console.log(error);
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: error.message },
      };
    }
  }
}

export default TeamsService;
