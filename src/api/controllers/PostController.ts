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

      const user = await User.updateOne(
        { _id: userId },
        { $push: {
          posts: [postId]
        } }
      );

      console.log(user);

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
          fs.unlink(post.image, () => console.log(post.image + ' deleted'));
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
        .populate('user', '_id username imageUrl')
        .populate('likes', '_id username imageUrl')
        .populate('comments.user', '_id username')

      res.header('X-Total-Count', String(total));

      res.json(posts.map(post => ({
        _id: post._id,
        user: post.user,
        image: host + post.imageUrl,
        date: post.postDate,
        likes: post.likes,
        shares: post.shares,
        comments: post.comments
      })));

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async comment(req: Request, res: Response) {
    const { body, postId, userId } = req.body;

    try {
      const post = await Post.updateOne(
        { _id: postId },
        { $push: {
          comments: { user: userId, body }
        } }
      );

      res.status(201);
    } catch(e) {
      res.status(500).json(e);
    }
  }

  async like(req: Request, res: Response) {
    const { userId, postId } = req.body;

    try {
      const isLiked = await Post.findOne({
        _id: postId,
        likes: {
          $in: [userId]
        }
      });
    
      if (isLiked) {
        await Post.findByIdAndUpdate(postId, {
          $pull: {
            likes: userId
          }
        });
      } else {
        await Post.findByIdAndUpdate(postId, {
          $addToSet: {
            likes: [userId]
          }
        });
      }

      res.status(201);

    } catch(e) {
      res.json(e);
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