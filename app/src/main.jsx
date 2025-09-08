import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/root.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
