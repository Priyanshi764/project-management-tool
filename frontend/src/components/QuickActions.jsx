import { useState, useEffect } from "react";

function QuickActions({ onAction }) {
  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const actions = [
    {
      id: "create-task",
      name: "Create New Task",
      icon: "➕",
      shortcut: "Ctrl+N",
      color: "from-blue-500 to-cyan-500",
      action: () => onAction("createTask")
    },
    {
      id: "search",
      name: "Search Tasks",
      icon: "🔍",
      shortcut: "Ctrl+K",
      color: "from-purple-500 to-pink-500",
      action: () => onAction("search")
    },
    {
      id: "filters",
      name: "Toggle Filters",
      icon: "🎯",
      shortcut: "Ctrl+F",
      color: "from-green-500 to-teal-500",
      action: () => onAction("toggleFilters")
    },
    {
      id: "activity",
      name: "View Activity",
      icon: "📊",
      shortcut: "Ctrl+A",
      color: "from-orange-500 to-red-500",
      action: () => onAction("viewActivity")
    },
    {
      id: "pomodoro",
      name: "Start Pomodoro",
      icon: "⏱️",
      shortcut: "Ctrl+P",
      color: "from-red-500 to-pink-500",
      action: () => onAction("startPomodoro")
    },
    {
      id: "templates",
      name: "Use Template",
      icon: "📋",
      shortcut: "Ctrl+T",
      color: "from-indigo-500 to-purple-500",
      action: () => onAction("useTemplate")
    },
    {
      id: "dashboard",
      name: "Go to Dashboard",
      icon: "🏠",
      shortcut: "Ctrl+H",
      color: "from-gray-500 to-gray-600",
      action: () => onAction("goDashboard")
    },
    {
      id: "help",
      name: "Show Shortcuts",
      icon: "❓",
      shortcut: "Ctrl+?",
      color: "from-yellow-500 to-orange-500",
      action: () => onAction("showHelp")
    }
  ];

  const filteredActions = searchQuery
    ? actions.filter(action =>
        action.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : actions;

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Space to open quick actions
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        setShowPanel(!showPanel);
        return;
      }

      // Don't handle shortcuts if typing in input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      // Handle individual shortcuts
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "n":
            e.preventDefault();
            onAction("createTask");
            break;
          case "k":
            e.preventDefault();
            setShowPanel(true);
            break;
          case "f":
            e.preventDefault();
            onAction("toggleFilters");
            break;
          case "a":
            e.preventDefault();
            onAction("viewActivity");
            break;
          case "p":
            e.preventDefault();
            onAction("startPomodoro");
            break;
          case "t":
            e.preventDefault();
            onAction("useTemplate");
            break;
          case "h":
            e.preventDefault();
            onAction("goDashboard");
            break;
          case "/":
          case "?":
            e.preventDefault();
            onAction("showHelp");
            break;
        }
      }

      // Escape to close panel
      if (e.key === "Escape" && showPanel) {
        setShowPanel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPanel, onAction]);

  const handleActionClick = (action) => {
    action.action();
    setShowPanel(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Quick Actions Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center justify-center group z-40 hover:scale-110"
        title="Quick Actions (Ctrl+Space)"
      >
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* Quick Actions Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setShowPanel(false)}
          />

          {/* Panel */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 animate-scale-in">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    <span>Quick Actions</span>
                  </h2>
                  <button
                    onClick={() => setShowPanel(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search actions..."
                    autoFocus
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Actions Grid */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                            {action.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono border border-gray-300">
                              {action.shortcut}
                            </kbd>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {filteredActions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-500">No actions found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Space</kbd>
                      <span className="ml-1">to toggle</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300 font-mono">Esc</kbd>
                      <span className="ml-1">to close</span>
                    </span>
                  </div>
                  <span className="text-purple-600 font-semibold">⚡ Power User Mode</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuickActions;
