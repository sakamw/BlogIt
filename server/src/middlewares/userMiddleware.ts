import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Auth middleware - cookies:", req.cookies);
  console.log("Auth middleware - headers:", req.headers.authorization);

  const token =
    req.cookies?.authToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  console.log("Auth middleware - token:", token ? "present" : "missing");

  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }
  try {
    console.log(
      "Auth middleware - JWT_SECRET:",
      process.env.JWT_SECRET ? "set" : "missing"
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Auth middleware - decoded:", decoded);

    if (typeof decoded !== "object" || !decoded || !("id" in decoded)) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }
    (req as any).user = { id: (decoded as any).id };
    console.log("Auth middleware - user set:", (req as any).user);
    next();
  } catch (e) {
    console.log("Auth middleware - error:", e);
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
}

export interface AuthRequest extends Request {
  user?: { id: number };
}
