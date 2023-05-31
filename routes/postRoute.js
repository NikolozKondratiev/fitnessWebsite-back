const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require("../models/Users");

require("dotenv").config();
router.use(express.json());

const fromEmail = process.env.EMAIL;
const toEmail = process.env.TOEMAIL;
const password = process.env.PASSWORD;

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: password,
  },
});

router.post("/createUser", async (req, res) => {
  console.log(req.body);
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

module.exports = router;
