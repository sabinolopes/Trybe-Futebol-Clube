import { Request, Response } from 'express';
import UsersService from '../services/Users.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class UsersController {
  constructor(private userService = new UsersService()) {}

  async getLogin(req: Request, res: Response) {
    const { status, data } = await this.userService.getLogin(req);

    res.status(mapStatusHTTP(status)).json(data);
  }

  async getRole(req: Request, res: Response) {
    const role = await this.userService.getRole(req);

    if (role) {
      const { status, data } = role;
      res.status(mapStatusHTTP(status)).json(data);
    }
  }
}

export default UsersController;
