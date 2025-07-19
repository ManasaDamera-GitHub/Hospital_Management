import React from "react";
import DoctorList from "../Components/DoctorList";

const BookAppointment = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search & Book Doctors</h2>
      <DoctorList />
    </div>
  );
};

export default BookAppointment;
