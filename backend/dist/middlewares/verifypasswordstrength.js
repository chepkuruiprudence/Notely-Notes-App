"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const zxcvbn_1 = __importDefault(require("zxcvbn"));
function verifyPasswordStrength(req, res, next) {
  const { passWord } = req.body;
  if (typeof passWord !== "string") {
    return res.status(400).json({ error: "Password must be a string." });
  }
  const passWordStrength = (0, zxcvbn_1.default)(passWord);
  if (passWordStrength.score < 3) {
    return res.status(400).json({ message: "Password is too weak!" });
  }
  next();
}
exports.default = verifyPasswordStrength;
