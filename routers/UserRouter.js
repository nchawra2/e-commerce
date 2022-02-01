const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const User = require("../models/UserModel");
const verify = require("../TokenVerity/Verify");

// REGISTER USER
/*
    @url : http://127.0.0.1/api/users/register
    @field : name , email , password
    @access : public
*/

userRouter.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // CHECK IF USER ALREADY EXIST
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "user already exist" });
    }

    // ENCRYPT PASSWORD
    let salt = await bcrypt.genSalt(10);
    let hassedPassword = await bcrypt.hash(password, salt);

    // SAVE TO DATABASE
    let address = {
      country: "",
      state: "",
      city: "",
      colony: "",
      mobile: "",
    };

    let newUser = await User.create({
      name,
      email,
      password: hassedPassword,
      address,
    });

    res.status(201).json({
      status: "register successfull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// LOGIN USER
/*
    @url : http://127.0.0.1/api/users/login
    @field :  email , password
    @access : public
*/

userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // check email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "email not found" });
    }

    // check password
    const decode = await bcrypt.compare(password, user.password);
    if (!decode) {
      return res.status(404).json({ msg: "password is incorrect" });
    }

    // send token and res
    let payload = {
      user: {
        id: user.id,
      },
    };

    let token = jwt.sign(payload, process.env.SECRET_JWT);

    res.status(200).json({
      status: "login success",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET USER
/*
    @url : http://127.0.0.1/api/users
    @field : ---
    @access : private
*/

userRouter.get("/", verify, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");

  res.status(200).json({
    user: user,
  });
});

// UPDATE USER ADDRESS
/*
    @url : http://127.0.0.1/api/users/address
    @field : ---
    @access : private
*/

userRouter.put("/address", verify, async (req, res) => {
  try {
    let { country, state, city, mobile, colony } = req.body;

    let newAddress = {
      country,
      state,
      city,
      mobile,
      colony,
    };

    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        address: newAddress,
      },
      { new: true }
    );

    res.status(200).json({
     
        status: "address updated successfully",
      
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;
