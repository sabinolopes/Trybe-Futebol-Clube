import { Request } from 'express';
import { IUsers } from './IUsers';

export interface IUsersModel {
  getLogin(req: Request): Promise<IUsers | null>,
  getRole(id: number): Promise<string | null >
}
