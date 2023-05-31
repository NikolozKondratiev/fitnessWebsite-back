const mongoose = require("mongoose");
require("dotenv").config();

const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;

const connectDB = async () => {
  mongoose
    .connect(
      `mongodb+srv://fitness:${MONGOOSE_PASSWORD}@cluster0.5stz6q1.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("something went wrong");
      process.exit(1);
    });
};

module.exports = connectDB;
