import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";

// Create a root element using the new React 18 API
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
