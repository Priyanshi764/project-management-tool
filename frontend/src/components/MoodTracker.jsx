import { useState } from "react";

function MoodTracker({ currentMood, onMoodChange }) {
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [note, setNote] = useState("");

  const moods = [
    {
      value: "excited",
      emoji: "🚀",
      label: "Excited",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      description: "Energized and motivated!"
    },
    {
      value: "confident",
      emoji: "💪",
      label: "Confident",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      description: "Feeling capable and ready"
    },
    {
      value: "neutral",
      emoji: "😐",
      label: "Neutral",
      color: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      description: "Just another day"
    },
    {
      value: "concerned",
      emoji: "😟",
      label: "Concerned",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      description: "A bit worried about this"
    },
    {
      value: "blocked",
      emoji: "🚫",
      label: "Blocked",
      color: "from-red-400 to-rose-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      description: "Stuck and need help"
    }
  ];

  const currentMoodData = moods.find(m => m.value === currentMood) || moods[2];

  const handleMoodSelect = (mood) => {
    onMoodChange({
      mood: mood.value,
      note: note.trim(),
      timestamp: new Date()
    });
    setNote("");
    setShowMoodPicker(false);
  };

  return (
    <div className="relative">
      {/* Current Mood Display */}
      <button
        onClick={() => setShowMoodPicker(!showMoodPicker)}
        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 ${currentMoodData.bgColor} ${currentMoodData.textColor} border-2 border-current`}
      >
        <span className="text-2xl">{currentMoodData.emoji}</span>
        <span>Mood: {currentMoodData.label}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mood Picker Panel */}
      {showMoodPicker && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">💭</span>
                <span>How are you feeling?</span>
              </h3>
              <button
                onClick={() => setShowMoodPicker(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mood Options */}
          <div className="p-4 space-y-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                  currentMood === mood.value
                    ? `${mood.bgColor} border-current ${mood.textColor} shadow-md`
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                    {mood.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 mb-1">
                      {mood.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {mood.description}
                    </div>
                  </div>
                  {currentMood === mood.value && (
                    <div className="text-green-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Optional Note */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add a note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              rows={2}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tracking mood helps identify blockers and celebrate wins!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodTracker;
