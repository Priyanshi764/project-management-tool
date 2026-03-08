import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import PomodoroTimer from "../components/PomodoroTimer";
import TaskTemplates from "../components/TaskTemplates";
import MoodTracker from "../components/MoodTracker";
import QuickActions from "../components/QuickActions";
import TeddyBot from "../components/TeddyBot";

const labelColors = {
  red: "bg-red-500", orange: "bg-orange-500", yellow: "bg-yellow-500",
  green: "bg-green-500", blue: "bg-blue-500", purple: "bg-purple-500",
  pink: "bg-pink-500", gray: "bg-gray-500", brown: "bg-amber-600", cyan: "bg-cyan-500"
};

const issueTypeConfig = {
  epic: { label: "Epic", icon: "📘", color: "bg-purple-100 text-purple-700" },
  story: { label: "Story", icon: "📗", color: "bg-green-100 text-green-700" },
  task: { label: "Task", icon: "📙", color: "bg-blue-100 text-blue-700" },
  bug: { label: "Bug", icon: "🐛", color: "bg-red-100 text-red-700" }
};

const storyPointsOptions = [1, 2, 3, 5, 8, 13, 21];

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [issueType, setIssueType] = useState("task");
  const [storyPoints, setStoryPoints] = useState(null);
  const [sprint, setSprint] = useState(null);
  
  // UI states
  const [showModal, setShowModal] = useState(false);
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [currentTaskMood, setCurrentTaskMood] = useState("neutral");
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterLabels, setFilterLabels] = useState([]);
  const [filterAssignee, setFilterAssignee] = useState("");

  // Available labels
  const availableLabels = [
    { name: "Bug", color: "red" },
    { name: "Feature", color: "blue" },
    { name: "Enhancement", color: "green" },
    { name: "Documentation", color: "purple" },
    { name: "Design", color: "pink" },
    { name: "Backend", color: "brown" },
    { name: "Frontend", color: "cyan" },
    { name: "Urgent", color: "orange" },
    { name: "Low Priority", color: "gray" }
  ];

  useEffect(() => {
    fetchProject();
    fetchTasks();
    fetchActivities();
  }, [projectId, token]);

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, filterPriority, filterLabels, filterAssignee]);

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
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filterPriority) params.append('priority', filterPriority);
      if (filterLabels.length > 0) params.append('labels', filterLabels.join(','));
      if (filterAssignee) params.append('assignedTo', filterAssignee);

      const res = await axios.get(
        `https://project-management-app-2-5osh.onrender.com/api/tasks/${projectId}?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `https://project-management-app-2-5osh.onrender.com/api/activities/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "https://project-management-app-2-5osh.onrender.com/api/tasks",
        { 
          title, 
          description, 
          projectId, 
          priority, 
          dueDate: dueDate || null, 
          assignedTo: assignedTo || null,
          labels: selectedLabels,
          checklist: checklist,
          issueType: issueType,
          storyPoints: storyPoints,
          sprint: sprint
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks([...tasks, res.data]);
      resetForm();
      setShowModal(false);
      fetchActivities();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setAssignedTo("");
    setSelectedLabels([]);
    setChecklist([]);
    setNewChecklistItem("");
    setIssueType("task");
    setStoryPoints(null);
    setSprint(null);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.put(
        `https://project-management-app-2-5osh.onrender.com/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
      fetchActivities();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`https://project-management-app-2-5osh.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== taskId));
      fetchActivities();
    } catch (error) {
      console.log(error);
    }
  };



  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([...checklist, { text: newChecklistItem, completed: false }]);
      setNewChecklistItem("");
    }
  };

  const removeChecklistItem = (index) => {
    setChecklist(checklist.filter((_, i) => i !== index));
  };

  const toggleLabel = (label) => {
    const exists = selectedLabels.find(l => l.name === label.name);
    if (exists) {
      setSelectedLabels(selectedLabels.filter(l => l.name !== label.name));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  // NEW UNIQUE FEATURE HANDLERS
  const handlePomodoroComplete = async (session) => {
    console.log("Pomodoro session completed:", session);
    // In real app, save to backend
  };

  const handleTemplateSelect = (template) => {
    setPriority(template.priority || "medium");
    setSelectedLabels(template.labels || []);
    setChecklist(template.checklist || []);
    // Open modal with pre-filled data
    setShowModal(true);
  };

  const handleMoodChange = async (moodData) => {
    setCurrentTaskMood(moodData.mood);
    console.log("Mood updated:", moodData);
    // In real app, save to backend
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "createTask":
        setShowModal(true);
        break;
      case "search":
        setShowFilters(true);
        break;
      case "toggleFilters":
        setShowFilters(!showFilters);
        break;
      case "viewActivity":
        setShowActivityPanel(!showActivityPanel);
        break;
      case "startPomodoro":
        setShowPomodoro(!showPomodoro);
        break;
      case "useTemplate":
        // Template button is in header, just focus on it
        break;
      case "goDashboard":
        navigate("/dashboard");
        break;
      case "showHelp":
        alert("Keyboard Shortcuts:\n\nCtrl+N - Create Task\nCtrl+K - Search\nCtrl+F - Toggle Filters\nCtrl+A - View Activity\nCtrl+P - Pomodoro Timer\nCtrl+T - Use Template\nCtrl+H - Dashboard\nCtrl+Space - Quick Actions");
        break;
      default:
        break;
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high": return "border-l-4 border-red-500 bg-red-50";
      case "medium": return "border-l-4 border-yellow-500 bg-yellow-50";
      case "low": return "border-l-4 border-green-500 bg-green-50";
      default: return "border-l-4 border-gray-300 bg-white";
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

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === "done") return false;
    return new Date(dueDate) < new Date();
  };

  const statusConfig = {
    todo: { label: "To Do", color: "bg-gray-50 border-gray-200", icon: "📋" },
    "in-progress": { label: "In Progress", color: "bg-blue-50 border-blue-200", icon: "⚡" },
    done: { label: "Done", color: "bg-green-50 border-green-200", icon: "✅" },
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case "created": return "➕";
      case "moved": return "🔄";
      case "commented": return "💬";
      case "assigned": return "👤";
      case "deleted": return "🗑️";
      default: return "📌";
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 hover:text-gray-900 transition duration-200 flex items-center space-x-2 group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project?.title || "Kanban Board"}</h1>
                <p className="text-sm text-gray-500">{project?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Backlog View Button */}
              <button
                onClick={() => navigate(`/project/${projectId}/backlog`)}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span className="text-lg">📋</span>
                <span>Backlog</span>
              </button>

              {/* Mood Tracker */}
              <MoodTracker
                currentMood={currentTaskMood}
                onMoodChange={handleMoodChange}
              />
              
              {/* Pomodoro Timer Button */}
              <button
                onClick={() => setShowPomodoro(!showPomodoro)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span className="text-lg">⏱️</span>
                <span>Pomodoro</span>
              </button>

              {/* Task Templates */}
              <TaskTemplates
                onSelectTemplate={handleTemplateSelect}
                onSaveAsTemplate={() => {}}
                currentTask={{}}
              />

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>
              <button
                onClick={() => setShowActivityPanel(!showActivityPanel)}
                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Activity</span>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-200 flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">All Priorities</option>
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <select
                    value={filterAssignee}
                    onChange={(e) => setFilterAssignee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">All Assignees</option>
                    {project?.members?.map((member) => (
                      <option key={member._id} value={member._id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterPriority("");
                      setFilterLabels([]);
                      setFilterAssignee("");
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Kanban Board */}
        <main className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${showActivityPanel ? 'mr-96' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["todo", "in-progress", "done"].map((status) => (
              <div key={status} className={`${statusConfig[status].color} rounded-2xl shadow-md p-4 border-2`}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <span className="text-2xl">{statusConfig[status].icon}</span>
                    <span>{statusConfig[status].label}</span>
                  </h3>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                    {tasks.filter((task) => task.status === status).length}
                  </span>
                </div>

                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                        onOpenDetails={() => {}}
                        isOverdue={isOverdue}
                        getPriorityStyles={getPriorityStyles}
                        getPriorityBadge={getPriorityBadge}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Activity Panel */}
        {showActivityPanel && (
          <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto animate-slide-up z-30">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Activity Feed</span>
                </h2>
                <button
                  onClick={() => setShowActivityPanel(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {activities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No activity yet</p>
                ) : (
                  activities.map((activity, index) => (
                    <div key={activity._id} className="flex space-x-3 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {activity.user?.name?.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold text-gray-800">{activity.user?.name}</span>
                              <span className="text-gray-600"> {activity.description}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <span className="text-lg">{getActivityIcon(activity.action)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        )}
      </div>


      {/* Create Task Modal with New Features */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Type 📝</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  >
                    <option value="epic">📘 Epic</option>
                    <option value="story">📗 Story</option>
                    <option value="task">📙 Task</option>
                    <option value="bug">🐛 Bug</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Story Points 🎯</label>
                  <select
                    value={storyPoints || ""}
                    onChange={(e) => setStoryPoints(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  >
                    <option value="">None</option>
                    {storyPointsOptions.map(point => (
                      <option key={point} value={point}>{point}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sprint 🏃</label>
                  <select
                    value={sprint || ""}
                    onChange={(e) => setSprint(e.target.value || null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  >
                    <option value="">Backlog</option>
                    <option value="Sprint 1">Sprint 1</option>
                    <option value="Sprint 2">Sprint 2</option>
                  </select>
                </div>
              </div>

              {project?.members && project.members.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Assign To</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none"
                  >
                    <option value="">Unassigned</option>
                    {project.members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} ({member.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Labels Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Labels 🏷️</label>
                <div className="flex flex-wrap gap-2">
                  {availableLabels.map((label) => {
                    const isSelected = selectedLabels.find(l => l.name === label.name);
                    return (
                      <button
                        key={label.name}
                        type="button"
                        onClick={() => toggleLabel(label)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? `${labelColors[label.color]} text-white shadow-md scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {label.name}
                      </button>
                    );
                  })}
                </div>
                {selectedLabels.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {selectedLabels.map(l => l.name).join(', ')}
                  </div>
                )}
              </div>

              {/* Checklist Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Checklist ✅</label>
                <div className="space-y-2">
                  {checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => {
                          const updated = [...checklist];
                          updated[index].completed = e.target.checked;
                          setChecklist(updated);
                        }}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeChecklistItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add checklist item..."
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={addChecklistItem}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pomodoro Timer Panel */}
      {showPomodoro && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative animate-scale-in">
            <button
              onClick={() => setShowPomodoro(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <PomodoroTimer
              taskId={null}
              onSessionComplete={handlePomodoroComplete}
            />
          </div>
        </div>
      )}

      {/* Quick Actions Component */}
      <QuickActions onAction={handleQuickAction} />

      {/* Teddy Bot Assistant */}
      <TeddyBot />
    </div>
  );
}

export default ProjectDetail;
