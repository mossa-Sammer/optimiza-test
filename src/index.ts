require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';

import router from './API/router';

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

const port = process.env.PORT || 5000;
createConnection()
  .then(async connection => {
    console.log('db connected!!!!');

    app.listen(port, () => {
      console.log(`app is running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
// API health check
app.get('/', (req, res, next) => {
  res.json({ msg: 'ok' });
});

app.use('/api/v1', router);

export default app;
