import { Request } from 'express';
import UserModelSequelize from '../database/models/UserModelSequelize';
import { IUsers } from '../Interfaces/IUsers';
import { IUsersModel } from '../Interfaces/IUsersModel';
import { validatePassword } from '../middlewares/validateLogin';

class UsersModel implements IUsersModel {
  private model = UserModelSequelize;

  async getLogin(req: Request): Promise<IUsers | null> {
    const { email, password } = req.body;
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const passwordCheck = validatePassword(password, user.password);

    if (!passwordCheck) {
      return null;
    }

    return user;
  }

  async getRole(id: number) {
    const user = await this.model.findByPk(id);

    if (!user) {
      return null;
    }

    return user.role;
  }
}

export default UsersModel;
