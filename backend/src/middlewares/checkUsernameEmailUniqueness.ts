import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function checkUniquenessOfUsernameEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userName, emailAddress } = req.body;
  const emailUsed = await client.user.findFirst({ where: {emailAddress} });
  if (emailUsed) {
    res.status(400).json({ message: "email exists" });
    return;
  }

  const userNameUsed = await client.user.findFirst({ where: { userName } });
  if (userNameUsed) {
    res.status(400).json({ message: "username taken" });
    return;
  }
  next();
}

export default checkUniquenessOfUsernameEmail;
