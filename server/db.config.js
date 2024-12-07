import mongoose from 'mongoose';
import { insertDefaultSports } from "./models/sport.model";
import { insertDefaultSports } from "./models/center.model";

export default function connDB() {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGO_DB_CONN_STRING)
    .then(() => {
      console.log('connected to db');
      await insertDefaultSports();
    });
}