import {Router} from "express"
import { createNote, getSpecificNote, getAllDeletedNotes, updateNote, deleteNote, restoreDeletedNote } from "../controllers/notely.controller";
import authenticateToken from "../middlewares/auth.middleware";

const router:Router = Router();

router.post ("/", authenticateToken, createNote);

router.get("/:noteId", authenticateToken, getSpecificNote);

router.get("/trash", authenticateToken, getAllDeletedNotes)

router.patch("/:noteId", authenticateToken, updateNote)

router.delete("/:noteId", authenticateToken, deleteNote)

router.patch("/noteId", authenticateToken, restoreDeletedNote)

export default router;