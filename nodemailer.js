const nodemailer = require("nodemailer");
require("dotenv").config();

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

let details = {
  from: fromEmail,
  to: toEmail,
  subject: "nodemailer test",
  text: "nodemailer works perfectly",
};

mailTransporter.sendMail(details, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent");
  }
});
