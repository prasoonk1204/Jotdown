import express from "express";
import Note from "../models/note.js";

const notesRouter = express.Router();

notesRouter.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id;

    const note = new Note({ title, content, author });

    await note.save();

    res.status(201).json({ message: "Note created", note });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


notesRouter.get("/", async (req, res) => {
  try {
    const author = req.user._id;
    const notes = await Note.find({ author });

    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


notesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user._id;

    const note = await Note.findOne({ _id: id, author });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


notesRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user._id;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, author },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note updated", note });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


notesRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const author = req.user._id;

    const note = await Note.findOneAndDelete({ _id: id, author });

    if (!note) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default notesRouter;
