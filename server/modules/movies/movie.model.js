import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;
//? schema
const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    duration: { type: String, required: true },
    synopsis: { type: String },
    poster: { type: String, required: true },
    releasedDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date, required: true },
    seats: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 100 },
    //TODO createdBy:{}
    //TODO
    createdBy: { type: ObjectId, ref: "User" },
    modifiedBy: { type: ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
//? model
const Movie = model("Movie", movieSchema);

export default Movie;
