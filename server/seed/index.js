import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import data from "./fake.json" assert { type: "json" };

import mongoose from "mongoose";
import userController from "../modules/users/user.controller.js";
import movieController from "../modules/movies/movie.controller.js";

const setup = {
  initialize: async () => {
    try {
      console.log("starting db seeding");
      console.log(data.length);
      await mongoose.connect(process.env.DB_URL);
      const { data: yts } = await axios(
        "https://yts.mx/api/v2/list_movies.json"
      );
      const { data: m } = yts;
      const { movies } = m;
      console.log(movies);
      console.log("started adding user");
      const userA = {
        name: "Sujal dummy",
        email: "sujall@gmail.com",
        password: "123",
        roles: ["admin"],
      };
      const userB = {
        name: "Sujal dummy2",
        email: "sujall2@gmail.com",
        password: "1232",
      };
      const user1 = await userController.create(userA);
      const user2 = await userController.create(userB);
      console.log("User added successfully");
      console.log("Started adding movies in db");
      for (let i = 0; i < 10; i++) {
        const { slug, ...rest } = data[i];
        rest.rating = movies[i].rating;
        rest.poster = movies[i].large_cover_image;
        rest.createdBy = user1?._id;
        await movieController.create(rest);
      }
      for (let i = 10; i < 20; i++) {
        const { slug, ...rest } = data[i];
        rest.rating = movies[i].rating;
        rest.poster = movies[i].large_cover_image;
        rest.createdBy = user2?._id;
        await movieController.create(rest);
      }

      console.log("Movies added successfully");
    } catch (e) {
      console.log(e);
    }
  },
};
setup.initialize();
