const express = require("express");
const router = express.Router();
const UserModel = require("../models/Users");

router.use(express.json());

router.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
