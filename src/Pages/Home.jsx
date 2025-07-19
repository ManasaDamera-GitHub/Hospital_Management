import React from "react";
import { Link } from "react-router-dom";
import "../Styles/home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Hospital & Appointment Management System</h1>
      <div className="home-links">
        <Link to="/login" className="home-link">
          Login
        </Link>
        <span className="separator">|</span>
        <Link to="/register" className="home-link">
          Register
        </Link>
      </div>
    </div>
  );
};
