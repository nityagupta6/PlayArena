import mongoose from 'mongoose';
import { insertDefaultSports } from "./models/sport.model.js";
import { insertDefaultCenters } from "./models/center.model.js";
import { insertDefaultCourts } from "./models/court.model.js";

export default async function connDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_DB_CONN_STRING);
    console.log("Connected to the database");

    const sports = await insertDefaultSports();
    await insertDefaultCenters(sports.map((sport) => sport._id));
    await insertDefaultCourts();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
