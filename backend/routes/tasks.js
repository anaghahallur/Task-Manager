const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.json(task);
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;