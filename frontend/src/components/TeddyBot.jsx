import { useState, useEffect, useRef } from "react";

function TeddyBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm Teddy, your friendly assistant! 🧸 How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Teddy's responses based on keywords
  const getTeddyResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (msg.match(/^(hi|hello|hey|hola|greetings)/)) {
      return "Hello there! 👋 I'm so happy to see you! How can I help you today?";
    }

    // Help requests
    if (msg.includes("help")) {
      return "I'm here to help! 🤗 You can ask me about:\n\n• Creating tasks\n• Using templates\n• Keyboard shortcuts\n• Pomodoro timer\n• Filters and search\n• Activity tracking\n\nWhat would you like to know?";
    }

    // Task creation
    if (msg.includes("create") || msg.includes("new task")) {
      return "To create a new task, you can:\n\n1. Click the '➕ Add Task' button in the header\n2. Or press Ctrl+N (keyboard shortcut)\n3. Or use a template by clicking '📋 Templates'\n\nWould you like me to explain templates? 🎯";
    }

    // Templates
    if (msg.includes("template")) {
      return "Templates are awesome! 📋 They save you time by pre-filling tasks with:\n\n• Checklists\n• Labels\n• Priority levels\n\nClick the '📋 Templates' button and choose from:\n🐛 Bug Fix\n✨ New Feature\n👀 Code Review\n📚 Documentation\n🎨 Design Task\n📅 Meeting Prep\n\nTry one now! 🚀";
    }

    // Pomodoro
    if (msg.includes("pomodoro") || msg.includes("timer") || msg.includes("focus")) {
      return "The Pomodoro Timer helps you focus! ⏱️\n\n1. Click the '⏱️ Pomodoro' button\n2. Choose Focus (25 min) or Break (5 min)\n3. Click Start and work without distractions!\n\nAfter 4 focus sessions, take a long break. You've got this! 💪";
    }

    // Shortcuts
    if (msg.includes("shortcut") || msg.includes("keyboard")) {
      return "Here are the keyboard shortcuts! ⚡\n\n• Ctrl+N - Create task\n• Ctrl+K - Search\n• Ctrl+F - Toggle filters\n• Ctrl+A - View activity\n• Ctrl+P - Pomodoro timer\n• Ctrl+T - Templates\n• Ctrl+Space - Quick actions\n\nYou're becoming a power user! 🎮";
    }

    // Filters
    if (msg.includes("filter") || msg.includes("search")) {
      return "Filters help you find tasks quickly! 🔍\n\n1. Click the 'Filters' button\n2. Use the search box to find tasks\n3. Filter by priority (High/Medium/Low)\n4. Filter by assignee\n\nYou can combine multiple filters too! 🎯";
    }

    // Mood
    if (msg.includes("mood") || msg.includes("feeling")) {
      return "I care about how you're feeling! 💭\n\nClick the mood button to set:\n🚀 Excited - You're pumped!\n💪 Confident - You got this!\n😐 Neutral - Just working\n😟 Concerned - Need some help?\n🚫 Blocked - Let's get you unstuck!\n\nYour team can see when you need support! 🤗";
    }

    // Activity
    if (msg.includes("activity") || msg.includes("history")) {
      return "The Activity Feed shows everything happening! 📊\n\nClick the purple 'Activity' button to see:\n• Task movements\n• Status changes\n• Comments\n• Who did what and when\n\nStay in the loop! 👀";
    }

    // Status/Kanban
    if (msg.includes("status") || msg.includes("move") || msg.includes("column")) {
      return "Moving tasks is easy! 📋\n\nEach task has a dropdown at the bottom:\n• To Do - Not started\n• In Progress - Working on it\n• Done - Completed!\n\nJust click the dropdown and select the new status. The task moves instantly! ✨";
    }

    // Labels
    if (msg.includes("label") || msg.includes("tag")) {
      return "Labels help organize tasks! 🏷️\n\nWhen creating a task, click on labels like:\n🔴 Bug\n🔵 Feature\n🟢 Enhancement\n🟣 Documentation\n🎨 Design\n\nYou can add multiple labels to each task! 🌈";
    }

    // Checklist
    if (msg.includes("checklist") || msg.includes("subtask")) {
      return "Checklists break down big tasks! ✅\n\nWhen creating a task:\n1. Scroll to the Checklist section\n2. Type a subtask\n3. Click 'Add'\n4. Repeat for more items\n\nYou'll see a progress bar showing completion! 📊";
    }

    // Thanks
    if (msg.match(/(thank|thanks|thx)/)) {
      return "You're so welcome! 🤗 I'm always here if you need me. Keep being awesome! 🌟";
    }

    // Goodbye
    if (msg.match(/(bye|goodbye|see you|later)/)) {
      return "Goodbye! 👋 Come back anytime you need help. I'll be here waiting for you! 🧸💕";
    }

    // Compliments
    if (msg.match(/(cute|adorable|sweet|nice|love you)/)) {
      return "Aww, you're making me blush! 😊 You're pretty awesome yourself! Keep up the great work! 🌟";
    }

    // Motivation
    if (msg.match(/(tired|stressed|difficult|hard|stuck)/)) {
      return "I believe in you! 💪 Remember:\n\n• Take breaks when needed\n• Use the Pomodoro timer for focus\n• Break big tasks into smaller ones\n• Ask your team for help\n• You've got this! 🌟\n\nWant to try a quick Pomodoro session? ⏱️";
    }

    // Default response
    const defaultResponses = [
      "Hmm, I'm not sure about that one! 🤔 Try asking me about tasks, templates, shortcuts, or the Pomodoro timer!",
      "That's interesting! 🧸 I'm still learning. Can you ask me about creating tasks, using filters, or keyboard shortcuts?",
      "I want to help! 💭 Try asking me about:\n• How to create tasks\n• Using templates\n• Keyboard shortcuts\n• The Pomodoro timer",
      "I'm a friendly teddy, but I'm still learning! 🧸 Ask me about tasks, templates, or shortcuts and I'll do my best to help!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      type: "user",
      text: inputText,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputText("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      setIsTyping(false);
      
      // Add bot response
      const botResponse = {
        type: "bot",
        text: getTeddyResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2s
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "How do I create a task?", icon: "➕" },
    { text: "Show me templates", icon: "📋" },
    { text: "What are keyboard shortcuts?", icon: "⚡" },
    { text: "How does Pomodoro work?", icon: "⏱️" }
  ];

  return (
    <>
      {/* Teddy Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group z-50 hover:scale-110 animate-bounce-slow"
        title="Chat with Teddy 🧸"
      >
        {/* Teddy Face */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Face */}
          <div className="absolute inset-2 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full"></div>
          
          {/* Ears */}
          <div className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
          
          {/* Eyes */}
          <div className="absolute top-5 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
          <div className="absolute top-5 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
          
          {/* Nose */}
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-gray-800 rounded-full"></div>
          
          {/* Smile */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-b-full"></div>
          
          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              !
            </div>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border-2 border-amber-200 z-50 flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Teddy Avatar */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                {/* Ears */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></div>
                
                {/* Face */}
                <div className="relative z-10">
                  {/* Eyes */}
                  <div className="absolute -top-1 -left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  <div className="absolute -top-1 left-1 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  
                  {/* Nose */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1 bg-gray-800 rounded-full"></div>
                  
                  {/* Smile */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 rounded-b-full"></div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-bold text-lg">Teddy Assistant</h3>
                <p className="text-amber-100 text-xs">Always here to help! 🧸</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-amber-50 to-orange-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white text-gray-800 shadow-md border border-amber-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === "user" ? "text-indigo-200" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="bg-white rounded-2xl p-3 shadow-md border border-amber-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-3 bg-white border-t border-amber-200">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(action.text);
                      handleSendMessage();
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-lg text-xs font-medium text-gray-700 transition-all duration-200 flex items-center gap-2 border border-amber-300"
                  >
                    <span>{action.icon}</span>
                    <span className="text-left">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-amber-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Teddy anything..."
                className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Teddy is here to help! 🧸
            </p>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default TeddyBot;
