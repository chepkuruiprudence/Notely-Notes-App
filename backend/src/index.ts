import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import noteRouter from "./routes/notes.route";
import authenticateToken from "./middlewares/auth.middleware";
import userRouter from "./routes/user.routes";
import aiRouter from "./controllers/ai.controller";
import assemblyRouter from "./routes/trascription.route";


const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello Notely User!`);
});

app.use((req, res, next) => {
  console.log("Request path:", req.path);
  next();
});

app.use(express.json());

app.use(
  cors({
    origin: ["https://notely-notes-app-g9bb.vercel.app"],
    // origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/notes", authenticateToken, noteRouter);
app.use("/api/user", authenticateToken, userRouter);
app.use("/api", aiRouter);
app.use("/api/transcription", assemblyRouter);
app.use("/uploads", express.static("uploads"));


console.log("Router mounted");

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
