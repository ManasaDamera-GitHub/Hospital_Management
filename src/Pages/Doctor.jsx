import React, { useEffect, useState } from "react";
import "../Styles/Doctor.css";

const initialDoctors = [
  {
    id: "doc1",
    name: "Dr. Aisha Kapoor",
    specialization: "Cardiologist",
    qualification: "MD (Cardiology)",
    experience: "12 years",
    hospitals: [
      {
        name: "City Heart Hospital",
        timeSlots: ["09:00 AM - 11:00 AM", "04:00 PM - 06:00 PM"],
        consultationFee: 1000,
        revenueSharing: { doctor: "60%", hospital: "40%" },
      },
    ],
  },
];

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    hospitalName: "",
    timeSlots: "",
    consultationFee: "",
  });

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("doctors")) || initialDoctors;
    setDoctors(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();

    const hospitalData = {
      name: form.hospitalName,
      timeSlots: form.timeSlots.split(",").map((t) => t.trim()),
      consultationFee: Number(form.consultationFee),
      revenueSharing: { doctor: "60%", hospital: "40%" },
    };

    if (selectedDoctorId) {
      const updatedDoctors = doctors.map((doc) =>
        doc.id === selectedDoctorId
          ? { ...doc, hospitals: [...doc.hospitals, hospitalData] }
          : doc
      );
      setDoctors(updatedDoctors);
      setSelectedDoctorId(null); // reset after adding
    } else {
      const newDoctor = {
        id: `doc${doctors.length + 1}`,
        name: form.name,
        specialization: form.specialization,
        qualification: form.qualification,
        experience: form.experience,
        hospitals: [hospitalData],
      };
      setDoctors([...doctors, newDoctor]);
    }

    setForm({
      name: "",
      specialization: "",
      qualification: "",
      experience: "",
      hospitalName: "",
      timeSlots: "",
      consultationFee: "",
    });
  };

  const handleAddHospitalClick = (doctor) => {
    setSelectedDoctorId(doctor.id);
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      hospitalName: "",
      timeSlots: "",
      consultationFee: "",
    });
  };

  return (
    <div className="doctors-page">
      <h1>Doctors Directory</h1>

      <form className="doctor-form" onSubmit={handleAddDoctor}>
        <h2>
          {selectedDoctorId ? "Add Hospital to Doctor" : "Add New Doctor"}
        </h2>
        <input
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={selectedDoctorId !== null}
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
          disabled={selectedDoctorId !== null}
        />
        <input
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
          required
          disabled={selectedDoctorId !== null}
        />
        <input
          name="experience"
          placeholder="Experience (e.g., 10 years)"
          value={form.experience}
          onChange={handleChange}
          required
          disabled={selectedDoctorId !== null}
        />
        <input
          name="hospitalName"
          placeholder="Hospital Name"
          value={form.hospitalName}
          onChange={handleChange}
          required
        />
        <input
          name="timeSlots"
          placeholder="Time Slots (comma separated)"
          value={form.timeSlots}
          onChange={handleChange}
          required
        />
        <input
          name="consultationFee"
          type="number"
          placeholder="Consultation Fee"
          value={form.consultationFee}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {selectedDoctorId ? "Add Hospital" : "Add Doctor"}
        </button>
      </form>

      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          <h2>{doctor.name}</h2>
          <p>
            <strong>Specialization:</strong> {doctor.specialization}
          </p>
          <p>
            <strong>Qualification:</strong> {doctor.qualification}
          </p>
          <p>
            <strong>Experience:</strong> {doctor.experience}
          </p>

          <div className="hospital-section">
            <h3>Associated Hospitals:</h3>
            {doctor.hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <p>
                  <strong>Hospital Name:</strong> {hospital.name}
                </p>
                <p>
                  <strong>Time Slots:</strong> {hospital.timeSlots.join(", ")}
                </p>
                <p>
                  <strong>Consultation Fee:</strong> ₹{hospital.consultationFee}
                </p>
                <p>
                  <strong>Revenue Sharing:</strong> Doctor -{" "}
                  {hospital.revenueSharing.doctor}, Hospital -{" "}
                  {hospital.revenueSharing.hospital}
                </p>
              </div>
            ))}
            <button onClick={() => handleAddHospitalClick(doctor)}>
              + Add Hospital
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsPage;
