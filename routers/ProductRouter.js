const express = require("express");
const Product = require("../models/ProductModel");
const verify = require("../TokenVerity/Verify");
const productRouter = express.Router();

// CREATE PRODUCT
/*
    @url : http://127.0.0.1:5000/api/products/upload
    @field : name brand image price qty category description
    @access : private
*/

productRouter.post("/upload", verify, async (req, res) => {
  try {
    let { name, image, qty, price, description, brand, category } = req.body;

    let product = await Product.create({
      name,
      image,
      qty,
      price,
      description,
      brand,
      category,
    });

    res.status(200).json({
      status: "product uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get men products
/*
    @url : http://127.0.0.1:5000/api/products/men
    @field : 
    @access : public
*/

productRouter.get("/men", async (req, res) => {
  try {
    let products = await Product.find({ category: "MEN" });
    if (!products) {
      return res.status(404).json({ msg: "NO PRODUCT FOUND" });
    }

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get women products
/*
    @url : http://127.0.0.1:5000/api/products/women
    @field : 
    @access : public
*/

productRouter.get("/women", async (req, res) => {
  try {
    let products = await Product.find({ category: "WOMEN" });
    if (!products) {
      return res.status(404).json({ msg: "NO PRODUCT FOUND" });
    }

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get kids products
/*
    @url : http://127.0.0.1:5000/api/products/kids
    @field : 
    @access : public
*/

productRouter.get("/kids", async (req, res) => {
  try {
    let products = await Product.find({ category: "KIDS" });
    if (!products) {
      return res.status(404).json({ msg: "NO PRODUCT FOUND" });
    }

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// get single product
/*
    @url : http://127.0.0.1:5000/api/products/:productId
    @field : 
    @access : public
*/

productRouter.get("/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    let selectedProduct = await Product.findById(productId);

    if (!selectedProduct) {
      return res.status(404).json({ msg: "no product found for this Id" });
    }

    res.status(200).json({
      status: "success",
      selectedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = productRouter;
