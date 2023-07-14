const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const userRouter = express.Router();

userRouter.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "Registered Successfully!" });
});

userRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User not Found!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  userRouter: userRouter,
  verifyToken: verifyToken,
};
