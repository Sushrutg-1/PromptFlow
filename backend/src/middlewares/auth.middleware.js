import env from "../config/env.js";
import { API_MESSAGES, HTTP_STATUS } from "../constants/index.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "./asyncHandler.middleware.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.UNAUTHORIZED);
    }

    const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-refreshToken");
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_ACCESS_TOKEN);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_ACCESS_TOKEN);
  }
});
