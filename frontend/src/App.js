import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Risks} from "./components/Risks/Risks";
import {Users} from "./components/Users/Users";
import {Navbar} from "./components/Navbar";
import {Login} from "./components/Login/Login";

function App() {
  return (
      <Router>
          <Navbar/>
          <div className="container p-2">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Risks />} />
                <Route path="/login" element={<Login />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
