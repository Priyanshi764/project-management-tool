const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  labels: [{
    name: String,
    color: String
  }],
  background: {
    type: String,
    default: "gradient-1"
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  settings: {
    allowComments: { type: Boolean, default: true },
    allowAttachments: { type: Boolean, default: true },
    defaultView: { type: String, default: "board" } // board, list, calendar
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
