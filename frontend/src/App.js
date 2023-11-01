import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Risks} from "./components/Risks/Risks";
import {Users} from "./components/Users/Users";
import {Navbar} from "./components/Navbar";

function App() {
  return (
      <Router>
          <Navbar/>
          <div className="container p-2">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Risks />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
