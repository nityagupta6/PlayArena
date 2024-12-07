import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
import connDB from './db.config.js';
connDB();

import userRoutes from './routes/user.routes.js';
app.use('/user', userRoutes);

import centerRoutes from './routes/center.routes.js';
app.use('/center', centerRoutes);

import sportRoutes from './routes/sport.routes.js';
app.use('/sport', sportRoutes);

import courtRoutes from './routes/court.routes.js';
app.use('/court', courtRoutes);

import bookingRoutes from './routes/booking.routes.js';
app.use('/booking', bookingRoutes);


app.listen( process.env.PORT ? process.env.PORT : 8080, ()=>{
  console.log(
    `listening on http://localhost:${
      process.env.PORT ? process.env.PORT : 8080
    }/`,
  )
});