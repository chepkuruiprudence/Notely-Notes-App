"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifypasswordstrength_1 = __importDefault(
  require("../middlewares/verifypasswordstrength"),
);
const verifyuserinfo_1 = require("../middlewares/verifyuserinfo");
const user_schema_1 = require("../schemas/user.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const checkUsernameEmailUniqueness_1 = __importDefault(
  require("../middlewares/checkUsernameEmailUniqueness"),
);
const router = (0, express_1.Router)();
router.post(
  "/register",
  (0, verifyuserinfo_1.validateBody)(user_schema_1.verifyuserinfo),
  checkUsernameEmailUniqueness_1.default,
  verifypasswordstrength_1.default,
  auth_controller_1.registerUser,
);
router.post("/login", auth_controller_1.logInUser);
router.post("/logout", auth_controller_1.logOutUser);
exports.default = router;
