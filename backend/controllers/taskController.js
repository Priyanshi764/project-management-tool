const Task = require("../models/Task");
const Activity = require("../models/Activity");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority, dueDate, labels, checklist } = req.body;

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      priority: priority || "medium",
      dueDate,
      labels: labels || [],
      checklist: checklist || []
    });

    // Create activity log
    await Activity.create({
      user: req.user.id,
      project: projectId,
      task: task._id,
      action: "created",
      description: `created task "${title}"`
    });

    const populatedTask = await Task.findById(task._id).populate("assignedTo", "name email");
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tasks by Project
exports.getTasks = async (req, res) => {
  try {
    const { search, priority, assignedTo, labels, archived } = req.query;
    
    const filter = {
      project: req.params.projectId,
      isArchived: archived === "true" ? true : false
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (priority) {
      filter.priority = priority;
    }

    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    if (labels) {
      filter["labels.name"] = { $in: labels.split(",") };
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort({ position: 1, createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status, priority, dueDate, labels, position } = req.body;
    const oldTask = await Task.findById(req.params.id);

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (labels) updateData.labels = labels;
    if (position !== undefined) updateData.position = position;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("assignedTo", "name email");

    // Create activity log for status change
    if (status && oldTask.status !== status) {
      await Activity.create({
        user: req.user.id,
        project: task.project,
        task: task._id,
        action: "moved",
        description: `moved task "${task.title}" from ${oldTask.status} to ${status}`
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Checklist
exports.updateChecklist = async (req, res) => {
  try {
    const { checklist } = req.body;
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { checklist },
      { new: true }
    ).populate("assignedTo", "name email");

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Time Log
exports.addTimeLog = async (req, res) => {
  try {
    const { hours, description } = req.body;
    
    const task = await Task.findById(req.params.id);
    
    if (!task.timeTracking) {
      task.timeTracking = { estimated: 0, spent: 0, logs: [] };
    }

    task.timeTracking.logs.push({
      user: req.user.id,
      hours,
      description,
      date: new Date()
    });

    task.timeTracking.spent = (task.timeTracking.spent || 0) + hours;

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("timeTracking.logs.user", "name email");

    res.json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Archive Task
exports.archiveTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true }
    );

    await Activity.create({
      user: req.user.id,
      project: task.project,
      task: task._id,
      action: "archived",
      description: `archived task "${task.title}"`
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Duplicate Task
exports.duplicateTask = async (req, res) => {
  try {
    const originalTask = await Task.findById(req.params.id);
    
    const newTask = await Task.create({
      title: `${originalTask.title} (Copy)`,
      description: originalTask.description,
      project: originalTask.project,
      priority: originalTask.priority,
      labels: originalTask.labels,
      checklist: originalTask.checklist.map(item => ({ ...item, completed: false }))
    });

    const populatedTask = await Task.findById(newTask._id).populate("assignedTo", "name email");
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign user to task
exports.assignTask = async (req, res) => {
  try {
    const { userId } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true }
    ).populate("assignedTo", "name email");

    // Create activity log
    await Activity.create({
      user: req.user.id,
      project: task.project,
      task: task._id,
      action: "assigned",
      description: `assigned task "${task.title}" to a team member`
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const Project = require("../models/Project");
    
    // Get all projects user is part of
    const projects = await Project.find({ members: req.user.id });
    const projectIds = projects.map(p => p._id);

    // Get all tasks for these projects
    const tasks = await Task.find({ project: { $in: projectIds } });

    const stats = {
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === "done").length,
      inProgressTasks: tasks.filter(t => t.status === "in-progress").length,
      todoTasks: tasks.filter(t => t.status === "todo").length,
      highPriorityTasks: tasks.filter(t => t.priority === "high").length,
      overdueTasks: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done").length,
      completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === "done").length / tasks.length) * 100) : 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
