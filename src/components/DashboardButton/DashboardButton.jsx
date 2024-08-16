import React from "react";
import "./DashboardButton.css";

const DashboardButton = ({ title, onClick, children, className = "" }) => {
  return (
    <button
      className={`dashboard-button ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default DashboardButton;
