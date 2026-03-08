import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const issueTypeConfig = {
  epic: { label: "Epic", icon: "📘", color: "bg-purple-100 text-purple-700 border-purple-300" },
  story: { label: "Story", icon: "📗", color: "bg-green-100 text-green-700 border-green-300" },
  task: { label: "Task", icon: "📙", color: "bg-blue-100 text-blue-700 border-blue-300" },
  bug: { label: "Bug", icon: "🐛", color: "bg-red-100 text-red-700 border-red-300" }
};

const storyPointsOptions = [1, 2, 3, 5, 8, 13, 21];

function Backlog() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [viewMode, setViewMode] = useState("backlog"); // backlog, sprint1, sprint2
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [projectId, viewMode]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://project-management-app-2-5osh.onrender.com/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `https://project-management-app-2-5osh.onrender.com/api/tasks/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (viewMode === "backlog") return !task.sprint;
    return task.sprint === viewMode;
  });

  const toggleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedTasks.length === 0) return;

    try {
      for (const taskId of selectedTasks) {
        if (action === "moveToSprint") {
          await axios.put(
            `https://project-management-app-2-5osh.onrender.com/api/tasks/${taskId}`,
            { sprint: "Sprint 1" },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else if (action === "delete") {
          await axios.delete(`https://project-management-app-2-5osh.onrender.com/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }
      setSelectedTasks([]);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskField = async (taskId, field, value) => {
    try {
      await axios.put(
        `https://project-management-app-2-5osh.onrender.com/api/tasks/${taskId}`,
        { [field]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high": return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">🔴 High</span>;
      case "medium": return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">🟡 Medium</span>;
      case "low": return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">🟢 Low</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen dashboard-container">
      {/* Header */}
      <header className="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-cyan-400 hover:text-cyan-300 transition duration-200 flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Dashboard</span>
              </button>
              <div className="h-6 w-px bg-cyan-500/30"></div>
              <div>
                <h1 className="text-2xl font-bold text-cyan-400">{project?.title || "Project"}</h1>
                <p className="text-sm text-gray-400">Backlog & Sprint Planning</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/project/${projectId}`)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-lg neon-glow"
              >
                📊 Board View
              </button>
            </div>
          </div>

          {/* View Selector */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode("backlog")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "backlog"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg neon-glow"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
              }`}
            >
              📋 Backlog ({tasks.filter(t => !t.sprint).length})
            </button>
            <button
              onClick={() => setViewMode("Sprint 1")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "Sprint 1"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg neon-glow"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
              }`}
            >
              🏃 Sprint 1 ({tasks.filter(t => t.sprint === "Sprint 1").length})
            </button>
            <button
              onClick={() => setViewMode("Sprint 2")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === "Sprint 2"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg neon-glow"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
              }`}
            >
              🏃 Sprint 2 ({tasks.filter(t => t.sprint === "Sprint 2").length})
            </button>
          </div>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="mt-4 p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <span className="text-sm font-medium text-cyan-300">
                ✓ {selectedTasks.length} task(s) selected
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBulkAction("moveToSprint")}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                >
                  Move to Sprint 1
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm rounded-lg hover:from-red-700 hover:to-pink-700 shadow-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedTasks([])}
                  className="px-3 py-1.5 bg-gray-700 text-gray-200 text-sm rounded-lg hover:bg-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Task List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/20">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-800/80 border-b border-cyan-500/20 text-sm font-semibold text-cyan-300">
            <div className="col-span-1">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTasks(filteredTasks.map(t => t._id));
                  } else {
                    setSelectedTasks([]);
                  }
                }}
                checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                className="w-4 h-4 rounded border-cyan-500/50 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div className="col-span-1">Type</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-1">Points</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-1">Status</div>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-gray-800/50">
            {filteredTasks.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-lg text-gray-300 font-medium">No tasks in {viewMode === "backlog" ? "backlog" : viewMode}</p>
                <p className="text-sm mt-2 text-gray-500">Create tasks from the board view or add new ones</p>
                <button
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition shadow-lg"
                >
                  Go to Board
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-800/30 transition items-center"
                >
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task._id)}
                      onChange={() => toggleTaskSelection(task._id)}
                      className="w-4 h-4 rounded border-cyan-500/50 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Issue Type */}
                  <div className="col-span-1">
                    <select
                      value={task.issueType || "task"}
                      onChange={(e) => updateTaskField(task._id, "issueType", e.target.value)}
                      className="text-xs px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
                    >
                      <option value="epic">📘 Epic</option>
                      <option value="story">📗 Story</option>
                      <option value="task">📙 Task</option>
                      <option value="bug">🐛 Bug</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div className="col-span-4">
                    <div className="font-medium text-gray-200">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-500 truncate mt-1">{task.description}</div>
                    )}
                  </div>

                  {/* Priority */}
                  <div className="col-span-2">
                    {getPriorityBadge(task.priority)}
                  </div>

                  {/* Story Points */}
                  <div className="col-span-1">
                    <select
                      value={task.storyPoints || ""}
                      onChange={(e) => updateTaskField(task._id, "storyPoints", e.target.value ? Number(e.target.value) : null)}
                      className="w-full text-sm px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
                    >
                      <option value="">-</option>
                      {storyPointsOptions.map(point => (
                        <option key={point} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assignee */}
                  <div className="col-span-2">
                    {task.assignedTo ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                          {task.assignedTo.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-300">{task.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-600">Unassigned</span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      task.status === "done" ? "bg-green-900/50 text-green-300 border border-green-500/30" :
                      task.status === "in-progress" ? "bg-blue-900/50 text-blue-300 border border-blue-500/30" :
                      "bg-gray-800/50 text-gray-400 border border-gray-700"
                    }`}>
                      {task.status === "in-progress" ? "In Progress" : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Backlog;
