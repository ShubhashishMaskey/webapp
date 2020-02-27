const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  phone: { type: String },
  address: { type: String },
  username: { type: String, trim: true },
  password: { type: String, trim: true },
  sellingItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }]
});

userSchema.methods.generateAuthToken = function() {
  const expireTime = Date.now() + 900000;
  const token = jwt.sign(
    {
      id: this.id,
      username: this.username,
      expireTime: expireTime
    },
    "process.env.JWT_PRIVATE_KEY"
  );
  return token;
};

function validateUser(user) {
  const schema = {
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    phone: joi.string().min(10).max(20).required(),
    address: joi.string().required(),
    username: joi
      .string()
      .min(3)
      .max(255)
      .required(),

    password: joi
      .string()
      .min(6)
      .max(1024)
      .required()
  };
  return joi.validate(user, schema);
}

const User = mongoose.model("user", userSchema);
module.exports = { userSchema, validateUser, User };
