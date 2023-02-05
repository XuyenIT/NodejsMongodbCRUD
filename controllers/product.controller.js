const Product = require("../models/product.model");
const fs = require("fs");
const getAllProduct = (req, res) => {
  Product.find().exec((err, products) => {
    if (err) {
      console.log("err", err);
      res.json({ message: err.message });
    } else {
      res.render("home", { products: products });
    }
  });
};
const getFormAddProduct = (req, res) => {
  res.render("create");
};
let appPublicFolder = "public";
let pathFile = "";
const createProduct = (req, res) => {
  const { name, price } = req.body;
  const { file } = req;
  if (file) {
    pathFile = file.path.substr(appPublicFolder.length + 1);
  }
  const product = new Product({
    name: name,
    image: pathFile,
    price: price,
  });
  product.save((err) => {
    if (err) {
      let errors = {};

      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      console.log("error message", errors);
      req.session.message = {
        type: "error",
        message: errors,
      };
      res.redirect("/create");
    } else {
      req.session.message = {
        type: "success",
        message: "Add product successfully",
      };
      res.redirect("/");
    }
  });
};
const getFormEditProduct = (req, res) => {
  let { id } = req.params;
  Product.findById(id, (err, product) => {
    if (err) {
      res.redirect("/");
    } else {
      if (product == null) {
        res.redirect("/");
      } else {
        res.render("update", {
          product: product,
        });
      }
    }
  });
};
const updateProduct = (req, res) => {
  const { _id, name, price } = req.body;
  let new_image = "";
  const { file } = req;
  if (file) {
    new_image = file.path.substr(appPublicFolder.length + 1);
    try {
      fs.unlinkSync("./public/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }
  console.log("new image", new_image);
  Product.findByIdAndUpdate(
    _id,
    {
      name: name,
      price: price,
      image: new_image,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Product update successfully",
        };
        res.redirect("/");
      }
    }
  );
};
//delete user
const deleteProduct = (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, result) => {
    console.log("result delete", result);
    if (result.image != "") {
      try {
        fs.unlinkSync("./public/" + result.image);
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "success",
        message: "Product deleted successfully",
      };
      res.redirect("/");
    }
  });
};
const searchName = (req, res) => {
  const { name } = req.query;
  console.log("name", name);
  const nameRegex = new RegExp(name, "i");
  Product.find({ name: nameRegex }, (err, products) => {
    if (err) {
      res.redirect("/");
    } else {
      res.render("home", { products: products });
    }
  });
};
module.exports = {
  getAllProduct,
  getFormAddProduct,
  createProduct,
  getFormEditProduct,
  updateProduct,
  deleteProduct,
  searchName,
};
