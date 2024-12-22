

import React from "react";
import './index.css';
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root
root.render(<App />); // Use the root to render the App component
