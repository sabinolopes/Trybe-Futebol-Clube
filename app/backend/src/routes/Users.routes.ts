import { Router, Response, Request } from 'express';
import UsersController from '../controllers/Users.controller';

const userController = new UsersController();
const userRoute = Router();

userRoute.post('/', (req: Request, res: Response) => userController.getLogin(req, res));
userRoute.get('/role', (req: Request, res: Response) => userController.getRole(req, res));

export default userRoute;
