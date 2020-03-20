import Post from '../models/PostModel';
import { Request, Response } from 'express';

class PostController {
  async create(req: Request, res: Response) {
    const { userId } = req.body;
    const image = req.file;

    // console.log(userId, req.file);

    res.send('ok');
    // const post = await new Post({
    //   user: userId,
    // });
  }

  async delete(req: Request, res: Response) {
    res.send('Post deleted!');
  }

  async get(req: Request, res: Response) {
    res.send('Returning all posts or one by id');
  }
}

export default new PostController();