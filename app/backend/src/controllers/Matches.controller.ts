import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAll(req: Request, res: Response) {
    const QueryParam = req.query.inProgress;

    if (QueryParam === undefined) {
      const matches = await this.matchesService.getAll();
      res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }

    if (QueryParam) {
      const param = QueryParam === 'true';
      const matches = await this.matchesService.getInProgress(param);
      res.status(mapStatusHTTP(matches.status)).json(matches.data);
    }
  }

  public async updateMatch(req: Request, res: Response) {
    const updatedMatch = await this.matchesService.updateMatch(req);

    res.status(mapStatusHTTP(updatedMatch.status)).json(updatedMatch.data);
  }

  public async updateInProgress(req: Request, res: Response) {
    const updateInProgress = await this.matchesService.updateInProgress(req);

    res.status(mapStatusHTTP(updateInProgress.status)).json(updateInProgress.data);
  }

  public async insertMatch(req: Request, res: Response) {
    const newMatch = await this.matchesService.insertMatch(req);

    if (newMatch) {
      res.status(mapStatusHTTP(newMatch.status)).json(newMatch.data);
    }

    res.status(500).json({ message: 'Internal Error' });
  }
}

export default MatchesController;
