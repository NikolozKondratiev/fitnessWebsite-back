const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://fitness:${MONGOOSE_PASSWORD}@cluster0.5stz6q1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to db");
  });

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server runs on port - ${PORT}`);
});
