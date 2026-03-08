import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TeddyBot from "../components/TeddyBot";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchStats();
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("https://project-management-app-2-5osh.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(res.data.name);
      setUserEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://project-management-app-2-5osh.onrender.com/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://project-management-app-2-5osh.onrender.com/api/tasks/stats/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://project-management-app-2-5osh.onrender.com/api/projects",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects([...projects, res.data]);
      setTitle("");
      setDescription("");
      setShowModal(false);
      fetchStats();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Enhanced Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo and Brand */}
          <div className="navbar-brand">
            <div className="brand-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">WORKORA</h1>
              <p className="brand-subtitle">Project Management</p>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="navbar-actions">
            <div className="user-info">
              <div className="user-avatar">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="user-details">
                <p className="user-name">{userName || "User"}</p>
                <p className="user-email">{userEmail || "user@example.com"}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">
              Welcome to Task Overview, <span className="highlight">{userName || "User"}</span>!
            </h2>
            <p className="welcome-subtitle">
              Here's what's happening with your projects today
            </p>
          </div>
          <button onClick={() => setShowModal(true)} className="create-project-btn">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Project</span>
          </button>
        </div>

       
        {/* Stats Cards */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card stat-projects">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Total Projects</p>
                  <p className="stat-value">{stats.totalProjects}</p>
                </div>
                <div className="stat-icon-wrapper">
                  <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card stat-tasks">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Total Tasks</p>
                  <p className="stat-value">{stats.totalTasks}</p>
                </div>
                <div className="stat-icon-wrapper">
                  <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card stat-completed">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Completed</p>
                  <p className="stat-value">{stats.completedTasks}</p>
                  <p className="stat-extra">{stats.completionRate}% completion rate</p>
                </div>
                <div className="stat-icon-wrapper">
                  <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card stat-overdue">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">Overdue Tasks</p>
                  <p className="stat-value">{stats.overdueTasks}</p>
                  <p className="stat-extra">{stats.highPriorityTasks} high priority</p>
                </div>
                <div className="stat-icon-wrapper">
                  <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Status Chart */}
        {stats && stats.totalTasks > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-cyan-500/20 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Task Distribution</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">To Do</span>
                  <span className="text-sm font-semibold text-gray-200">{stats.todoTasks}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.todoTasks / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">In Progress</span>
                  <span className="text-sm font-semibold text-gray-200">{stats.inProgressTasks}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/50"
                    style={{ width: `${(stats.inProgressTasks / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">Done</span>
                  <span className="text-sm font-semibold text-gray-200">{stats.completedTasks}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 shadow-lg shadow-green-500/50"
                    style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
  
          {/* Left Section */}
          <div className="relative pl-5">
            {/* Gradient Accent Line */}
            <div className="absolute left-0 top-1 h-10 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>

            <h2 className="text-3xl font-bold text-gray-200">
              Execution Board - My Projects
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Power Your Workflow.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 neon-glow"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Project
          </button>

        </div>
        {/* Projects Grid */}
        {fetchLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full mb-6 border-2 border-indigo-500/30">
              <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-200 mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first project to get started!</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project._id}
                to={`/project/${project._id}`}
                className="group block animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-cyan-500/20 hover:border-cyan-500/50 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2 mb-4 min-h-[3rem]">
                    {project.description || "No description provided"}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{project.members?.length || 1} member{project.members?.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="text-cyan-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-900/95 backdrop-blur-lg border-2 border-cyan-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-200">Create New Project</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Project Title</label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-gray-200 placeholder-gray-500 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                <textarea
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-gray-200 placeholder-gray-500 rounded-xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teddy Bot Assistant */}
      <TeddyBot />
    </div>
  );
}

export default Dashboard;
