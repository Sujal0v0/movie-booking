import express from "express";
import dotenv from "dotenv";
dotenv.config();
import indexRouter from "./routes/index.js";
import morgan from "morgan";
import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((e) => {
    console.log("Database Error", e);
  });
const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(morgan("dev"));
app.use("/assets", express.static("public"));

// app.use((req, res, next) => {
//   req.body.country = "Np";
//   req.body.currency = "NPR";
//   req.body.currentTime = new Date().toISOString();
//   next();
// });

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errorMsg = err ? err.toString() : "Something went wrong!";
  res.status(500).send({ message: errorMsg });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
