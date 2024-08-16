import React, { useState } from "react";
import "./AddCategory.css";

const AddCategory = ({ addData, setAddbarOpen }) => {
  const [widget, setWidget] = useState({
    CategoryName: "",
    WidgetList: {
      WidgetName: "",
      WidgetText: "",
    },
  });
  const cancelSelection = () => {
    setWidget([]);
    setAddbarOpen(false);
  };

  const handleWidgetData = (e) => {
    e.preventDefault();
    addData((prev) => {
      const newWidget = [
        {
          WidgetName: widget.WidgetList.WidgetName,
          WidgetText: widget.WidgetList.WidgetText,
        },
      ];

      const newCategory = {
        CategoryName: widget.CategoryName,
        ["WidgetList"]: newWidget,
      };
      return [...prev, newCategory];
    });

    setWidget({
      CategoryName: "",
      WidgetList: {
        WidgetName: "",
        WidgetText: "",
      },
    });
    setAddbarOpen(false);
  };

  return (
    <form className="addCategoryForm">
      <input
        type="text"
        placeholder="Category Name"
        name="category"
        value={widget.CategoryName}
        onChange={(e) =>
          setWidget((prev) => ({ ...prev, CategoryName: e.target.value }))
        }
        required
      />
      <input
        type="text"
        placeholder="Widget Name"
        name="widget"
        value={widget.WidgetList.WidgetName}
        onChange={(e) =>
          setWidget((prev) => ({
            ...prev,
            WidgetList: { ...prev.WidgetList, WidgetName: e.target.value },
          }))
        }
        required
      />
      <input
        type="text"
        placeholder="Widget Text"
        name="category"
        value={widget.WidgetList.WidgetText}
        onChange={(e) =>
          setWidget((prev) => ({
            ...prev,
            WidgetList: { ...prev.WidgetList, WidgetText: e.target.value },
          }))
        }
        required
      />
      <div className="buttons">
        <button className="cancelButton" onClick={cancelSelection}>
          Cancel
        </button>
        <button className="confirmButton" onClick={handleWidgetData}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
