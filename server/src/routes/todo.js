import express from "express";
import Todo from "../models/todo.js";

const todosRouter = express.Router();

// Create a new todo
todosRouter.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const author = req.user._id;
    const todo = new Todo({ task, author });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all todos
todosRouter.get("/", async (req, res) => {
  try {
    const { sort = "createdAt", order = "desc" } = req.query;
    const author = req.user._id;
    const todos = await Todo.find({ author }).sort({
      [sort]: order === "desc" ? -1 : 1,
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a todo
todosRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user._id;
    const updates = req.body;

    const todo = await Todo.findOneAndUpdate({ _id: id, author }, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo)
      return res.status(404).json({ error: "Todo not found or unauthorized" });

    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo
todosRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      author: userId,
    });

    if (!deletedTodo)
      return res.status(404).json({ error: "Todo not found or unauthorized" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default todosRouter;
