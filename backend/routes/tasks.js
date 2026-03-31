const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = express.Router();

// Create
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.user.id
  });

  await task.save();
  res.status(201).json(task);
});

// Get all
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(task);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;