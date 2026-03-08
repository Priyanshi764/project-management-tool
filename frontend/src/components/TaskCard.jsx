import { useState } from "react";

const labelColors = {
  red: "bg-red-100 text-red-700 border-red-300",
  orange: "bg-orange-100 text-orange-700 border-orange-300",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
  green: "bg-green-100 text-green-700 border-green-300",
  blue: "bg-blue-100 text-blue-700 border-blue-300",
  purple: "bg-purple-100 text-purple-700 border-purple-300",
  pink: "bg-pink-100 text-pink-700 border-pink-300",
  gray: "bg-gray-100 text-gray-700 border-gray-300",
  brown: "bg-amber-100 text-amber-700 border-amber-300",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-300"
};

const issueTypeConfig = {
  epic: { label: "Epic", icon: "📘", color: "bg-purple-100 text-purple-700 border-purple-300" },
  story: { label: "Story", icon: "📗", color: "bg-green-100 text-green-700 border-green-300" },
  task: { label: "Task", icon: "📙", color: "bg-blue-100 text-blue-700 border-blue-300" },
  bug: { label: "Bug", icon: "🐛", color: "bg-red-100 text-red-700 border-red-300" }
};

function TaskCard({ task, onStatusChange, onDelete, onOpenDetails, isOverdue, getPriorityStyles, getPriorityBadge }) {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const checklistProgress = task.checklist?.length > 0
    ? (task.checklist.filter(item => item.completed).length / task.checklist.length) * 100
    : 0;

  const timeProgress = task.timeTracking?.estimated > 0
    ? Math.min((task.timeTracking.spent / task.timeTracking.estimated) * 100, 100)
    : 0;

  return (
    <div
      className={`${getPriorityStyles(task.priority)} ${
        isOverdue(task.dueDate, task.status) ? "ring-2 ring-red-500 animate-pulse" : ""
      } rounded-xl p-4 transition-all duration-200 hover:shadow-lg card-hover bg-white relative group`}
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Quick Actions */}
      {showQuickActions && (
        <div className="absolute top-2 right-2 flex gap-1 animate-fade-in">
          <button
            onClick={() => onOpenDetails(task)}
            className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            title="Open details"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.labels.map((label, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs font-medium rounded border ${labelColors[label.color] || labelColors.gray}`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Issue Type and Story Points */}
      <div className="flex items-center gap-2 mb-2">
        {task.issueType && (
          <span className={`px-2 py-0.5 text-xs font-medium rounded border ${issueTypeConfig[task.issueType]?.color || issueTypeConfig.task.color}`}>
            {issueTypeConfig[task.issueType]?.icon || "📙"} {issueTypeConfig[task.issueType]?.label || "Task"}
          </span>
        )}
        {task.storyPoints && (
          <span className="px-2 py-0.5 text-xs font-medium rounded border bg-indigo-100 text-indigo-700 border-indigo-300">
            🎯 {task.storyPoints} pts
          </span>
        )}
        {task.sprint && (
          <span className="px-2 py-0.5 text-xs font-medium rounded border bg-blue-100 text-blue-700 border-blue-300">
            🏃 {task.sprint}
          </span>
        )}
      </div>

      {/* Title and Priority */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-800 flex-1 cursor-pointer hover:text-indigo-600" onClick={() => onOpenDetails(task)}>
          {task.title}
        </h4>
        {getPriorityBadge(task.priority)}
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Checklist Progress */}
      {task.checklist && task.checklist.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>{task.checklist.filter(item => item.completed).length}/{task.checklist.length}</span>
            </div>
            <span>{Math.round(checklistProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${checklistProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Time Tracking */}
      {task.timeTracking && task.timeTracking.estimated > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{task.timeTracking.spent || 0}h / {task.timeTracking.estimated}h</span>
            </div>
            <span>{Math.round(timeProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                timeProgress > 100 ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(timeProgress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div className={`flex items-center space-x-1 text-xs mb-2 ${
          isOverdue(task.dueDate, task.status) ? "text-red-600 font-semibold" : "text-gray-500"
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          {isOverdue(task.dueDate, task.status) && <span className="font-bold">⚠️ OVERDUE</span>}
        </div>
      )}

      {/* Assigned User */}
      {task.assignedTo && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {task.assignedTo.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-600">{task.assignedTo.name}</span>
        </div>
      )}

      {/* Status Dropdown */}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none mb-2 bg-white"
      >
        <option value="todo">📋 To Do</option>
        <option value="in-progress">⚡ In Progress</option>
        <option value="done">✅ Done</option>
      </select>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onOpenDetails(task)}
          className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center space-x-1"
        >
          <span>Details</span>
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
