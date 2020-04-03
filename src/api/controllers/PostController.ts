import Post from '../models/PostModel';
import User from '../models/UserModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import fs from 'fs';

class PostController {
  async create(req: Request, res: Response) {
    const { userId } = req.body;
    const image = req.file;

    const postId = image.filename.split('.')[0];

    try {
      const post = await new Post({
        _id: postId,
        user: userId,
        image: image.destination + '/' + image.filename,
        imageUrl: '/public/images/' + image.filename,
      }).save();

      res.json(post);

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId);
    
      fs.exists(post.image, exist => {
        if (exist)
          fs.unlink(post.image, null);
      });

      const deleted = await Post.findByIdAndDelete(postId);

      res.json(deleted);

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async get(req: Request, res: Response) {
    const host = req.get('host');
    const { username } = req.params;

    try {

      const user = await User.findOne({ username });

      const post = await Post.find((user && username) && { user: { _id: user._id } })
        .populate('user', '_id fullname username')
        .populate('likes', '_id fullname username');
    
      res.json(post);
      
    } catch(e) {
      res.status(500).json(e);
    }
  }

  async list(req: Request, res: Response) {
    const host = req.protocol + '://' + req.get('host');

    const { username } = req.params;
    const { page = 1 } = req.query;

    try {
      const user = await User.findOne({ username });
      const total = await Post.find({ user: { _id: [user.following] } }).count();
      const posts = await Post.find({ user: { _id: [user.following] } })
        .skip((page - 1) * 5)
        .limit(5)
        .populate('user', '_id username image')

      res.header('X-Total-Count', String(total));

      res.json(posts.map(post => ({
        _id: post._id,
        user: post.user,
        image: host + post.imageUrl,
        date: post.postDate,
        likes: post.likes,
        shares: post.shares,
      })));

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async like(req: Request, res: Response) {
    const { userId, postId } = req.body;

    try {
      const post = await Post.findByIdAndUpdate(postId, {
        $addToSet: {
          likes: [userId]
        }
      });

      res.json(post);

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async disLike(req: Request, res: Response) {
    const { userId, postId } = req.body;

    try {
      const post = await Post.findByIdAndUpdate(postId, {
        $pull: {
          likes: userId
        }
      });

      res.json(post);

    } catch(e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();