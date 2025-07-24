"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const PORT = 5000;
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get("/", (req, res) => {
  res.send(`Hello Notely User!`);
});
app.use(express_1.default.json());
app.use(
  (0, cors_1.default)({
    origin: ["http://localhost:5173/"],
  }),
);
app.listen(PORT, () => {
  console.log(`Server is running on port: $PORT`);
});
