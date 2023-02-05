const express = require("express");
const {
  getAllProduct,
  getFormAddProduct,
  createProduct,
  getFormEditProduct,
  updateProduct,
  deleteProduct,
  searchName,
} = require("../controllers/product.controller");
const uploadImage = require("../middleware/upload");
const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/create", getFormAddProduct);
productRouter.post("/create", uploadImage(), createProduct);
productRouter.get("/update/:id", getFormEditProduct);
productRouter.post("/update", uploadImage(), updateProduct);
productRouter.get("/delete/:id", deleteProduct);
productRouter.get("/search", searchName);
module.exports = {
  productRouter,
};
