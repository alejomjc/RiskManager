import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {About} from "./components/About";
import {Riesgos} from "./components/Riesgos";
import {Navbar} from "./components/Navbar";

function App() {
  return (
      <Router>
          <Navbar/>
          <div className="container p-2">
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Riesgos />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
