import { Request, Response } from 'express';
import User from '../models/UserModel';

class SessionController {

  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({
        [username ? 'username' : 'email']: username ? username : email,
        password
      }).select('_id email username');

      if (!user) {
        res.status(401);
      }

      res.json(user);

    } catch(e) {
      res.status(500);
    }
  }

}

export default new SessionController();