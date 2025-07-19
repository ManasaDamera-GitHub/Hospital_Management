import React, { useState } from "react";

const BookingForm = ({ doctor, hospital, onClose, onBookSlot }) => {
  const [slot, setSlot] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Booking Confirmed!\nDoctor: ${doctor.name}\nHospital: ${hospital.name}\nSlot: ${slot}\nAmount: ₹${amount}`
    );
    onBookSlot(doctor.id, hospital.name, slot);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h3 className="text-lg font-semibold mb-4">Book Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Select Slot:</label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="w-full border p-2 mt-1"
              required
            >
              <option value="">Select</option>
              {hospital.slots.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Enter Consultation Amount (₹):</label>
            <input
              type="number"
              className="w-full border p-2 mt-1"
              placeholder="Eg: 800"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
