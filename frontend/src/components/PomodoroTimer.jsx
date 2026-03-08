import { useState, useEffect, useRef } from "react";

function PomodoroTimer({ taskId, onSessionComplete }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState("work"); // work, shortBreak, longBreak
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);

  const sessionDurations = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
  };

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleSessionComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes, seconds]);

  const handleSessionComplete = () => {
    setIsActive(false);
    
    if (sessionType === "work") {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      
      // Notify parent component
      if (onSessionComplete) {
        onSessionComplete({
          duration: sessionDurations[sessionType],
          type: sessionType,
          taskId
        });
      }

      // Play notification sound (optional)
      playNotificationSound();
      
      // Auto-switch to break
      if (newSessionsCompleted % 4 === 0) {
        switchSession("longBreak");
      } else {
        switchSession("shortBreak");
      }
    } else {
      switchSession("work");
    }
  };

  const playNotificationSound = () => {
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const switchSession = (type) => {
    setSessionType(type);
    setMinutes(sessionDurations[type]);
    setSeconds(0);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(sessionDurations[sessionType]);
    setSeconds(0);
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalSeconds = sessionDurations[sessionType] * 60;
    const currentSeconds = minutes * 60 + seconds;
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  };

  const sessionColors = {
    work: "from-red-500 to-orange-500",
    shortBreak: "from-green-500 to-teal-500",
    longBreak: "from-blue-500 to-purple-500"
  };

  const sessionIcons = {
    work: "🎯",
    shortBreak: "☕",
    longBreak: "🌴"
  };

  const sessionLabels = {
    work: "Focus Time",
    shortBreak: "Short Break",
    longBreak: "Long Break"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          <span>Pomodoro Timer</span>
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
            🍅 {sessionsCompleted}
          </span>
        </div>
      </div>

      {/* Session Type Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => switchSession("work")}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            sessionType === "work"
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🎯 Focus
        </button>
        <button
          onClick={() => switchSession("shortBreak")}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            sessionType === "shortBreak"
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ☕ Break
        </button>
        <button
          onClick={() => switchSession("longBreak")}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            sessionType === "longBreak"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🌴 Long
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        {/* Progress Ring */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - getProgressPercentage() / 100)}`}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={sessionType === "work" ? "text-red-500" : sessionType === "shortBreak" ? "text-green-500" : "text-blue-500"} stopColor="currentColor" />
                <stop offset="100%" className={sessionType === "work" ? "text-orange-500" : sessionType === "shortBreak" ? "text-teal-500" : "text-purple-500"} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {formatTime(minutes, seconds)}
            </div>
            <div className="text-sm font-semibold text-gray-500 flex items-center gap-1">
              <span>{sessionIcons[sessionType]}</span>
              <span>{sessionLabels[sessionType]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
            isActive
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              : `bg-gradient-to-r ${sessionColors[sessionType]} hover:shadow-xl`
          }`}
        >
          {isActive ? "⏸️ Pause" : "▶️ Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
        >
          🔄 Reset
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">{sessionsCompleted}</div>
            <div className="text-xs text-gray-500">Sessions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{Math.floor(sessionsCompleted / 4)}</div>
            <div className="text-xs text-gray-500">Cycles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{sessionsCompleted * 25}</div>
            <div className="text-xs text-gray-500">Minutes</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      {!isActive && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-xs text-indigo-700">
            💡 <span className="font-semibold">Tip:</span> Work for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-minute break!
          </p>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
