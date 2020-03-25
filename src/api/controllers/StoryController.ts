import Story from '../models/StoryModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

class StoryController {
  async create(req: Request, res: Response) {
    const { userId } = req.body;
    const image = req.file;

    try {
      const story = await new Story({
        _id: image.filename.split('.')[0],
        user: userId,
        image: image.destination + '/' + image.filename,
        imageUrl: '/public/images/' + image.filename
      }).save();
      
      res.json(story);

    } catch(e) {
      res.status(500).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    const { storyId } = req.params;

    try {
      const story = await Story.findByIdAndDelete(storyId);

      res.json(story);
  
    } catch(e) {
      res.status(500).json(e);
    }
  }

  async get(req: Request, res: Response) {
    const { storyId } = req.params;

    try {
      const story = await Story.find(storyId && { _id: storyId });

      res.json(story);

    } catch(e) {
      res.status(500).json(e);
    }
  }
}

export default new StoryController();