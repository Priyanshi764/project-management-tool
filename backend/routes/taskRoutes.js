const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { 
  createTask, 
  getTasks, 
  updateTaskStatus, 
  assignTask, 
  getDashboardStats,
  updateChecklist,
  addTimeLog,
  archiveTask,
  duplicateTask
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/stats/dashboard", auth, getDashboardStats);
router.get("/:projectId", auth, getTasks);
router.put("/:id", auth, updateTaskStatus);
router.put("/:id/checklist", auth, updateChecklist);
router.put("/:id/time", auth, addTimeLog);
router.put("/:id/archive", auth, archiveTask);
router.post("/:id/duplicate", auth, duplicateTask);
router.put("/assign/:id", auth, assignTask);
router.delete("/:id", auth, async (req, res) => {
  try {
    const Task = require("../models/Task");
    const Activity = require("../models/Activity");
    const task = await Task.findById(req.params.id);
    
    await Activity.create({
      user: req.user.id,
      project: task.project,
      action: "deleted",
      description: `deleted task "${task.title}"`
    });
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
