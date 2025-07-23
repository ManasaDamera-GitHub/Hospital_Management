import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import DoctorsPage from "./Pages/Doctor";
import HospitalDashboard from "./Pages/Hospital";
import DoctorList from "./Components/DoctorList";
import PatientHistory from "./Pages/Patient";
import { RoleSelection } from "./Component/RoleSelection";
import { RegisterDoctor } from "./Component/RegisterDoctor";
import { RegisterPatient } from "./Component/RegisterPatient";
import { RegisterHospitalAdmin } from "./Component/RegisterHospitalAdmin";
import { Hospital } from "./Component/Hospital";

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorsPage />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/patient-dashboard" element={<PatientHistory />} />
        <Route path="/book-doctor" element={<DoctorList />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/admin" element={<RegisterHospitalAdmin />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/hospital-dashboard" element={<Hospital />} />
      </Routes>
    </Router>
  );
};
