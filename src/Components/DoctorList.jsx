import React, { useState } from "react";
import { doctors } from "../Data/doctors";
import BookingForm from "./BookingForm";
import "../Styles/DoctorList.css";

const DoctorList = () => {
  const [filters, setFilters] = useState({
    specialization: "",
    hospital: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});

  const handleBookSlot = (doctorId, hospitalName, slot) => {
    setBookedSlots((prev) => ({
      ...prev,
      [`${doctorId}_${hospitalName}_${slot}`]: true,
    }));
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialization =
      !filters.specialization ||
      doc.specialization
        .toLowerCase()
        .includes(filters.specialization.toLowerCase());
    const matchesHospital =
      !filters.hospital ||
      doc.hospitals.some((h) =>
        h.name.toLowerCase().includes(filters.hospital.toLowerCase())
      );
    return matchesSpecialization && matchesHospital;
  });

  return (
    <div className="doctor-container">
      <h2 className="doctor-heading">Search & Book Appointments</h2>

      {/* Filters */}
      <div className="filter-container">
        <input
          placeholder="Search by Specialization"
          className="border border-gray-300 p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFilters({ ...filters, specialization: e.target.value })
          }
        />
        <input
          placeholder="Search by Hospital"
          className="border border-gray-300 p-3 w-full md:w-1/3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, hospital: e.target.value })}
        />
      </div>

      {/* Doctor Cards */}
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="	doctor-card">
            <h3 className="doctor-details">{doctor.name}</h3>
            <p className="text-gray-600 mt-1">
              {doctor.specialization} | {doctor.qualification}
            </p>

            {doctor.hospitals.map((hospital, idx) => (
              <div key={idx} className="hospital-section">
                <p className="hospital-name">
                  {hospital.name} – {hospital.location}
                </p>
                <p className="hospital-fee">Fee: ₹{hospital.fee}</p>
                <p className="text-sm text-gray-600 mt-2">Available Slots:</p>

                <div className="slot-container">
                  {hospital.slots.map((slot, sIdx) => {
                    const isBooked =
                      bookedSlots[`${doctor.id}_${hospital.name}_${slot}`];
                    return (
                      <button
                        key={sIdx}
                        disabled={isBooked}
                        className={`slot-button ${
                          isBooked
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setSelectedHospital(hospital);
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="no-doctors">No doctors match the selected filters.</p>
      )}

      {/* Booking Form */}
      {selectedDoctor && selectedHospital && (
        <BookingForm
          doctor={selectedDoctor}
          hospital={selectedHospital}
          onClose={() => {
            setSelectedDoctor(null);
            setSelectedHospital(null);
          }}
          onBookSlot={handleBookSlot}
        />
      )}
    </div>
  );
};

export default DoctorList;
