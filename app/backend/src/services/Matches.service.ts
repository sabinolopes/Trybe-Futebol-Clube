import { Request } from 'express';
import validateMatch from '../middlewares/validateMatch';
import { IMatches } from '../Interfaces/IMatches';
import MatchesModel from '../models/Matches.model';
import { validateToken } from '../middlewares/validateLogin';
import { ServiceResponses } from '../types/Responses';

class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  async getAll(): Promise<ServiceResponses<IMatches[]>> {
    try {
      const matches = await this.matchesModel.getAll();

      return { status: 'SUCCESSFUL', data: matches };
    } catch (error: any) {
      console.log(error);

      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
    }
  }

  async getInProgress(progress: true | false): Promise<ServiceResponses<IMatches[]>> {
    try {
      const matches = await this.matchesModel.getInProgress(progress);

      return { status: 'SUCCESSFUL', data: matches };
    } catch (error: any) {
      console.log(error);

      return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
    }
  }

  async updateMatch(req: Request) {
    const { id } = req.params;
    const testedToken = validateToken(req);

    if (testedToken !== true && testedToken) {
      return { status: testedToken.status, data: testedToken.data };
    }

    const match = await this.matchesModel.updateMatch(Number(id));

    if (match) {
      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    }

    return { status: 'BAD_REQUEST', data: { message: 'Invalid id' } };
  }

  async updateInProgress(req: Request) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeamGoals || !awayTeamGoals) {
      return { status: 'BAD_REQUEST',
        data: { message: 'Must have homeTeamGoals and awayTeamGoals' } };
    }

    const testedToken = validateToken(req);

    if (testedToken !== true && testedToken) {
      return { status: testedToken.status, data: testedToken.data };
    }

    const match = await

    this.matchesModel.updateInProgress(Number(id), homeTeamGoals, awayTeamGoals);

    if (match) {
      return { status: 'SUCCESSFUL', data: match };
    }

    return { status: 'BAD_REQUEST', data: { message: 'Must be a game in progress' } };
  }

  async insertMatch(req: Request) {
    const testedToken = validateToken(req);

    if (testedToken !== true && testedToken) {
      return { status: testedToken.status, data: testedToken.data };
    }

    const testedMatch = validateMatch(req);

    if (testedMatch) {
      return { status: testedMatch.status, data: testedMatch.data };
    }

    const data = {
      id: req.body.id,
      homeTeamId: req.body.homeTeamId,
      homeTeamGoals: req.body.homeTeamGoals,
      awayTeamId: req.body.awayTeamId,
      awayTeamGoals: req.body.awayTeamGoals,
      inProgress: true,
    };

    const newMatch = await this.matchesModel.insertMatch(data);

    return { status: 'CREATED', data: newMatch };
  }
}

export default MatchesService;
