import React, { useState, useEffect } from "react";
import "./Category.css";
import { FiPlus, FiTrash } from "react-icons/fi";
import DashboardButton from "../DashboardButton/DashboardButton";
import Sidebar from "../SideBar/SideBar";
import AddBar from "../AddBar/AddBar";

const Category = ({
  isAddbarOpen,
  setAddbarOpen,
  data,
  setData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [tempSelectedWidgets, setTempSelectedWidgets] = useState([]);

  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen || isAddbarOpen ? "hidden" : "auto";
  }, [isSidebarOpen, isAddbarOpen]);

  const handleDeleteWidget = (widgetName) => {
    setSelectedWidgets((prev) => prev.filter((w) => w !== widgetName));
    setTempSelectedWidgets((prev) => prev.filter((w) => w !== widgetName));
  };

  const toggleWidgetSelection = (widgetName) => {
    setTempSelectedWidgets((prev) =>
      prev.includes(widgetName)
        ? prev.filter((w) => w !== widgetName)
        : [...prev, widgetName]
    );
  };

  const confirmSelection = () => {
    setSelectedWidgets(tempSelectedWidgets);
    setSidebarOpen(false);
    setAddbarOpen(false);
  };

  const cancelSelection = () => {
    setTempSelectedWidgets([]);
    setSidebarOpen(false);
  };

  const renderCards = (categoryName, widgets) => {
    const filteredWidgets = widgets.filter((widget) =>
      selectedWidgets.includes(widget.WidgetName)
    );

    return (
      <div>
        <h2 className="categoryTitle">{categoryName}</h2>
        <div className="cardRow">
          {filteredWidgets.map((widget, index) => (
            <div key={index} className="card">
              <h3>{widget.WidgetName}</h3>
              <FiTrash
                className="deleteIcon"
                onClick={() => handleDeleteWidget(widget.WidgetName)}
              />
              <p>{widget.WidgetText}</p>
            </div>
          ))}
          <div
            className="card addWidget addBtn"
            onClick={() => setSidebarOpen(true)}
          >
            <DashboardButton className="addWidget">
              Add Widget
              <FiPlus className="icon" />
            </DashboardButton>
          </div>
        </div>
      </div>
    );
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categoryPage">
      <div className="cardContainer">
        {data.map((category, index) => (
          <div key={index}>
            {renderCards(category.CategoryName, category.WidgetList)}
          </div>
        ))}
      </div>

      {isSidebarOpen && (
        <Sidebar
          data={data}
          isSidebarOpen={isSidebarOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          tempSelectedWidgets={tempSelectedWidgets}
          toggleWidgetSelection={toggleWidgetSelection}
          confirmSelection={confirmSelection}
          cancelSelection={cancelSelection}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      {isAddbarOpen && (
        <AddBar
          isAddbarOpen={isAddbarOpen}
          setAddbarOpen={setAddbarOpen}
          setData={setData}
        />
      )}
    </div>
  );
};

export default Category;
