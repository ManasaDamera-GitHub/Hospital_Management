import React, { useState } from "react";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",

    // Patient
    gender: "",
    dob: "",
    uniqueId: "",

    // Doctor
    qualifications: "",
    specializations: [],
    experience: "",
    associations: [],

    // Hospital Admin
    hospitalName: "",
    location: "",
    departments: [],
  });

  const [newDept, setNewDept] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    // Validations
    if (form.role === "patient") {
      if (!form.gender || !form.dob || !form.uniqueId) {
        alert("Please fill all patient fields.");
        return;
      }
    }

    if (form.role === "doctor") {
      if (
        !form.qualifications ||
        !form.specializations.length ||
        !form.experience
      ) {
        alert("Please fill all doctor fields.");
        return;
      }

      const allSlots = form.associations.flatMap((a) => a.slots || []);
      const slotSet = new Set(allSlots.map((s) => s.date + s.time));
      if (slotSet.size < allSlots.length) {
        alert("Conflicting time slots found across hospitals!");
        return;
      }
    }

    if (form.role === "hospital") {
      if (
        !form.hospitalName ||
        !form.location ||
        form.departments.length === 0
      ) {
        alert("Please complete hospital details and departments.");
        return;
      }
    }

    // Save all users
    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedUsers = [...existingUsers, form];
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    // If role is doctor, also save to doctorsList
    if (form.role === "doctor") {
      const existingDoctors =
        JSON.parse(localStorage.getItem("doctorsList")) || [];
      const updatedDoctors = [...existingDoctors, form];
      localStorage.setItem("doctorsList", JSON.stringify(updatedDoctors));
    }

    alert("Registration successful!");
    navigate("/login");
  };

  const handleSpecializationToggle = (value) => {
    setForm((prev) => {
      const updated = prev.specializations.includes(value)
        ? prev.specializations.filter((s) => s !== value)
        : [...prev.specializations, value];
      return { ...prev, specializations: updated };
    });
  };

  const handleAddDepartment = () => {
    if (newDept.trim() !== "" && !form.departments.includes(newDept.trim())) {
      setForm({
        ...form,
        departments: [...form.departments, newDept.trim()],
      });
      setNewDept("");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="form-title">Register</h2>

        {/* Common Fields */}
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="hospital">Hospital Admin</option>
        </select>

        {/* Patient Fields */}
        {form.role === "patient" && (
          <>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Aadhar / Passport ID"
              value={form.uniqueId}
              onChange={(e) => setForm({ ...form, uniqueId: e.target.value })}
              required
            />
          </>
        )}

        {/* Doctor Fields */}
        {form.role === "doctor" && (
          <>
            <input
              type="text"
              placeholder="Qualifications"
              value={form.qualifications}
              onChange={(e) =>
                setForm({ ...form, qualifications: e.target.value })
              }
              required
            />

            <label>Select Specializations:</label>
            {["Cardiology", "Orthopedics", "Dermatology", "ENT"].map((spec) => (
              <label key={spec} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={form.specializations.includes(spec)}
                  onChange={() => handleSpecializationToggle(spec)}
                />
                {spec}
              </label>
            ))}

            <input
              type="number"
              placeholder="Years of Experience"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              required
            />
          </>
        )}

        {/* Hospital Admin Fields */}
        {form.role === "hospital" && (
          <>
            <input
              type="text"
              placeholder="Hospital Name"
              value={form.hospitalName}
              onChange={(e) =>
                setForm({ ...form, hospitalName: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />

            <div>
              <label>Add Department:</label>
              <input
                type="text"
                placeholder="e.g. Cardiology"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
              />
              <button type="button" onClick={handleAddDepartment}>
                Add
              </button>
            </div>

            <ul>
              {form.departments.map((dep, i) => (
                <li key={i}>{dep}</li>
              ))}
            </ul>
          </>
        )}

        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
