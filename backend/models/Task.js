const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  issueType: {
    type: String,
    enum: ["epic", "story", "task", "bug"],
    default: "task"
  },
  status: {
    type: String,
    default: "todo" // todo, in-progress, done
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  storyPoints: {
    type: Number,
    enum: [1, 2, 3, 5, 8, 13, 21],
    default: null
  },
  sprint: {
    type: String,
    default: null // null = backlog, "Sprint 1", "Sprint 2", etc.
  },
  watchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dueDate: {
    type: Date
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  attachments: [{
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  labels: [{
    name: String,
    color: String
  }],
  checklist: [{
    text: String,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  timeTracking: {
    estimated: Number, // in hours
    spent: Number, // in hours
    logs: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      hours: Number,
      date: { type: Date, default: Date.now },
      description: String
    }]
  },
  position: {
    type: Number,
    default: 0
  },
  coverImage: String,
  isArchived: {
    type: Boolean,
    default: false
  },
  // UNIQUE FEATURES
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }],
  blockedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }],
  pomodoroSessions: [{
    startTime: Date,
    endTime: Date,
    duration: Number, // in minutes
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }],
  mood: {
    type: String,
    enum: ["excited", "confident", "neutral", "concerned", "blocked"],
    default: "neutral"
  },
  moodHistory: [{
    mood: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  estimatedComplexity: {
    type: String,
    enum: ["trivial", "easy", "medium", "hard", "expert"],
    default: "medium"
  },
  actualComplexity: {
    type: String,
    enum: ["trivial", "easy", "medium", "hard", "expert"]
  },
  tags: [String],
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateName: String,
  templateCategory: String
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
