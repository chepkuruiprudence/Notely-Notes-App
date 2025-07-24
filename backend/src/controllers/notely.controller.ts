import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

//create note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content } = req.body;

    if (!title || !synopsis || !content) {
      return res.status(400).json({ message: "Missing required body field." });
    }

    const note = await client.note.create({
      data: {
        title,
        synopsis,
        content,
        userId: req.user.id,
      },
    });
    res.status(201).json(note);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};
//get deleted notes for a user
export const getAllDeletedNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedNotes = await client.note.findMany({
      where: {
        isDeleted: true,
        userId: req.user.id,
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

//get note by ID
export const getSpecificNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;

    const note = await client.note.findFirst({
      where: {
        id: noteId,
        userId: userId,
      },
    });
    console.log(note);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    return res
      .status(200)
      .json({ message: "Note displayed successfully", data: note });
  } catch (e) {
    console.log("Error getting note", e);
    return res.status(500).json({ message: " Internal Server Error " });
  }
};

//update note

type Params = { id: string };

export const updateNote = async (req: Request<Params>, res: Response) => {
  try {
    const { title, synopsis, content } = req.body;
    const noteId = req.params.id;
    const userId = req.user.id;

    const note = await client.note.findUnique({ where: { id: noteId } });

    if (!note || note.isDeleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedNote = await client.note.update({
      where: { id: noteId },
      data: { title, synopsis, content },
    });

    return res
      .status(200)
      .json({ message: "Note updated successfully", updatedNote });
  } catch (e) {
    console.log("Error updating note.", e);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//delete note

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    const user = (req as any).user;

    const note = await client.note.findUnique({ where: { id: noteId } });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.isDeleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId !== user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await client.note.update({
      where: { id: noteId },
      data: { isDeleted: true },
    });

    return res.status(204).json({ message: "Note deleted successfully" });
  } catch (e) {
    console.error(" Error during deletenote operation:", e);
    return res.status(500).json({ message: "Failed to delete note" });
  }
};

//restore deleted note
export const restoreDeletedNote = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const note = await client.note.findUnique({ where: { id: noteId } });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!note.isDeleted) {
      return res.status(400).json({ message: "Note is exists" });
    }

    const restoredNote = await client.note.update({
      where: { id: noteId },
      data: { isDeleted: false },
    });
    res
      .status(200)
      .json({ message: "Note restored successfully.", restoredNote });
  } catch (e) {
    console.log("Error restoring note");
    res.status(500).json({ message: "Internal server error" });
  }
};
