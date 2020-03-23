import Post from '../models/PostModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import fs from 'fs';

class PostController {
  async create(req: Request, res: Response) {
    const { userId } = req.body;
    const image = req.file;

    try {
      const post = await new Post({
        _id: new mongoose.Types.ObjectId(),
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
          fs.unlink(post.image, _ => _);
      });

      const deleted = await Post.findByIdAndDelete(postId);

      res.json(deleted);

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async get(req: Request, res: Response) {
    const host = req.get('host');
  
    try {
      const post = await Post.find().populate('user');
    
      res.json(post);
      
    } catch(e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();