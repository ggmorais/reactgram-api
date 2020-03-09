import Story from '../models/StoryModel';
import { Request, Response } from 'express';

class StoryController {
  async create(req: Request, res: Response) {
    res.send('Story created!');
  }

  async delete(req: Request, res: Response) {
    res.send('Story deleted!');
  }

  async get(req: Request, res: Response) {
    res.send('Returning all Stories or one by id');
  }
}

export default new StoryController();