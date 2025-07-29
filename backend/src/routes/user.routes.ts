import { Router } from "express";
import authenticateToken from "../middlewares/auth.middleware";
import {
  getUserProfile,
  updateUserPassword,
  updateUserProfile,
  getAllUserNotes,
  getPinnedNotes,
  getAllDeletedNotes,
} from "../controllers/user.controller";
import upload from "../middlewares/upload";

const router: Router = Router();

router.get("/", authenticateToken, getUserProfile);

router.patch(
  "/user/:id",
  authenticateToken,
  upload.single("profileImage"),
  updateUserProfile
);


// router.patch("/user/:id", authenticateToken, updateUserProfile);

router.patch("/password", authenticateToken, updateUserPassword);

router.get("/notes", authenticateToken, getAllUserNotes);

router.get("/pinned", authenticateToken, getPinnedNotes);

router.get("/trash", authenticateToken, getAllDeletedNotes);

export default router;
