import User from '../models/UserModel';
import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    res.send('User created!');
  }

  async delete(req: Request, res: Response) {
    res.send('User deleted!');
  }

  async get(req: Request, res: Response) {
    res.send('Returning all users or one by id');
  }
}

export default new UserController();