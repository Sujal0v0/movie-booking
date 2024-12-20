import movieModel from "./movie.model.js";
import slugger from "../../utils/slugify.js";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();
//movie create (create)
const create = async (payload) => {
  //create slug from title
  const slug = slugger(payload?.title);
  const movie = await movieModel.findOne({ slug });
  //check if the slug exists in database
  console.log(movie);
  if (movie) throw new Error("The movie already exists");
  //create the movie
  payload.slug = slug;

  return await movieModel.create(payload);
};
//movie list (list)
const list = async ({ page = 1, limit = 10, search }) => {
  const query = [];

  if (search.title) {
    query.push({
      $match: {
        title: { $regex: search.title, $options: "i" },
      },
    });
  }
  //Pagination
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
        "data.createdBy": 0,
      },
    }
  );
  console.log(query);
  const result = await movieModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    movies: result[0]?.data,
    page: +page,
    limit: +limit,
    skip: (+page - 1) * +limit,
  };
};
//get one movie (getBySlug)
const getBySlug = async (slug) => {
  return movieModel.findOne({ slug });
};
//update release date (updateReleaseDate)
const updateReleaseDate = async (slug, payload) => {
  //release date should be < today and end day
  return movieModel.findOneAndUpdate({ slug }, payload, { new: true });
};
//update movie detail (updateMovie)
const update = async (slug, payload) => {
  if (payload?.title) {
    payload.slug = slugger(payload?.title);
  }
  return movieModel.updateOne({ slug }, payload);
};
//update Seat Number (updateSeats)
const updateSeats = async (slug, payload) => {
  //check if the number of seats are less than defined number
  const movie = await movieModel.findOne({ slug });
  if (!movie) throw new Error("Movie doesn't exists");
  if (payload?.seats < Number(process.env.NO_OF_SEATS)) {
    throw new Error(`Movie seats cant be less than ${process.env.NO_OF_SEATS}`);
  }
  return movieModel.updateOne({ slug }, payload);
};
//delete movie (removeMovie)
const removeMovie = async (slug) => {
  const movie = await movieModel.findOne({ slug });
  if (!movie) throw new Error("Movie doesn't exist");
  //movie ticket should not be sold
  //movie ticket should not be ongoing
  if (
    moment(movie?.releasedDate).isBefore(moment()) &&
    moment(movie?.endDate).isAfter(moment())
  ) {
    throw new Error("Movie is currently running.");
  }
  return movieModel.deleteOne({ slug });
};

export default {
  create,
  list,
  getBySlug,
  updateReleaseDate,
  update,
  updateSeats,
  removeMovie,
};
