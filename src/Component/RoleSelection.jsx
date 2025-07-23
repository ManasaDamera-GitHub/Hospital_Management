import React from "react";
import { useNavigate } from "react-router-dom";

export const RoleSelection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>select role to register</h1>
      <button onClick={() => navigate("/register/admin")}>
        Hospital Admin
      </button>
      <button onClick={() => navigate("/register/doctor")}>Doctor</button>
      <button onClick={() => navigate("/register/patient")}>Patient</button>
    </div>
  );
};
