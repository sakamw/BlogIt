import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully." });
  } catch (e: any) {
    if (e.code === "P2002") {
      res.status(400).json({ message: "Email or username already in use." });
      return;
    }
    const message = e.message || "Something went wrong.";
    console.error(e);
    res.status(500).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("Login attempt - body:", req.body);
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({
        message: "Email/username and password are required.",
        error: "MISSING_CREDENTIALS",
      });
      return;
    }

    console.log("Login - checking database connection...");
    const user = await client.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    console.log("Login - found user:", user ? "yes" : "no");
    if (user) {
      console.log("Login - user id:", user.id);
    }

    if (!user) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    if (user.isDeleted) {
      res.status(403).json({ message: "This account has been deactivated." });
      return;
    }

    console.log("Login - comparing passwords...");
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const { password: userPassword, ...userDetails } = user;
    console.log(
      "Login - JWT_SECRET:",
      process.env.JWT_SECRET ? "set" : "missing"
    );

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set!");
      res.status(500).json({ message: "Server configuration error." });
      return;
    }

    const token = jwt.sign(userDetails, process.env.JWT_SECRET);
    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      })
      .json({ ...userDetails, token });
  } catch (error) {
    console.error("Login error details:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};
