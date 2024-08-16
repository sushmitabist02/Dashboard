import React from "react";
import { FiX } from "react-icons/fi";
import AddCategory from "../AddCategory/AddCategory";

const AddBar = ({ isAddbarOpen, setAddbarOpen, setData }) => {
  return (
    <div className={`addbar ${isAddbarOpen ? "open" : ""}`}>
      <div className="addbarHeader">
        <h2 className="addCategoryHeading">Add Category</h2>
        <FiX className="closeIcon" onClick={() => setAddbarOpen(false)} />
      </div>
      <AddCategory addData={setData} setAddbarOpen={setAddbarOpen} />
    </div>
  );
};

export default AddBar;
