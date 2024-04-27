import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { ITeams } from '../Interfaces/ITeams';

class TeamsModel implements ITeamsModel {
  private model = TeamsModelSequelize;

  public async getAllTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();

    return teams.map(({ id, teamName }) => ({ id, teamName }));
  }

  public async getTeamById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);

    if (!team) {
      return null;
    }

    const { teamName }: ITeams = team;

    return { id, teamName };
  }
}

export default TeamsModel;
