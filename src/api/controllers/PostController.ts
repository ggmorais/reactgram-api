import Post from '../models/PostModel';
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
    const { postId } = req.params;

    try {
      const post = await Post.find(postId && { _id: postId })
        .populate('user', '_id fullname username')
        .populate('likes', '_id fullname username');
    
      res.json(post);
      
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