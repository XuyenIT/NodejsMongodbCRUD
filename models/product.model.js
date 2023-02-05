const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Why no name?"],
  },
  price: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no price?"],
  },
  image: {
    type: String,
    required: [true, "Why no price?"],
  },
  created: {
    type: Date,
    require: true,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
