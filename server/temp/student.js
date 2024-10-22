import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT);

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`App is listening  on port ${PORT}`);
});

// app.post("/:id", (req, res) => {
//   console.log({ query: req.query, params: req.params, body: req.body });
//   res.send({ message: "Post request was successful." });
// });

let allUser = [];

//Create user
app.post("/user/add", (req, res) => {
  let newUser = req.body;
  allUser.push(newUser);
  console.log(allUser);
  res.status(200).send({ message: "Added user successfully" });
});
console.log(allUser);

//Update user
app.put("/user/edit/:id", (req, res) => {
  const userId = req.params;
  const updatedUser = req.body;
  allUser.find(() => {
    allUser;
  }, userId);
});
//Read user
//Delete user
//patch
//inActive
//role Change
//password Change
//forget password
//list all users
