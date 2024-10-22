import orderModel from "./order.model.js";
import movieModel from "../movies/movie.model.js";
import { v4 as uuidv4 } from "uuid";

const create = async (payload) => {
  payload.id = uuidv4();
  //Check the movie seats
  payload?.products.map(async (product) => {
    const movie = await movieModel.findOne({ _id: product?.movie });
    if (!movie) throw new Error("No movie found.");
    if (movie.seats < product?.quantity)
      throw new Error("Seats are not available.");
  });
  //Create order
  const order = await orderModel.create(payload);
  //Subtract seats
  if (!order) throw new Error("No movie found.");
  order.products.map(async (product) => {
    const movie = await movieModel.findOne({ _id: product?.movie });
    if (movie.seats < product?.quantity)
      throw new Error("Seats are not available.");
    await movieModel.updateOne(
      { _id: product?.movie },
      { seats: movie.seats - product?.quantity }
    );
  });
  return order;
};

const getById = async (id) => {
  const result = await orderModel.aggregate([
    {
      $match: {
        id: "c8e409f8-8925-44b0-84c7-2123a65a0164",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "buyer",
        foreignField: "_id",
        as: "buyer",
      },
    },
    {
      $unwind: {
        path: "$buyer",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        "buyer.password": false,
        "buyer.roles": false,
        "buyer.isActive": false,
        "buyer.isEmailVerified": false,
      },
    },
  ]);
  //TODO Aggregating movies
  return result[0];
};

const updateById = (id, payload) => {
  const { status, ...rest } = payload;
  return orderModel.findOneAndUpdate({ id }, rest, { new: true });
};

const list = async ({ page = 1, limit = 10, search }) => {
  const query = [];

  if (search.id) {
    query.push({
      $match: {
        buyer: search.id,
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
    }
  );
  console.log(query);
  const result = await orderModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    users: result[0]?.data,
    page: +page,
    limit: +limit,
    skip: (+page - 1) * +limit,
  };
};

const changeStatus = async (id, payload) => {
  const order = await orderModel.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  if ((order && order.status === "cancelled") || order.status === "failed") {
    order.products.map(async (product) => {
      const movie = await movieModel.findOne({ _id: product?.movie });
      if (!movie) throw new Error("No movie found.");
      await movieModel.updateOne(
        { _id: movie.id },
        { seats: movie.seats + product?.quantity }
      );
    });
  }
};

export default { create, getById, updateById, list, changeStatus };
