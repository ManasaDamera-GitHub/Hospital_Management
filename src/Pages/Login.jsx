import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Role-based navigation
    if (formData.role === "patient") {
      navigate("/patient-dashboard");
    } else if (formData.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (formData.role === "hospital") {
      navigate("/hospital-dashboard");
    } else {
      alert("Please select a valid role.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          required
        >
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="hospital">Hospital Admin</option>
        </select>

        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
