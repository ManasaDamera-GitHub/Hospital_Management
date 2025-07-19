import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/PatientHistory.css";

const PatientHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
  const storedHistory = JSON.parse(localStorage.getItem("patientHistory")) || [];

  // Add dummy/fake data only once if no records exist
  if (storedHistory.length === 0) {
    const fakeHistory = [
      {
        doctorName: "Dr. Meena Reddy",
        specialization: "Dermatologist",
        hospitalName: "Sunrise Hospital",
        consultationDate: "2025-07-15T10:30:00",
        consultationAmount: "700",
      },
      {
        doctorName: "Dr. Arjun Rao",
        specialization: "Cardiologist",
        hospitalName: "Apollo Clinic",
        consultationDate: "2025-06-22T15:00:00",
        consultationAmount: "1200",
      },
    ];
    localStorage.setItem("patientHistory", JSON.stringify(fakeHistory));
    setHistory(fakeHistory);
  } else {
    setHistory(storedHistory);
  }
}, []);


  const handleNewAppointment = () => {
    navigate("/book-doctor");
  };

  return (
    <div className="history-container">
      <h2 className="history-title">My Consultation History</h2>

      {history.length === 0 ? (
        <p className="no-records">No consultation records found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Hospital</th>
                <th>Date</th>
                <th>Consultation Fee (₹)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.doctorName}</td>
                  <td>{item.specialization}</td>
                  <td>{item.hospitalName}</td>
                  <td>{new Date(item.consultationDate).toLocaleString()}</td>
                  <td>{item.consultationAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="book-btn" onClick={handleNewAppointment}>
        Book New Appointment
      </button>
    </div>
  );
};

export default PatientHistory;
