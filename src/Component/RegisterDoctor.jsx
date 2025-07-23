import React, { useState } from "react";

export const RegisterDoctor = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    hospital: "",
    availability: "",
    fee: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      qualification,
      specialization,
      experience,
      hospital,
      availability,
      fee,
    } = form;
    if (
      !name ||
      !qualification ||
      !specialization ||
      !experience ||
      !hospital ||
      !availability ||
      !fee
    )
      return alert("All fields are required");
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.push({
      id: Date.now(),
      name,
      qualification,
      specialization,
      experience,
      hospital,
      availability,
      fee,
    });
    localStorage.setItem("doctors", JSON.stringify(doctors));
    alert("Doctor registered successfully");
    setForm({
      name: "",
      qualification: "",
      specialization: "",
      experience: "",
      hospital: hospital.split(","),
      availability: availability.split(","),
      fee: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Doctor Registration</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="qualification"
        placeholder="qualification"
        value={form.qualification}
        onChange={handleChange}
      />
      <input
        type="text"
        name="specialization"
        placeholder="specialization"
        value={form.specialization}
        onChange={handleChange}
      />
      <input
        type="text"
        name="experience"
        placeholder="experience"
        value={form.experience}
        onChange={handleChange}
      />
      <input
        type="text"
        name="hospital"
        placeholder="hospital"
        value={form.hospital}
        onChange={handleChange}
      />
      <input
        type="text"
        name="availability"
        placeholder="availability"
        value={form.availability}
        onChange={handleChange}
      />
      <input
        type="text"
        name="fee"
        placeholder="fee"
        value={form.fee}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
