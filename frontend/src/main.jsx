import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Security warning in console
if (typeof window !== "undefined") {
  console.log(
    "%c⚠️ STOP!",
    "color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
  );
  console.log(
    "%cThis is a browser feature intended for developers.",
    "font-size: 18px; font-weight: bold;"
  );
  console.log(
    "%cIf someone told you to copy-paste something here, it's a scam to steal your account.",
    "font-size: 16px; color: #d32f2f;"
  );
  console.log(
    "%cFor more info: https://en.wikipedia.org/wiki/Self-XSS",
    "font-size: 14px; color: #1976d2;"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
