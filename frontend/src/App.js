

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ExchangeData from "./components/ExchangeData";
import MetadataData from "./components/MetadataData";
import CandleData from "./components/CandleData";

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Data App
            </Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/exchange">
                Exchange
              </Link>
              <Link className="nav-link" to="/metadata">
                Metadata
              </Link>
              <Link className="nav-link" to="/candle">
                Candle
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Container */}
        <div className="container">
          <Routes>
            <Route path="/exchange" element={<ExchangeData />} />
            <Route path="/metadata" element={<MetadataData />} />
            <Route path="/candle" element={<CandleData />} />
            <Route path="/" element={<div>Welcome to the Data App!</div>} />
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;




