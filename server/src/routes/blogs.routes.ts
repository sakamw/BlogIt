import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { authenticateJWT } from "../middlewares/userMiddleware";

const router = Router();

// Multer setup for featured image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/", authenticateJWT, upload.single("featuredImage"), createBlog);
router.patch(
  "/:blogId",
  authenticateJWT,
  upload.single("featuredImage"),
  updateBlog
);
router.delete("/:blogId", authenticateJWT, deleteBlog);

export default router;
