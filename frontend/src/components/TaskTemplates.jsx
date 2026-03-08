import { useState } from "react";

function TaskTemplates({ onSelectTemplate, onSaveAsTemplate, currentTask }) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("general");

  // Predefined templates
  const predefinedTemplates = [
    {
      name: "Bug Fix",
      category: "development",
      icon: "🐛",
      color: "red",
      template: {
        priority: "high",
        labels: [{ name: "Bug", color: "red" }],
        checklist: [
          { text: "Reproduce the bug", completed: false },
          { text: "Identify root cause", completed: false },
          { text: "Write fix", completed: false },
          { text: "Test fix", completed: false },
          { text: "Update documentation", completed: false }
        ],
        estimatedComplexity: "medium"
      }
    },
    {
      name: "New Feature",
      category: "development",
      icon: "✨",
      color: "blue",
      template: {
        priority: "medium",
        labels: [{ name: "Feature", color: "blue" }],
        checklist: [
          { text: "Design feature", completed: false },
          { text: "Get approval", completed: false },
          { text: "Implement feature", completed: false },
          { text: "Write tests", completed: false },
          { text: "Code review", completed: false },
          { text: "Deploy", completed: false }
        ],
        estimatedComplexity: "hard"
      }
    },
    {
      name: "Code Review",
      category: "development",
      icon: "👀",
      color: "purple",
      template: {
        priority: "medium",
        labels: [{ name: "Review", color: "purple" }],
        checklist: [
          { text: "Check code quality", completed: false },
          { text: "Test functionality", completed: false },
          { text: "Review tests", completed: false },
          { text: "Check documentation", completed: false },
          { text: "Approve or request changes", completed: false }
        ],
        estimatedComplexity: "easy"
      }
    },
    {
      name: "Documentation",
      category: "documentation",
      icon: "📚",
      color: "green",
      template: {
        priority: "low",
        labels: [{ name: "Documentation", color: "purple" }],
        checklist: [
          { text: "Research topic", completed: false },
          { text: "Write draft", completed: false },
          { text: "Add examples", completed: false },
          { text: "Review and edit", completed: false },
          { text: "Publish", completed: false }
        ],
        estimatedComplexity: "easy"
      }
    },
    {
      name: "Design Task",
      category: "design",
      icon: "🎨",
      color: "pink",
      template: {
        priority: "medium",
        labels: [{ name: "Design", color: "pink" }],
        checklist: [
          { text: "Gather requirements", completed: false },
          { text: "Create mockups", completed: false },
          { text: "Get feedback", completed: false },
          { text: "Refine design", completed: false },
          { text: "Create final assets", completed: false }
        ],
        estimatedComplexity: "medium"
      }
    },
    {
      name: "Meeting Prep",
      category: "general",
      icon: "📅",
      color: "cyan",
      template: {
        priority: "medium",
        labels: [{ name: "Meeting", color: "cyan" }],
        checklist: [
          { text: "Set agenda", completed: false },
          { text: "Invite participants", completed: false },
          { text: "Prepare materials", completed: false },
          { text: "Send reminders", completed: false },
          { text: "Take notes during meeting", completed: false },
          { text: "Send follow-up", completed: false }
        ],
        estimatedComplexity: "trivial"
      }
    }
  ];

  const categories = {
    all: { name: "All Templates", icon: "📋" },
    development: { name: "Development", icon: "💻" },
    design: { name: "Design", icon: "🎨" },
    documentation: { name: "Documentation", icon: "📚" },
    general: { name: "General", icon: "⭐" }
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = selectedCategory === "all"
    ? predefinedTemplates
    : predefinedTemplates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template.template);
    setShowTemplates(false);
  };

  const handleSaveAsTemplate = () => {
    if (!templateName.trim()) return;
    
    const template = {
      name: templateName,
      category: templateCategory,
      template: currentTask,
      isCustom: true
    };

    // In a real app, save to backend
    console.log("Saving template:", template);
    
    setShowSaveDialog(false);
    setTemplateName("");
  };

  return (
    <div className="relative">
      {/* Template Button */}
      <button
        onClick={() => setShowTemplates(!showTemplates)}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-200 flex items-center space-x-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <span>Templates</span>
      </button>

      {/* Templates Panel */}
      {showTemplates && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50 animate-slide-up max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <span>Task Templates</span>
              </h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === key
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Templates List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleSelectTemplate(template)}
                className="w-full text-left p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                      {template.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded bg-${template.color}-100 text-${template.color}-700`}>
                        {template.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {template.template.checklist.length} steps
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      {template.template.checklist.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-gray-400">✓</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                      {template.template.checklist.length > 3 && (
                        <div className="text-gray-400 italic">
                          +{template.template.checklist.length - 3} more...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setShowTemplates(false);
                setShowSaveDialog(true);
              }}
              className="w-full px-4 py-2 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-400 hover:text-purple-600 transition-all duration-200 font-semibold text-sm"
            >
              💾 Save Current Task as Template
            </button>
          </div>
        </div>
      )}

      {/* Save Template Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Save as Template</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Sprint Planning"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={templateCategory}
                  onChange={(e) => setTemplateCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 outline-none"
                >
                  <option value="general">⭐ General</option>
                  <option value="development">💻 Development</option>
                  <option value="design">🎨 Design</option>
                  <option value="documentation">📚 Documentation</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAsTemplate}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTemplates;
