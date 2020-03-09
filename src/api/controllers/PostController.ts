import Post from '../models/PostModel';
import { Request, Response } from 'express';

class PostController {
  async create(req: Request, res: Response) {
    res.send('Post created!');
  }

  async delete(req: Request, res: Response) {
    res.send('Post deleted!');
  }

  async get(req: Request, res: Response) {
    res.send('Returning all posts or one by id');
  }
}

export default new PostController();