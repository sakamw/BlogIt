import { Router } from "express";
import {
  getCurrentUser,
  updateUserInfo,
  updateUserPassword,
  getUserBlogs,
  uploadUserAvatar,
  updateUserAvatarUrl,
  deactivateUser,
} from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/userMiddleware";
import { verifyNewPassStrength } from "../middlewares/newPassStrengthMiddleware";

const router = Router();

router.get("/current", authenticateJWT, getCurrentUser);
router.get("/blogs", authenticateJWT, getUserBlogs);
router.patch("/", authenticateJWT, updateUserInfo);
router.patch(
  "/password",
  authenticateJWT,
  verifyNewPassStrength,
  updateUserPassword
);
router.patch("/avatar", authenticateJWT, uploadUserAvatar);
router.patch("/avatar-url", authenticateJWT, updateUserAvatarUrl);
router.patch("/deactivate", authenticateJWT, deactivateUser);

export default router;
