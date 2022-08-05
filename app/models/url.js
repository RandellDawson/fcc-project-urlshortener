import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const urlSchema = new Schema({
  _id: { type: String, required: true },
  originalUrl:  String,
  dateCreated: { type: Date, default: Date.now },
});

export default mongoose.model("Url", urlSchema);