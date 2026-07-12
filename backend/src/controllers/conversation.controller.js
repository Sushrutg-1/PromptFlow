import mongoose from "mongoose";
import { API_MESSAGES, HTTP_STATUS } from "../constants/index.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import Conversation from "../models/conversation.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Turn from "../models/turn.model.js";
import Response from "../models/response.model.js";
import generateAiResponses from "../services/ai.service.js";

export const createNewConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.create({
    title: "New Conversation",
    userId: req.user._id,
  });

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        { ...conversation.toObject(), turns: [] },
        API_MESSAGES.CONVERSATION_CREATED
      )
    );
});

export const getAllConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ userId: req.user._id })
    .select("title isPinned updatedAt")
    .sort({ updatedAt: -1 });

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, conversations, API_MESSAGES.CONVERSATIONS_FETCHED));
});

export const getConversationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.INVALID_CONVERSATION_ID);
  }

  const conversation = await Conversation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "turns",
        foreignField: "conversationId",
        localField: "_id",
        as: "turns",
        pipeline: [
          {
            $sort: {
              createdAt: 1,
            },
          },
          {
            $lookup: {
              from: "responses",
              localField: "_id",
              foreignField: "turnId",
              as: "responses",
              pipeline: [
                {
                  $sort: {
                    createdAt: 1,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ]);

  if (!conversation.length) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.CONVERSATION_NOT_FOUND);
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, conversation[0], API_MESSAGES.CONVERSATIONS_FETCHED));
});

export const renameConversation = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  if (!title?.trim()) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.REQUIRED_FIELDS_MISSING);
  }

  const conversation = await Conversation.findOneAndUpdate(
    {
      _id: id,
      userId: req.user._id,
    },
    {
      $set: {
        title: title?.trim(),
      },
    },
    { new: true }
  );
  if (!conversation) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.CONVERSATION_NOT_FOUND);
  }

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, conversation, API_MESSAGES.CONVERSATION_UPDATED));
});

export const deleteConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });
  if (!conversation) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.CONVERSATION_NOT_FOUND);
  }

  const turns = await Turn.find({
    conversationId: id,
  }).select("_id");

  const turnIds = turns.map((turn) => turn._id);

  await Response.deleteMany({
    turnId: {
      $in: turnIds,
    },
  });

  await Turn.deleteMany({
    conversationId: conversation._id,
  });

  return res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, {}, API_MESSAGES.CONVERSATION_DELETED));
});

// Response
export const sendMessage = asyncHandler(async (req, res) => {
  const { prompt, activeModels } = req.body;
  const { id: conversationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.INVALID_CONVERSATION_ID);
  }

  if (!prompt?.trim()) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.PROMPT_REQUIRED);
  }

  if (!Array.isArray(activeModels) || activeModels.length === 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, API_MESSAGES.ACTIVE_MODELS_REQUIRED);
  }

  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId: req.user._id,
  });

  if (!conversation) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, API_MESSAGES.CONVERSATION_NOT_FOUND);
  }

  conversation.updatedAt = new Date();

  if (conversation.title === "New Conversation") {
    conversation.title = prompt.trim().slice(0, 40);
  }

  await conversation.save();

  const turn = await Turn.create({
    conversationId,
    prompt,
    activeModels,
  });

  const aiResponses = await generateAiResponses(prompt?.trim(), activeModels);

  const responses = aiResponses.map((response) => ({
    turnId: turn._id,
    provider: response.provider,
    model: response.model,
    content: response.content,
    status: response.status,
    error: response.error,
  }));

  await Response.insertMany(responses);

  const turnWithResponses = await Turn.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(turn._id),
      },
    },
    {
      $lookup: {
        from: "responses",
        foreignField: "turnId",
        localField: "_id",
        as: "responses",
        pipeline: [
          {
            $sort: {
              createdAt: 1,
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, turnWithResponses[0], API_MESSAGES.MESSAGE_SENT));
});
