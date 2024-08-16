import React from "react";
import { FiBell } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="navbar">
      <div className="routing">
        <a href="/">Home</a> → <span>Dashboard</span>
      </div>

      <div className="sectionContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="notificationIcon">
          <FiBell />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
