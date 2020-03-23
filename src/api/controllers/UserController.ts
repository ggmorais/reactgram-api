import User from '../models/UserModel';
import { Request, Response, json } from 'express';
import TestModel from '../models/TestModel';
import mongoose from 'mongoose';

class UserController {
  async create(req: Request, res: Response) {
    const { fullname, username, password } = req. body;

    try {  
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        fullname, username, password
      }).save();

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

    try {
      const user = await User.find(req.params.username && {
        username: req.params.username
      })
        .populate('followers', 'fullname username')
        .populate('following', 'fullname username')
  
      res.json(user);
    } catch(e) {
      res.status(500).json(e);
    }
    
  }

  async follow(req: Request, res: Response) {
    const { followedId, followerId } = req.body;

    try {
      const updateFollowed = await User.updateOne({
        _id: followedId
      }, {
        $addToSet: {
          followers: [followerId]
        }
      });
      
      const updateFollower = await User.updateOne({
        _id: followerId
      }, {
        $addToSet: {
          following: [followedId]
        }
      });

      res.json({
        done: true
      });

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async disfollow(req: Request, res: Response) {
    const { followedId, followerId } = req.body;

    try {
      const updateFollowed = await User.updateOne({
        _id: followedId
      }, {
        $pull: {
          followers: [followerId]
        }
      });

      const updateFollower = await User.updateOne({
        _id: followerId
      }, {
        $pull: {
          following: [followedId]
        }
      });

      res.json({
        done: true
      });

    } catch (e) {
      res.status(500).json(e);
    }
  }

  async mark(req: Request, res: Response) {
    const { userId, postId } = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: {
          marked: [postId]
        }
      });

      res.json(user);

    } catch (e) {
      res.status(500).json(e);
    }
  }

  async unMark(req: Request, res: Response) {
    const { userId, postId } = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: {
          marked: [postId]
        }
      });

      res.json(user);

    } catch (e) {
      res.status(500).json(e);
    }
  }

}

export default new UserController();