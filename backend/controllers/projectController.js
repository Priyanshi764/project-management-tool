const Project = require("../models/Project");
const Activity = require("../models/Activity");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    // Create activity log
    await Activity.create({
      user: req.user.id,
      project: project._id,
      action: "created",
      description: `created project "${title}"`
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Projects of Logged-in User
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("createdBy", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
