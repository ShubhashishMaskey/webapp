const express = require("express");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid Username or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid Username or Password");

  const token = user.generateAuthToken();
  const payload = _.pick(user, ["id", "username"]);
  payload.token = token;
  res
    .header("auth_token", token)
    .send(payload);
});

function validateAuth(request) {
  const schema = {
    username: joi
      .string()
      .min(3)
      .max(255)
      .required(),
    password: joi
      .string()
      .min(3)
      .max(1024)
      .required()
  };

  return joi.validate(request, schema);
}

module.exports = router;
