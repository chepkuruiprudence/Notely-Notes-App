import zxcvbn from "zxcvbn";
import { Request, Response, NextFunction } from "express";

function verifyPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { passWord } = req.body;

  if (typeof passWord !== "string") {
    return res.status(400).json({ error: "Password must be a string." });
  }

  const passWordStrength = zxcvbn(passWord);

  if (passWordStrength.score < 3) {
    return res.status(400).json({ message: "Password is too weak!" });
  }

  next();
}

export default verifyPasswordStrength;
