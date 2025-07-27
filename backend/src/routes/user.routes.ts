import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import {
  getUserProfile,
  updateUserPassword,
  updateUserProfile,
  getAllUserNotes,
} from "../controllers/user.controller";

const router: Router = Router();

router.get("/", authenticateToken, getUserProfile);

router.patch("/notes", authenticateToken, updateUserProfile);

router.post("/password", authenticateToken, updateUserPassword);

router.get("/notes", authenticateToken, getAllUserNotes);


export default router;
