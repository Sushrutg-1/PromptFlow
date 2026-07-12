export const API_MESSAGES = Object.freeze({
  // Authentication
  REGISTER_SUCCESS: "User registered successfully. Please login.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",

  PASSWORD_CHANGED: "Password changed successfully.",
  PASSWORD_MISMATCH: "New password and confirm password do not match.",
  PASSWORD_SAME_AS_OLD: "New password must be different from the current password.",

  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_ALREADY_EXISTS: "User already exists.",
  USER_NOT_FOUND: "User not found.",
  USER_FETCHED: "User fetched successfully.",

  ACCOUNT_DETAILS_UPDATED_SUCCESS: "Account details updated successfully.",

  NO_AVATAR_UPLOADED: "No avatar uploaded.",
  INVALID_AVATAR_FILE: "Invalid avatar file.",
  AVATAR_NOT_FOUND: "Avatar not found.",
  AVATAR_UPDATED_SUCCESS: "Avatar updated successfully.",
  AVATAR_UPDATE_FAILED: "Failed to update avatar.",

  // Conversation
  CONVERSATION_CREATED: "Conversation created successfully.",
  CONVERSATION_UPDATED: "Conversation updated successfully.",
  CONVERSATION_DELETED: "Conversation deleted successfully.",
  CONVERSATION_NOT_FOUND: "Conversation not found.",
  CONVERSATIONS_FETCHED: "Conversation fetched successfully",
  INVALID_CONVERSATION_ID: "Invalid Conversation Id.",

  PROMPT_REQUIRED: "Prompt required",
  ACTIVE_MODELS_REQUIRED: "Active models are required",

  // Messages
  MESSAGE_SENT: "Message sent successfully.",
  MESSAGE_DELETED: "Message deleted successfully.",

  // Common
  INTERNAL_SERVER_ERROR: "Internal server error.",
  UNAUTHORIZED: "Unauthorized.",
  FORBIDDEN: "Forbidden.",
  REQUIRED_FIELDS_MISSING: "Please provide all required fields.",

  REFRESH_TOKEN_SUCCESS: "Refresh Access Token Successfully.",
  REFRESH_TOKEN_EXPIRED: "Refresh token has expired.",
  INVALID_REFRESH_TOKEN: "Refresh token is invalid.",

  ACCESS_TOKEN_EXPIRED: "Access token has expired.",
  INVALID_ACCESS_TOKEN: "Access token is invalid.",

  ACCESS_TOKEN_REFRESHED: "Refresh Access Token Successfully",
});
