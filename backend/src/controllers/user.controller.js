import env from "../config/env.js";
import {
  API_MESSAGES,
  HTTP_STATUS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  ACCESS_TOKEN_COOKIE_OPTIONS,
} from "../constants/index.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { uploadToCloude } from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.USER_NOT_FOUND);
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  user.refreshToken = refreshToken;

  await user.save({
    validateBeforeSave: false,
  });

  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => !field?.trim())) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.REQUIRED_FIELDS_MISSING);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, API_MESSAGES.USER_ALREADY_EXISTS);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  const createdUser = await User.findById(user._id).select("-refreshToken");
  if (!createdUser) {
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, API_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, createdUser, API_MESSAGES.REGISTER_SUCCESS));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => !field?.trim())) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.REQUIRED_FIELDS_MISSING);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select("+password");
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.USER_NOT_FOUND);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_CREDENTIALS);
  }

  const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-refreshToken");

  return res
    .status(HTTP_STATUS.OK)
    .cookie("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS)
    .cookie("accessToken", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS)
    .json(new ApiResponse(HTTP_STATUS.OK, loggedInUser, API_MESSAGES.LOGIN_SUCCESS));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.UNAUTHORIZED);
  }

  try {
    decodedRefreshToken = jwt.verify(incomingRefreshToken, env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  if (!decodedRefreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  const user = await User.findById(decodedRefreshToken._id);
  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.REFRESH_TOKEN_EXPIRED);
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  return res
    .status(HTTP_STATUS.OK)
    .cookie("refreshToken", newRefreshToken, REFRESH_TOKEN_COOKIE_OPTIONS)
    .cookie("accessToken", newAccessToken, ACCESS_TOKEN_COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        API_MESSAGES.ACCESS_TOKEN_REFRESHED
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(HTTP_STATUS.OK)
    .clearCookie("accessToken", ACCESS_TOKEN_COOKIE_OPTIONS)
    .clearCookie("refreshToken", REFRESH_TOKEN_COOKIE_OPTIONS)
    .json(new ApiResponse(HTTP_STATUS.OK, {}, API_MESSAGES.LOGOUT_SUCCESS));
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { password, newPassword, confirmNewPassword } = req.body;

  if ([password, newPassword, confirmNewPassword].some((field) => !field?.trim())) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.REQUIRED_FIELDS_MISSING);
  }

  if (password === newPassword) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.PASSWORD_SAME_AS_OLD);
  }

  if (newPassword !== confirmNewPassword) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.PASSWORD_MISMATCH);
  }

  const user = await User.findById(req.user._id).select("-refreshToken +password");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, API_MESSAGES.UNAUTHORIZED);
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, {}, API_MESSAGES.PASSWORD_CHANGED));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, API_MESSAGES.USER_FETCHED));
});

export const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.AVATAR_NOT_FOUND);
  }

  const avatar = await uploadToCloude(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, API_MESSAGES.AVATAR_UPDATE_FAILED);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar?.url,
      },
    },
    {
      new: true,
    }
  ).select("-refreshToken");

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, API_MESSAGES.AVATAR_UPDATED_SUCCESS));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if ([name, email].some((field) => !field?.trim())) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.REQUIRED_FIELDS_MISSING);
  }

  const existingUser = await User.findOne({ email }).select("-refreshToken");
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, API_MESSAGES.USER_ALREADY_EXISTS);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
    },
    {
      new: true,
    }
  ).select("-refreshToken");

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, API_MESSAGES.ACCOUNT_DETAILS_UPDATED_SUCCESS));
});
