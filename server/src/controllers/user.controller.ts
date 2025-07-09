import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/userMiddleware";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return void res.status(401).json({ message: "No token provided." });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "object" || !decoded || !("id" in decoded)) {
      return void res.status(401).json({ message: "Invalid token." });
    }
    const user = await client.user.findUnique({
      where: { id: Number((decoded as any).id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) return void res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (e) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const updateUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }
    const { firstName, lastName, username, email } = req.body;
    let whereClause: any = { NOT: { id: Number(userId) } };
    if (username && email) {
      whereClause.OR = [{ username }, { email }];
    } else if (username) {
      whereClause.username = username;
    } else if (email) {
      whereClause.email = email;
    }
    if (username || email) {
      const existing = await client.user.findFirst({
        where: whereClause,
      });
      if (existing) {
        return void res
          .status(400)
          .json({ message: "Email or username already in use." });
      }
    }
    const updated = await client.user.update({
      where: { id: Number(userId) },
      data: {
        firstName,
        lastName,
        username,
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return void res.json(updated);
  } catch (e) {
    return void res
      .status(500)
      .json({ message: "Failed to update user info." });
  }
};

export const updateUserPassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res
        .status(400)
        .json({ message: "Current and new password are required." });
      return;
    }
    const user = await client.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Current password is incorrect." });
      return;
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await client.user.update({
      where: { id: Number(userId) },
      data: { password: hashed },
    });
    res.json({ message: "Password updated successfully." });
  } catch (e) {
    res.status(500).json({ message: "Failed to update password." });
  }
};

export const getUserBlogs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }
    const blogs = await client.blog.findMany({
      where: {
        authorId: Number(userId),
        isDeleted: false,
      },
      orderBy: { createdAt: "desc" },
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
    res.json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch user blogs." });
  }
};

export const uploadUserAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }
    const avatarPath = `/uploads/${req.file.filename}`;
    await client.user.update({
      where: { id: Number(userId) },
      data: { avatar: avatarPath },
    });
    res.json({ message: "Profile picture updated.", avatar: avatarPath });
  } catch (e) {
    res.status(500).json({ message: "Failed to upload profile picture." });
  }
};
