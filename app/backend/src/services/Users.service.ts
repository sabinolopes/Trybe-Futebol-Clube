import { Request } from 'express';
import UsersModel from '../models/Users.model';
import { IUsersModel } from '../Interfaces/IUsersModel';
import { validateUser } from '../middlewares/validateLogin';
import { createToken, verifyToken } from '../utils/jwt';

class UsersService {
  private userModel: IUsersModel = new UsersModel();

  async getLogin(req: Request) {
    const notValid = validateUser(req);

    if (notValid !== null) {
      return notValid;
    }

    try {
      const user = await this.userModel.getLogin(req);

      if (user === null) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }

      const token = createToken({ username: user.username, id: user.id });

      return { status: 'SUCCESSFUL', data: { token } };
    } catch (error: any) {
      console.log(error);

      return { status: 'INTERNAL_SERVER_ERROR',
        data: { message: error.message } };
    }
  }

  async getRole(req: Request) {
    const { authorization } = req.headers;

    if (!authorization) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };
    }

    const token = authorization.split(' ')[1];

    try {
      const userData = verifyToken(token);

      if (typeof userData === 'object') {
        const { id } = userData;

        const role = await this.userModel.getRole(id);

        return { status: 'SUCCESSFUL', data: { role } };
      }
    } catch (error) {
      console.log(error);
      return { status: 'UNAUTHORIZED',
        data: { message: 'Token must be a valid token' } };
    }
  }
}

export default UsersService;
