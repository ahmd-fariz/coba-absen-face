// src/App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import RegisterUser from "./components/RegisterUser";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Face Attendance System</h1>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link to="/" className="navbar-item">
                  Home
                </Link>
                <Link to="/register" className="navbar-item">
                  Register User
                </Link>
                <Link to="/attendance" className="navbar-item">
                  Mark Attendance
                </Link>
                <Link to="/users" className="navbar-item">
                  User List
                </Link>
              </div>
            </div>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<h2>Welcome to Face Attendance System</h2>}
            />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/attendance" element={<WebcamCapture />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      </section>
    </div>
  );
};

export default App;
