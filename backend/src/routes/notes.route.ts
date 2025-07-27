import { Router } from "express";
import {
  createNote,
  getSpecificNote,
  getAllDeletedNotes,
  updateNote,
  deleteNote,
  restoreDeletedNote,
  getPinnedNotes,
  togglePinNote,
  getAllNotes,
} from "../controllers/notely.controller";
import authenticateToken from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/", authenticateToken, createNote);

router.get("/:noteId", authenticateToken, getSpecificNote);

router.get("/trash", authenticateToken, getAllDeletedNotes);

router.patch("/:noteId", authenticateToken, updateNote);

router.delete("/:noteId", authenticateToken, deleteNote);

router.patch("/:noteId/restore", authenticateToken, restoreDeletedNote);

router.patch("/:id/pin-toggle", authenticateToken, togglePinNote);

router.get("/pinned", authenticateToken, getPinnedNotes);

router.get("/notes", getAllNotes);

export default router;
