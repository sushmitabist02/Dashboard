import React from "react";
import { FiX } from "react-icons/fi";

const Sidebar = ({
  data,
  isSidebarOpen,
  selectedCategory,
  setSelectedCategory,
  tempSelectedWidgets,
  toggleWidgetSelection,
  confirmSelection,
  cancelSelection,
  setSidebarOpen,
}) => {
  const renderSidebarNavigation = () => (
    <div className="sidebarNavigation">
      {data.map((category) => (
        <button
          key={category.CategoryName}
          className={`categoryButton ${
            selectedCategory === category.CategoryName ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(category.CategoryName)}
        >
          {category.CategoryName.split(" ")[0]}
        </button>
      ))}
    </div>
  );

  const renderSidebarContent = () => {
    const selectedCategoryData = data.find(
      (category) => category.CategoryName === selectedCategory
    );
    if (!selectedCategoryData) return null;

    return (
      <div className="sidebarContent">
        {selectedCategoryData.WidgetList.map((widget) => (
          <div key={widget.WidgetName} className="sidebarItem">
            <input
              type="checkbox"
              checked={tempSelectedWidgets.includes(widget.WidgetName)}
              onChange={() => toggleWidgetSelection(widget.WidgetName)}
            />
            {widget.WidgetName}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebarHeader">
        <h2>Add Widget</h2>
        <FiX className="closeIcon" onClick={() => setSidebarOpen(false)} />
      </div>
      {renderSidebarNavigation()}
      {renderSidebarContent()}
      <div className="sidebarButtons">
        <button className="cancelButton" onClick={cancelSelection}>
          Cancel
        </button>
        <button className="confirmButton" onClick={confirmSelection}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
