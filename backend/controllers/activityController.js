const Activity = require("../models/Activity");

// Get Activities for a Project
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      project: req.params.projectId
    })
      .populate("user", "name email")
      .populate("task", "title")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
