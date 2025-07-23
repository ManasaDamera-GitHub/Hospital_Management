import React, { useEffect, useState } from "react";
import "../Styles/Hospital.css";

export const Hospital = () => {
  const [hospital, setHospital] = useState({
    name: "",
    location: "",
    departments: [],
  });
  const [newDept, setNewDept] = useState("");
  const [hospitalsList, setHospitalList] = useState([]);
  useEffect(() => {
    const storedHospitals =
      JSON.parse(localStorage.getItem("hospitalList")) || [];
    setHospitalList(storedHospitals);
  }, []);
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };
  const handleAddDepartment = () => {
    if (newDept.trim() && !hospital.departments.includes(newDept.trim())) {
      setHospital({
        ...hospital,
        departments: [...hospital.departments, newDept.trim()],
      });
      setNewDept("");
    }
  };
  const handleAddHospital = () => {
    if (
      !hospital.name ||
      !hospital.location ||
      hospital.departments.length === 0
    ) {
      alert("please fill all fields and add at least one department.");
      return;
    }
    const newHospital = {
      id: Date.now(),
      ...hospital,
    };
    const updatedList = [...hospitalsList, newHospital];
    localStorage.setItem("hospitalList", JSON.stringify(updatedList));
    setHospitalList(updatedList);

    setHospital({ name: "", location: "", departments: [] });
    alert("Hospital added successfully!");
  };

  return (
    <div>
      <h2>Add hospital</h2>
      <div>
        <input
          type="text"
          placeholder="Hospital Name"
          value={hospital.name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="location"
          name="location"
          value={hospital.location}
          onChange={handleChange}
        />
        <div>
          <input
            type="text"
            placeholder="Add Department"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
          />
          <button onClick={handleAddDepartment}>Add Dept</button>
        </div>
        <ul>
          {hospital.departments.map((dept, index) => (
            <li key={index}>{dept}</li>
          ))}
        </ul>
        <button onClick={handleAddHospital}>Add Hospital</button>
      </div>
      <h2>Registered Hospital</h2>
      {hospitalsList.length === 0 ? (
        <p>No hospitals added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Departments</th>
            </tr>
          </thead>
          <tbody>
            {hospitalsList.map((hosp) => (
              <tr key={hosp.id}>
                <td>{hosp.name}</td>
                <td>{hosp.location}</td>
                <td>{hosp.departments.join(",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
