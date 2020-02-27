const mongoose = require("mongoose");
const joi = require("joi");

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true
  },
  title: { type: String, lowercase: true },
  description: { type: String, lowercase: true },
  category: { type: String, lowercase: true },
  location: { type: String, lowercase: true },
  images: { type: String },
  price: { type: String, lowercase: true },
  deliveryType: { type: String, lowercase: true },
  createdDate: { type: Date, default: Date.now() }
});

function itemValidator(items) {
  schema = {
    title: joi.string().required(),
    description: joi.string().required(),
    category: joi
      .string()
      .min(1)
      .max(255),
    location: joi.string().required(),
    images: joi.string(),
    price: joi.string().required(),
    deliveryType: joi
      .string()
      .valid("Shipping", "Pickup")
      .required()
  };
  return joi.validate(items, schema);
}

const Item = mongoose.model("item", itemSchema);
module.exports = { itemValidator, itemSchema, Item };
