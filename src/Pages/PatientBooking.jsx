// DoctorList.jsx (Main Booking Page)
import React, { useState } from "react";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Cardiology",
    hospital: "City Care Hospital",
    availability: ["10:00 AM", "11:00 AM", "02:00 PM"],
    consultationFee: 500,
  },
  {
    id: 2,
    name: "Dr. Rohit Verma",
    specialization: "Orthopedics",
    hospital: "Sunrise Hospital",
    availability: ["12:00 PM", "03:00 PM"],
    consultationFee: 600,
  },
  {
    id: 3,
    name: "Dr. Meena Das",
    specialization: "Pediatrics",
    hospital: "City Care Hospital",
    availability: ["09:00 AM", "01:00 PM"],
    consultationFee: 400,
  },
];

const DoctorList = () => {
  const [filters, setFilters] = useState({ specialization: "", hospital: "" });
  const [doctors, setDoctors] = useState(doctorsData);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [amount, setAmount] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredDoctors = doctors.filter((doc) => {
    return (
      (filters.specialization === "" ||
        doc.specialization === filters.specialization) &&
      (filters.hospital === "" || doc.hospital === filters.hospital)
    );
  });

  const handleBooking = () => {
    if (!selectedDoctor || !selectedSlot || !amount) return;

    const updatedDoctors = doctors.map((doc) => {
      if (doc.id === selectedDoctor.id) {
        return {
          ...doc,
          availability: doc.availability.filter(
            (slot) => slot !== selectedSlot
          ),
        };
      }
      return doc;
    });

    setDoctors(updatedDoctors);
    setBookings([
      ...bookings,
      {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        slot: selectedSlot,
        hospital: selectedDoctor.hospital,
        fee: amount,
      },
    ]);
    setSelectedDoctor(null);
    setSelectedSlot("");
    setAmount("");
    alert("Appointment booked successfully!");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search & Book Doctors</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          name="specialization"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Specializations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>

        <select
          name="hospital"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Hospitals</option>
          <option value="City Care Hospital">City Care Hospital</option>
          <option value="Sunrise Hospital">Sunrise Hospital</option>
        </select>
      </div>

      {filteredDoctors.map((doc) => (
        <div
          key={doc.id}
          className="border p-4 rounded-lg mb-4 shadow-md bg-white"
        >
          <h3 className="text-lg font-semibold text-blue-800">{doc.name}</h3>
          <p>Specialization: {doc.specialization}</p>
          <p>Hospital: {doc.hospital}</p>
          <p>Fee: ₹{doc.consultationFee}</p>
          <p className="font-semibold mt-2">Available Slots:</p>
          <div className="flex gap-2 flex-wrap">
            {doc.availability.length ? (
              doc.availability.map((slot) => (
                <button
                  key={slot}
                  className={`px-3 py-1 border rounded hover:bg-blue-200 ${
                    selectedSlot === slot && selectedDoctor?.id === doc.id
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setSelectedSlot(slot);
                  }}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p className="text-red-500">No slots available</p>
            )}
          </div>

          {selectedDoctor?.id === doc.id && selectedSlot && (
            <div className="mt-4">
              <input
                type="number"
                placeholder="Enter consultation amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <button
                onClick={handleBooking}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      ))}

      {bookings.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">My Bookings</h3>
          <ul className="list-disc pl-5">
            {bookings.map((b, index) => (
              <li key={index} className="mt-1">
                Appointment with <strong>{b.doctorName}</strong> at{" "}
                <strong>{b.hospital}</strong> on <strong>{b.slot}</strong>. Fee
                paid: ₹{b.fee}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
