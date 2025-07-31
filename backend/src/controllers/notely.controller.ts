import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await client.note.findMany({
      where: { isDeleted: false, isPublic: true },
      orderBy: {
        dateCreated: "desc",
      },
    });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Fetch notes error:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

//create note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, isPublic } = req.body;

    if (!title || !synopsis || !content || typeof isPublic !== "boolean") {
      return res.status(400).json({ message: "Missing required body field." });
    }

    const note = await client.note.create({
      data: {
        title,
        synopsis,
        content,
        userId: req.user.id,
        isPublic,
      },
    });
    res.status(201).json(note);
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

//get note by ID
export const getSpecificNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
     const userId = req.user?.id; 

    const note = await client.note.findFirst({
      where: {
        id: noteId,
        OR: [
          { userId: userId },
          { isPublic: true, isDeleted: false }, 
        ],
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

type Params = { noteId: string };

export const updateNote = async (req: Request<Params>, res: Response) => {
  try {
    const { title, synopsis, content, isPinned, isPublic } = req.body;
    const noteId = req.params.noteId;

    if (!noteId) {
      return res.status(400).json({ message: "Note ID is required" });
    }
    const userId = req.user.id;

    const note = await client.note.findUnique({ where: { id: noteId } });

    if (!note || note.isDeleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    console.log("Updating note with:", {
      title,
      synopsis,
      content,
      isPinned,
      isPublic,
    });

    const updatedNote = await client.note.update({
      where: { id: noteId },
      data: { title, synopsis, content },
    });

    return res
      .status(200)
      .json({ message: "Note updated successfully", updatedNote });
  } catch (e: any) {
    console.log("Error updating note.", e.message, e.stack);
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

    return res.status(200).json({ message: "Note deleted successfully", note });
  } catch (e) {
    console.error(" Error during deletenote operation:", e);
    return res.status(500).json({ message: "Failed to delete note" });
  }
};

//restore deleted note
export const restoreDeletedNote = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.noteId;

    console.log("Restoring note:", { noteId, userId });

    const note = await client.note.findUnique({ where: { id: noteId } });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!note.isDeleted) {
      return res.status(400).json({ message: "Note is already active" });
    }

    const restoredNote = await client.note.update({
      where: { id: noteId },
      data: { isDeleted: false },
    });
    res
      .status(200)
      .json({ message: "Note restored successfully.", restoredNote });
  } catch (e) {
    console.error("Error restoring note:", e instanceof Error ? e.message : e);

    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /notes/:id/pin-toggle
export const toggleNotePin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await client.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== userId) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    const updatedNote = await client.note.update({
      where: { id },
      data: { isPinned: !note.isPinned },
    });

    res.status(200).json(updatedNote);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to toggle pin status" });
  }
};
