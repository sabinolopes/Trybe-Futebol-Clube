import { Router, Response, Request } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();

const matchRoute = Router();

matchRoute.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

matchRoute.patch('/:id/finish', (req: Request, res: Response) => (
  matchesController.updateMatch(req, res)
));

matchRoute.patch('/:id', (req: Request, res: Response) => (
  matchesController.updateInProgress(req, res)
));

matchRoute.post('/', (req: Request, res: Response) => (
  matchesController.insertMatch(req, res)
));

export default matchRoute;
