import { Router} from "express";
import authenticateToken from "../middlewares/auth.middleware";
import { getUserProfile, updateUserPassword, updateUserProfile, getAllNotes } from "../controllers/user.controller";

const router: Router = Router();

router.get("/", authenticateToken, getUserProfile)

router.patch("/notes", authenticateToken, updateUserProfile)

router.post("/password", authenticateToken, updateUserPassword)

router.get ("/", authenticateToken, getAllNotes)

export default router;