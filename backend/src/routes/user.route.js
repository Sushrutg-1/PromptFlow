import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

router.use(verifyJWT);

//Secured Routes
router.route("/logout").post(logoutUser);
router.route("/password").post(changeCurrentPassword);
router.route("/current-user").get(getCurrentUser);
router.route("/avatar").patch(upload.single("avatar"), updateUserAvatar);
router.route("/update-account-details").post(updateAccountDetails);

export default router;
