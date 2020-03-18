import User from '../models/UserModel';
import { Request, Response, json } from 'express';
import TestModel from '../models/TestModel';

interface IUserController {
  req: Request;
  res: Response;
}

class UserController {
  async create(req: Request, res: Response) {
    const { fullname, username, password } = req. body;

    try {  
      const user = await new User({ fullname, username, password }).save();

      res.json(user);
    } catch(e) {
      res.status(500).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    const { username } = req.params;
    
    try {
      const user = await User.deleteMany(username ? {username: username} : {});

      res.json(user);
    } catch(e) {
      res.status(500).json(e);
    }
  }

  async get(req: Request, res: Response) {
    const user = await User.find(req.params.username && {username: req.params.username});

    res.json(user);
  }

  async follow(req: Request, res: Response) {
    // User.updateOne({
    //   username: req.body.followedUsername
    // }, {
    //   $addToSet: {
    //     followers: [req.body.followerUsername]
    //   }
    // })
    //   .exec()
    //   .then(r => {
    //     User.updateOne({
    //       username: req.body.followerUsername
    //     }, {
    //       $addToSet: {
    //         following: [req.body.followedUsername]
    //       }
    //     })
    //   })
    //   .catch(r => res.status(500).json(r));
    const { followedUsername, followerUsername } = req.body;

    try {
      const updateFollowed = await User.updateOne({
        username: followedUsername
      }, {
        $addToSet: {
          followers: [followerUsername]
        }
      });

      const updateFollower = await User.updateOne({
        username: followerUsername
      }, {
        $addToSet: {
          following: [followerUsername]
        }
      });
    }
  }

  test(req: Request, res: Response) {
    TestModel.find()
      .exec()
      .then(r => res.send('ok'))
  }
}

export default new UserController();