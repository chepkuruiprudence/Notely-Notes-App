import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.route";
import noteRouter from "./routes/notes.route";
import authenticateToken from "./middlewares/auth.middleware";
import userRouter from "./routes/user.routes"

const PORT= 5000;
const app = express();

app.get ("/", (req, res) => {
 res.send(`Hello Notely User!`)
})

app.use(express.json());

app.use(cors({
 origin: [
  "http://localhost:5173/"
 ]
}))

app.use("/api/auth", authRouter);
app.use("/api/notes", authenticateToken, noteRouter)
app.use("/api/user", authenticateToken, userRouter)

app.listen(PORT, () => {
 console.log(`Server is running on port:${PORT}` )
})