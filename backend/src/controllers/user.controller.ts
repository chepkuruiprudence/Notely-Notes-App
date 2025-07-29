import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const profile = await client.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true,
        profileImage: true,
      },
    });

    if (!profile) {
      res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({ profile });
  } catch (e) {
    console.log("Error getting profile", e);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, userName, emailAddress, profileImage } =
      req.body;
    const userId = req.user.id;

    const profile = await client.user.findUnique({ where: { id: userId } });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.id !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUserProfile = await client.user.update({
      where: { id: userId },
      data: {
        id,
        firstName,
        lastName,
        userName,
        emailAddress,
        profileImage,
      },
    });

    return res
      .status(200)
      .json({ message: "Profile updated successfully.", updatedUserProfile });
  } catch (e) {
    console.log("Error updating note.", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmedPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== confirmedPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passWord);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current passwords don't match." });
    }

    const hashedPassWord = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await client.user.update({
      where: { id: userId },
      data: { passWord: hashedPassWord },
    });
    res.status(200).json({ updatedPassword });
  } catch (e) {
    console.log("Could not update password.", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get user notes
export const getAllUserNotes = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const notes = await client.note.findMany({
      where: { userId: user.id, isDeleted: false },
      orderBy: {
        dateCreated: "desc",
      },
    });
    res.status(200).json(notes);
  } catch (e) {
    res.status(400).json({ message: "Failed to fetch notes", e });
  }
};

//get deleted notes for a user
export const getAllDeletedNotes = async (req: Request, res: Response) => {
  try {
    console.log("Entered getAllDeletedNotes route");
    const user = (req as any).user;

    if (!user) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedNotes = await client.note.findMany({
      where: {
        isDeleted: true,
        userId: user.id,
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    if (!deletedNotes || deletedNotes.length === 0) {
      return res.status(404).json({ message: "There are no deleted posts" });
    }

    console.log(deletedNotes);
    return res.status(200).json({
      message: "Deleted notes fetched successfully",
      data: deletedNotes,
    });
  } catch (e) {
    console.error("Error fetching deleted notes:", e);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export const getPinnedNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const pinnedNotes = await client.note.findMany({
      where: {
        userId: userId,
        isPinned: true,
        isDeleted: false,
      },
      orderBy: {
        dateCreated: "desc",
      },
    });

    console.log("Found pinned notes:", pinnedNotes.length);

    return res.status(200).json({
      success: true,
      data: pinnedNotes,
      message: "Pinned notes retrieved successfully",
    });
  } catch (err: any) {
    console.error("Error in getPinnedNotes:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
