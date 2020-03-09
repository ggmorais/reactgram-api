import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

class App {

  app = express();

  constructor() {
    this.routes();
  }

  routes() {
    this.app.use('/api', routes);
  }

}

export default new App().app;