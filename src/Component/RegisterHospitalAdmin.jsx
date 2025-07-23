import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterHospitalAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    departments: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, departments } = form;
    if (!name || !location || !departments)
      return alert("All fields are required");

    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    admins.push({
      id: Date.now(),
      name,
      location,
      departments: departments.split(","),
    });

    localStorage.setItem("admins", JSON.stringify(admins));
    alert("Hospital registered successfully");
    setForm({ name: "", location: "", departments: "" });
    navigate("/hospital-dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register hospital</h3>
      <input
        type="text"
        name="name"
        placeholder="Hospital Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        value={form.location}
      />
      <input
        type="text"
        name="departments"
        placeholder="Departments (comma separated)"
        onChange={handleChange}
        value={form.departments}
      />
      <button type="submit">Register Hospital</button>
    </form>
  );
};
