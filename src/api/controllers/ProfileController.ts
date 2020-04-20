import { Request, Response } from 'express';
import User from '../models/UserModel';

class ProfileController {

  async index(req: Request, res: Response) {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username })
        .select('-password')
        .populate('posts')
        .populate('marked')
        .populate('following', '-password')
        .populate('followers', '-password')

      const { _doc }: any = user;

      res.json({
        ..._doc,
        host: `${req.protocol}://${req.get('host')}`
      });

    } catch(e) {
      res.status(500);
    }
  }

}

export default new ProfileController();