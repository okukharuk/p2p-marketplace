import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authorize = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
    } catch (error) {
      req.authError = "Not authorized, invalid token";
      res.status(401);
    }
  } else {
    req.authError = "Not authorized, no token";
  }

  next();
});

const protect = async (req, res, next) => {
  if (req.authError) {
    res.status(401);
    throw new Error(req.authError);
  }

  next();
};

export { protect, authorize };
