import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectDetail from "./pages/ProjectDetail";
import Backlog from "./pages/Backlog";


function App() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    // Check if device is mobile/touch device
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    // Don't create cursor effects on touch devices
    if (isTouchDevice) {
      return;
    }

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    cursorDotRef.current = cursorDot;

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);
    cursorRingRef.current = cursorRing;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let trailCounter = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update cursor dot position immediately
      if (cursorDot) {
        cursorDot.style.left = `${mouseX - 6}px`;
        cursorDot.style.top = `${mouseY - 6}px`;
      }

      // Create trail particles every few pixels
      trailCounter++;
      if (trailCounter % 3 === 0) {
        createTrailParticle(mouseX, mouseY);
      }
    };

    // Create trail particle
    const createTrailParticle = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x - 3}px`;
      trail.style.top = `${y - 3}px`;
      document.body.appendChild(trail);
      
      trailsRef.current.push(trail);

      // Remove trail after animation
      setTimeout(() => {
        trail.remove();
        trailsRef.current = trailsRef.current.filter(t => t !== trail);
      }, 600);
    };

    // Smooth ring animation
    const animateRing = () => {
      // Smooth follow effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.left = `${ringX - 20}px`;
        cursorRing.style.top = `${ringY - 20}px`;
      }

      requestAnimationFrame(animateRing);
    };

    // Start animations
    document.addEventListener('mousemove', handleMouseMove);
    animateRing();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cursorDot) cursorDot.remove();
      if (cursorRing) cursorRing.remove();
      trailsRef.current.forEach(trail => trail.remove());
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        
      />
      <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
        
      />
      <Route
        path="/project/:projectId/backlog"
        element={
          <ProtectedRoute>
            <Backlog />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
