import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";

export async function verifyNewPassStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { newPassword } = req.body;
  if (typeof newPassword !== "string" || !newPassword) {
    res
      .status(400)
      .json({ message: "New password is required and must be a string." });
    return;
  }
  const result = zxcvbn(newPassword);
  if (result.score < 3) {
    res.status(400).json({ message: "Please select a strong password" });
    return;
  }
  next();
}
