const Comment = require("../models/Comment");
const Activity = require("../models/Activity");
const Task = require("../models/Task");

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text, taskId } = req.body;

    const comment = await Comment.create({
      text,
      task: taskId,
      user: req.user.id,
    });

    const populatedComment = await Comment.findById(comment._id).populate("user", "name email");
    
    // Create activity log
    const task = await Task.findById(taskId);
    await Activity.create({
      user: req.user.id,
      project: task.project,
      task: taskId,
      action: "commented",
      description: `commented on task "${task.title}"`
    });

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Comments by Task
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      task: req.params.taskId,
    }).populate("user", "name");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
