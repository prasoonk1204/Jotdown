import express from "express"
import cors from "cors"
import connectDB from "./config/database.js";
import dotenv from "dotenv"
dotenv.config()

const app = express()

import authRouter from "./routes/auth.js"
import notesRouter from "./routes/notes.js"
import todosRouter from "./routes/todo.js";
import authMiddleware from "./middleware/auth.js"

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.use("/auth", authRouter)
app.use("/notes", authMiddleware, notesRouter)
app.use("/todos", authMiddleware, todosRouter)

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(4001, () => {
      console.log("Server is running on port 4001");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

