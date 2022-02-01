const express = require("express");
const User = require("../models/UserModel");
const verify = require("../TokenVerity/Verify");
const Order = require("../models/OrderModel");
const orderRouter = express.Router();

// PLACE ORDER
/*
    @url : http://127.0.0.1:5000/api/orders
    @field : items, tax, total
    @access : private
*/

orderRouter.post("/", verify, async (req, res) => {
  try {
    let { items, tax, total } = req.body;

    let userId = req.user.id;
    let user = await User.findById(userId);

    let order = {
      name: user.name,
      email: user.email,
      mobile: user.address.mobile,
      items,
      tax,
      total,
    };

    await Order.create(order);

    res.status(200).json({
      status: "order placed sccessfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL ORDER
/*
    @url : http://127.0.0.1:5000/api/orders
    @field : 
    @access : private
*/

orderRouter.get("/", verify, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId);

    let orders = await Order.find({ email: user.email });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = orderRouter;
