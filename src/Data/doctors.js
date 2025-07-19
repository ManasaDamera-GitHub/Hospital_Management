export const doctors = [
  {
    id: 1,
    name: "Dr. Asha Mehta",
    specialization: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    hospitals: [
      {
        name: "City Hospital",
        location: "Mumbai",
        fee: 800,
        slots: ["10:00 AM", "11:00 AM", "02:00 PM"],
      },
      {
        name: "Metro Care",
        location: "Pune",
        fee: 750,
        slots: ["09:30 AM", "12:30 PM"],
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Ravi Kumar",
    specialization: "Orthopedics",
    qualification: "MBBS, MS (Ortho)",
    hospitals: [
      {
        name: "Bone & Joint Clinic",
        location: "Delhi",
        fee: 600,
        slots: ["11:00 AM", "01:00 PM"],
      },
    ],
  },
];
