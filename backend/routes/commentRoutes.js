const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addComment,
  getComments,
} = require("../controllers/commentController");

router.post("/", auth, addComment);
router.get("/:taskId", auth, getComments);
router.delete("/:id", auth, async (req, res) => {
  try {
    const Comment = require("../models/Comment");
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
