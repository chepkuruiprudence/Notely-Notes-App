import { Request, Response, NextFunction } from "express";

export const validatenote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === "DELETE") return next();
  const { title, synopsis, content, isPublic } = req.body;
  if (!title || !synopsis || !content || !isPublic) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
};

export default validatenote;
