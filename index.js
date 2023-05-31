const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const app = express();

const PORT = process.env.PORT;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
const fromEmail = process.env.EMAIL;
const toEmail = process.env.TOEMAIL;
const password = process.env.PASSWORD;

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

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: password,
  },
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: `New Form Submission (${user.email})`,
    text: `Name: ${user.name}\n Email: ${user.email}\n Phone: ${user.phoneNumber}\n\n ${user.textArea}`,
  };

  mailTransporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
  });

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server runs on port - ${PORT}`);
});
