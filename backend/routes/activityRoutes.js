const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getActivities } = require("../controllers/activityController");

router.get("/:projectId", auth, getActivities);

module.exports = router;
