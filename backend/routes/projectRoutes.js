const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createProject, getProjects, getProject, deleteProject } = require("../controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
