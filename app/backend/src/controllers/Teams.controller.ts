import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/Teams.service';

class TeamsController {
  constructor(
    private teamService = new TeamsService(),
  ) {}

  async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default TeamsController;
