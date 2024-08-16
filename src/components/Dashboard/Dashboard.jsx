import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiPlus, FiInfo, FiClock } from "react-icons/fi";
import "./Dashboard.css";
import Category from "../Category/Category";
import DashboardButton from "../DashboardButton/DashboardButton";
import Navbar from "../Navbar/Navbar";
import Data from "../../assets/data.json";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [isAddbarOpen, setAddbarOpen] = useState(false);
  const [filteredWidgets, setFilteredWidgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleAddWidgetClick = () => {
    setAddbarOpen(true);
  };

  const handleSearch = () => {
    if (!data || query.length === 0) {
      setFilteredWidgets([]);
      return;
    }

    const filtered = [];
    data.forEach((category) => {
      category.WidgetList?.forEach((widget) => {
        if (widget.WidgetName.toLowerCase().includes(query.toLowerCase())) {
          const existingCategory = filtered.find(
            (item) => item.CategoryName === category.CategoryName
          );

          if (
            existingCategory &&
            selectedCategory.includes(existingCategory.CategoryName)
          ) {
            existingCategory.WidgetList.push({ ...widget });
          } else {
            if (selectedCategory.includes(category.CategoryName)) {
              const newWidgetObject = {
                CategoryName: category.CategoryName,
                WidgetList: [{ ...widget }],
              };
              filtered.push(newWidgetObject);
            }
          }
        }
      });
    });
    setFilteredWidgets(filtered);
  };

  useEffect(() => {
    setData(Data);
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredWidgets([]);
    } else {
      handleSearch();
    }
  }, [query]);

  return (
    <>
      <Navbar data={data} query={query} setQuery={setQuery} />

      <div className="dashboardContainer">
        <div className="dashboardTitle">CNAPP Dashboard</div>

        <div className="dashboardControls">
          <DashboardButton className="addWidget" onClick={handleAddWidgetClick}>
            Add Category
            <FiPlus className="icon" />
          </DashboardButton>

          <DashboardButton className="refresh" title="Refresh">
            <FiRefreshCw className="icon" />
          </DashboardButton>

          <DashboardButton className="info" title="Info">
            <FiInfo className="icon" />
          </DashboardButton>

          <div className="timeTable">
            <div className="tableRow">
              <DashboardButton className="timeBtn" title="Time">
                <FiClock className="icon" />
                <span className="seperator">|</span>
                <div className="dropdownContainer">
                  <select className="dropdownMenu">
                    <option value="last2days">Last 2 Days</option>
                    <option value="last7days">Last 7 Days</option>
                    <option value="last30days">Last 30 Days</option>
                  </select>
                </div>
              </DashboardButton>
            </div>
          </div>
        </div>
      </div>

      <Category
        isAddbarOpen={isAddbarOpen}
        setAddbarOpen={setAddbarOpen}
        data={filteredWidgets.length === 0 ? data : filteredWidgets}
        setData={setData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
};

export default Dashboard;
