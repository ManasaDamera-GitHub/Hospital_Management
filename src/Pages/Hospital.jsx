import React, { useEffect, useState } from "react";
import "../Styles/Hospital.css";

const HospitalDashboard = () => {
  const defaultHospitals = [
    {
      id: "hosp1",
      name: "City Heart Hospital",
      location: "Mumbai",
      departments: [
        { name: "Cardiology", doctors: [] },
        { name: "Orthopedics", doctors: [] },
      ],
    },
    {
      id: "hosp2",
      name: "Sunrise Multispeciality",
      location: "Bangalore",
      departments: [
        { name: "Pediatrics", doctors: [] },
        { name: "Dermatology", doctors: [] },
      ],
    },
  ];

  const [hospitals, setHospitals] = useState([]);
  const [hospitalForm, setHospitalForm] = useState({ name: "", location: "" });
  const [deptForm, setDeptForm] = useState({ hospitalId: "", name: "" });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("hospitals");
    if (stored) {
      setHospitals(JSON.parse(stored));
    } else {
      setHospitals(defaultHospitals);
      localStorage.setItem("hospitals", JSON.stringify(defaultHospitals));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("hospitals", JSON.stringify(hospitals));
  }, [hospitals]);

  const handleHospitalInput = (e) => {
    setHospitalForm({ ...hospitalForm, [e.target.name]: e.target.value });
  };

  const handleAddHospital = (e) => {
    e.preventDefault();
    const newHospital = {
      id: `hosp${Date.now()}`,
      name: hospitalForm.name.trim(),
      location: hospitalForm.location.trim(),
      departments: [],
    };
    setHospitals([...hospitals, newHospital]);
    setHospitalForm({ name: "", location: "" });
  };

  const handleDeptInput = (e) => {
    setDeptForm({ ...deptForm, [e.target.name]: e.target.value });
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    const updated = hospitals.map((hosp) => {
      if (hosp.id === deptForm.hospitalId) {
        return {
          ...hosp,
          departments: [
            ...hosp.departments,
            { name: deptForm.name.trim(), doctors: [] },
          ],
        };
      }
      return hosp;
    });
    setHospitals(updated);
    setDeptForm({ hospitalId: "", name: "" });
  };

  return (
    <div className="hospital-dashboard">
      <h1>🏥 Hospital Dashboard</h1>

      {/* Add Hospital Form */}
      <form onSubmit={handleAddHospital} className="hospital-form">
        <h3>Add New Hospital</h3>
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          value={hospitalForm.name}
          onChange={handleHospitalInput}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={hospitalForm.location}
          onChange={handleHospitalInput}
          required
        />
        <button type="submit">Add Hospital</button>
      </form>

      {/* Add Department Form */}
      {deptForm.hospitalId && (
        <form onSubmit={handleAddDepartment} className="department-form">
          <h4>Add Department to Selected Hospital</h4>
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={deptForm.name}
            onChange={handleDeptInput}
            required
          />
          <button type="submit">Add Department</button>
        </form>
      )}

      {/* Hospital List */}
      <div className="hospital-list">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <h2>{hospital.name}</h2>
            <p>
              <strong>Location:</strong> {hospital.location}
            </p>

            <h4>Departments</h4>
            {hospital.departments.length === 0 ? (
              <p>No departments yet.</p>
            ) : (
              <ul>
                {hospital.departments.map((dept, index) => (
                  <li key={index}>{dept.name}</li>
                ))}
              </ul>
            )}

            <button
              className="add-dept-btn"
              onClick={() => setDeptForm({ hospitalId: hospital.id, name: "" })}
            >
              + Add Department
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;
