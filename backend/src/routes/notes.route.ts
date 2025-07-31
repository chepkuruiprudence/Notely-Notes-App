import { Router } from "express";
import {
  createNote,
  getSpecificNote,
  updateNote,
  deleteNote,
  restoreDeletedNote,
  toggleNotePin,
  getAllNotes,
} from "../controllers/notely.controller";
import authenticateToken from "../middlewares/auth.middleware";
import validatenote from "../middlewares/validatenote";

const router: Router = Router();

router.post("/", authenticateToken, createNote);

router.get("/:noteId", authenticateToken, getSpecificNote);

router.patch("/:noteId", authenticateToken, updateNote);

router.delete("/:noteId", authenticateToken, deleteNote);

router.patch("/:noteId/restore", authenticateToken, restoreDeletedNote);

router.patch("/:id/pin-toggle", authenticateToken, toggleNotePin);

router.get("/", getAllNotes);

export default router;
