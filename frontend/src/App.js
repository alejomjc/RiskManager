import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Risks} from "./components/Risks/Risks";
import {Users} from "./components/Users/Users";
import {Navbar} from "./components/Navbar";
import {Login} from "./components/Login/Login";
import {Home} from "./components/Home/Home";

function App() {
  return (
      <Router>
          <Navbar/>
          <div className="container p-2">
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/risks" element={<Risks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
