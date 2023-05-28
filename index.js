const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://fitness:${MONGOOSE_PASSWORD}@cluster0.5stz6q1.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(PORT, () => {
  console.log(`Server runs on port - ${PORT}`);
});
