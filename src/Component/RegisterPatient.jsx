import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPatient = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    DOB: "",
    uniqueId: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, gender, DOB, uniqueId } = form;
    if (!name || !gender || !DOB || !uniqueId)
      return alert("all fields are required");
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push({
      id: Date.now(),
      name,
      gender,
      DOB,
      uniqueId,
    });
    localStorage.setItem("patients", JSON.stringify(patients));
    alert("patient registration successful");
    navigate("/hospitals");
    setForm({ name: "", gender: "", DOB: "", uniqueId: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <select name="gender" onChange={handleChange} value={form.gender}>
        <option value="">Select gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input
        type="date"
        name="DOB"
        placeholder="DOB"
        value={form.DOB}
        onChange={handleChange}
      />
      <input
        type="text"
        name="uniqueId"
        placeholder="uniqueId (Aadhar,Passport)"
        value={form.uniqueId}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
