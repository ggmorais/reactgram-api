import User from '../models/UserModel';
import { Request, Response } from 'express';
import TestModel from '../models/TestModel';

interface IUserController {
  req: Request;
  res: Response;
}

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
      .exec()
      .then(r => res.send(r))
      .catch(r => res.status(500).json(r))
  }

  async follow(req: Request, res: Response) {
    User.updateOne({
      username: req.body.followedUsername
    }, {
      $addToSet: {
        followers: [req.body.followerUsername]
      }
    })
      .exec()
      .then(r => {
        User.updateOne({
          username: req.body.followerUsername
        }, {
          $addToSet: {
            following: [req.body.followedUsername]
          }
        })
      })
      .catch(r => res.status(500).json(r));
  }

  test(req: Request, res: Response) {
    TestModel.find()
      .exec()
      .then(r => res.send('ok'))
  }
}

export default new UserController();