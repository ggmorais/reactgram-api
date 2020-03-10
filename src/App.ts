import express from 'express';
import routes from './routes';
import cors from 'cors';

class App {

  app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', routes);
  }

}

export default new App().app;