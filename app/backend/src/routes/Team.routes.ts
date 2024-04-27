import { Router, Response, Request } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamController = new TeamsController();

const teamRoute = Router();

teamRoute.get('/', (_req: Request, res: Response) => teamController.getAllTeams(_req, res));
teamRoute.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default teamRoute;
