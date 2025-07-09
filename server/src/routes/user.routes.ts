import { Router } from "express";
import {
  getCurrentUser,
  updateUserInfo,
  updateUserPassword,
  getUserBlogs,
  uploadUserAvatar,
} from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/userMiddleware";
import { verifyNewPassStrength } from "../middlewares/newPassStrengthMiddleware";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/current", getCurrentUser);
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

export default router;
