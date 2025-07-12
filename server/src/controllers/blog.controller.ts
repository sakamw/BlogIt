import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/userMiddleware";

const prisma = new PrismaClient();

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    let where: any = { isDeleted: false };
    if (search) {
      if (!isNaN(Number(search))) {
        where = {
          ...where,
          OR: [
            { id: Number(search) },
            { title: { contains: search, mode: "insensitive" } },
          ],
        };
      } else {
        where = {
          ...where,
          title: { contains: search, mode: "insensitive" },
        };
      }
    }
    const blogs = await prisma.blog.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { title, synopsis, content } = req.body;
  // Use uploaded file if present
  const featuredImage = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.featuredImage;
  if (!featuredImage || !title || !synopsis || !content) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }
  if (!userId) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        featuredImage,
        title,
        synopsis,
        content,
        authorId: userId,
      },
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    if (!blog || blog.isDeleted) {
      res.status(404).json({ message: "Blog not found." });
      return;
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { blogId } = req.params;
  const { title, synopsis, content } = req.body;
  // Use uploaded file if present
  const featuredImage = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.featuredImage;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });
    if (!blog || blog.isDeleted) {
      res.status(404).json({ message: "Blog not found." });
      return;
    }
    if (blog.authorId !== userId) {
      res.status(403).json({ message: "Unauthorized." });
      return;
    }
    const updated = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: {
        featuredImage: featuredImage ?? blog.featuredImage,
        title: title ?? blog.title,
        synopsis: synopsis ?? blog.synopsis,
        content: content ?? blog.content,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { blogId } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });
    if (!blog || blog.isDeleted) {
      res.status(404).json({ message: "Blog not found." });
      return;
    }
    if (blog.authorId !== userId) {
      res.status(403).json({ message: "Unauthorized." });
      return;
    }
    await prisma.blog.update({
      where: { id: Number(blogId) },
      data: { isDeleted: true },
    });
    res.json({ message: "Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
