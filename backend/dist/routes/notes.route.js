"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notely_controller_1 = require("../controllers/notely.controller");
const auth_middleware_1 = __importDefault(
  require("../middlewares/auth.middleware"),
);
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, notely_controller_1.createNote);
router.get(
  "/:noteId",
  auth_middleware_1.default,
  notely_controller_1.getSpecificNote,
);
router.patch(
  "/:noteId",
  auth_middleware_1.default,
  notely_controller_1.updateNote,
);
router.delete(
  "/:noteId",
  auth_middleware_1.default,
  notely_controller_1.deleteNote,
);
router.patch(
  "/:noteId/restore",
  auth_middleware_1.default,
  notely_controller_1.restoreDeletedNote,
);
router.patch(
  "/:id/pin-toggle",
  auth_middleware_1.default,
  notely_controller_1.toggleNotePin,
);
router.get("/", auth_middleware_1.default, notely_controller_1.getAllNotes);
exports.default = router;
