import express from "express";
const router = express.Router();

import movieRouter from "../modules/movies/movie.api.js";
import orderRouter from "../modules/orders/order.api.js";
import userRouter from "../modules/users/user.api.js";

router.get("/api/v1", (req, res, next) => {
  try {
    res.send({ message: "Movie mate API is working" });
  } catch (error) {
    next(error);
  }
});

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/orders", orderRouter);
router.use("/api/v1/users", userRouter);

export default router;
