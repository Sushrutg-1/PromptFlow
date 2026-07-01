import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createNewConversation,
  deleteConversation,
  getAllConversations,
  getConversationById,
  renameConversation,
  sendMessage,
} from "../controllers/conversation.controller.js";

const router = Router();

router.use(verifyJWT);

// Secured Routes

router.route("/").post(createNewConversation);
router.route("/").get(getAllConversations);
router.route("/:id/send-message").post(sendMessage);
router.route("/:id").get(getConversationById).patch(renameConversation).delete(deleteConversation);

export default router;
