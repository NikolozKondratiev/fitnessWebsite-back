const express = require("express");
const app = express();
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");
const connectDB = require("./db");
require("dotenv").config();

const PORT = process.env.PORT;

app.use("/", postRoute);
app.use("/", getRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server runs on port - ${PORT}`);
});
