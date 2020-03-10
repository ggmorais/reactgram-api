import User from '../models/UserModel';
import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    new User({
      fullname: req.body.fullname,
      username: req.body.username,
      password: req.body.password,
    })
      .save()
      .then(r => res.status(201).json(r))
      .catch(r => res.status(500).json(r))
  }

  async delete(req: Request, res: Response) {
    if (req.params.username) {
      User.deleteOne({
        username: req.params.username
      })
        .exec()
        .then(r => res.json(r))
        .catch(r => res.status(500).json(r));
    } else {
      User.deleteMany({})
        .exec()
        .then(r => res.json(r))
        .catch(r => res.status(500).json(r));
    }
  }

  async get(req: Request, res: Response) {
    User.find(req.params.username && {username: req.params.username})
      .remove('password')
      .exec()
      .then(r => res.json(r))
      .catch(r => res.status(500).json(r))
  }
}

export default new UserController();