import mongoose, { model, Schema } from "mongoose";
import { MESSAGE_ROLES, MESSAGE_STATUS } from "../constants";

const MessageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    parentMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    role: {
      type: String,
      enum: Object.values(MESSAGE_ROLES),
      required: true,
    },
    provider: {
      type: String,
      trim: true,
      default: null,
    },
    model: {
      type: String,
      trim: true,
      default: null,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MESSAGE_STATUS),
      default: MESSAGE_STATUS.COMPLETED,
    },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

export default Message;
