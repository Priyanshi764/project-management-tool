const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  action: {
    type: String,
    required: true // "created", "updated", "deleted", "moved", "commented", "assigned"
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
