import { Router } from "express";
import {
  getCurrentUser,
  updateUserInfo,
  updateUserPassword,
  getUserBlogs,
  uploadUserAvatar,
  updateUserAvatarUrl,
} from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/userMiddleware";
import { verifyNewPassStrength } from "../middlewares/newPassStrengthMiddleware";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

router.get("/current", authenticateJWT, getCurrentUser);
router.get("/blogs", authenticateJWT, getUserBlogs);
router.patch("/", authenticateJWT, updateUserInfo);
router.patch(
  "/password",
  authenticateJWT,
  verifyNewPassStrength,
  updateUserPassword
);
router.patch(
  "/avatar",
  authenticateJWT,
  upload.single("avatar"),
  uploadUserAvatar
);
router.patch("/avatar-url", authenticateJWT, updateUserAvatarUrl);

export default router;
