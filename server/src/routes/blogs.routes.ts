import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { authenticateJWT } from "../middlewares/userMiddleware";

const router = Router();


router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/", authenticateJWT, createBlog);
router.patch("/:blogId", authenticateJWT, updateBlog);
router.delete("/:blogId", authenticateJWT, deleteBlog);

export default router;
