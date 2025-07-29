import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      userName,
      emailAddress,
      profileImage,
      passWord,
    } = req.body;

    if (!firstName || !lastName || !userName || !emailAddress || !passWord) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const hashedPassword = await bcrypt.hash(passWord, 10);
    console.log(hashedPassword);
    const profileInitials = `${firstName[0]} ${lastName[0]}`.toUpperCase();
    const finalProfileImage = profileImage || profileInitials;

    await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
        profileImage: finalProfileImage,
        passWord: hashedPassword,
      },
    });
    res.status(201).json({ message: "User Created Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { identifier, passWord } = req.body;
    console.log("successful");

    if (!identifier || !passWord) {
      return res
        .status(400)
        .json({ message: "Please enter your email or username" });
    }

    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: identifier }, { emailAddress: identifier }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const matchPassword = await bcrypt.compare(passWord, user.passWord);
    if (!matchPassword) {
      return res.status(400).json({ message: " Wrong Credentials" });
    }

    const {
      passWord: userPassword,
      datejoined,
      updatedAt,
      ...userDetails
    } = user;

    const payload = {
      id: user.id,
      userName: user.userName,
      email: user.emailAddress,
      profileImage: user.profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });

    return res
      .status(201)
      .json({ message: "Login Successful", token, userDetails: payload });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  try {
    console.log(`Logged out successfully`);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log("Error logging out", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
