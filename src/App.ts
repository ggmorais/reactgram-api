import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

class App {

  app = express();

  constructor() {
    this.headers();
    this.middlewares();
    this.routes();
    this.database();
    this.public();
  }

  headers() {
    this.app.use((req, res, next) => {
      res.set('Access-Control-Expose-Headers', 'Authorization,X-Total-Count');
      next();
    })
  }

  public() {
    this.app.use('/public', express.static('src/public'))
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  database() {
    mongoose.connect('mongodb+srv://root:' + 
    process.env.MONGO_PW + 
    '@mongo-db-cekcg.mongodb.net/reactgram?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  routes() {
    this.app.use('/', routes);
  }

}

export default new App().app;