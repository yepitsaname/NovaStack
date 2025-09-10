import { useState } from "react";
import "../../css/forms.css";

const dashboardWidgets = [
  "systemHealth",
  "pendingTasks",
  "currentTasks",
  "recentActivity",
  "realTimeEvents",
  "sycapsTrends",
  "systemAvailability",
  "taskCompletionAnalytics",
];

const systemWidgets = [
  "systemHealth",
  "pendingTasks",
  "currentTasks",
  "recentActivity",
  "realTimeEvents",
  "sycapsTrends",
  "systemAvailability",
  "taskCompletionAnalytics",
];

const tasksWidgets = [
  "systemHealth",
  "pendingTasks",
  "currentTasks",
  "recentActivity",
  "realTimeEvents",
  "sycapsTrends",
  "systemAvailability",
  "taskCompletionAnalytics",
];

const reportsWidgets = [
  "systemHealth",
  "pendingTasks",
  "currentTasks",
  "recentActivity",
  "realTimeEvents",
  "sycapsTrends",
  "systemAvailability",
  "taskCompletionAnalytics",
];

export default function Configuration() {
  const [selectedWidget, setSelectedWidget] = useState("");
  const [widgetList, setWidgetList] = useState([]);

  const handleCheckbox = (e) => {
    const value = e.target.value;
    setSelectedWidget((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((w) => w !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedWidget && !widgetList.includes(selectedWidget)) {
      setWidgetList([...widgetList, selectedWidget]);
    }
  };

  const handleClear = () => {
    setWidgetList([]);
  };

  console.log(widgetList.join());

  return (
    <div className="">
      <h1>Configuration</h1>

      <form onSubmit={handleSubmit} className="dashboard">
        <label htmlFor="widgets">Dashboard Config:</label>
        <br />
        <label for="toggle-form">Show/Hide Form</label>
        <div className="collapsible">
          <fieldset>
            <legend>Choose your widgets</legend>
            {dashboardWidgets.map((widget) => (
              <div key={widget}>
                <input
                  type="checkbox"
                  id={widget}
                  name="interest"
                  value={widget}
                  checked={selectedWidget.includes(widget)}
                  onChange={handleCheckbox}
                />
                <label htmlFor={widget}>{widget}</label>
              </div>
            ))}
            <button type="submit">Add Widgets</button>
            <button type="button" onClick={handleClear}>
              Clear All
            </button>
          </fieldset>
        </div>
      </form>

      <form onSubmit={handleSubmit} className="dashboard">
        <label htmlFor="widgets">System Config:</label>
        <fieldset>
          <legend>Choose your widgets</legend>
          {systemWidgets.map((widget) => (
            <div key={widget}>
              <input
                type="checkbox"
                id={widget}
                name="interest"
                value={widget}
                checked={selectedWidget.includes(widget)}
                onChange={handleCheckbox}
              />
              <label htmlFor={widget}>{widget}</label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Tasks Config:</button>
        <button type="button" onClick={handleClear}>
          Clear All
        </button>
      </form>

      <form onSubmit={handleSubmit} className="dashboard">
        <label htmlFor="widgets">Reports Config:</label>
        <fieldset>
          <legend>Choose your widgets</legend>
          {tasksWidgets.map((widget) => (
            <div key={widget}>
              <input
                type="checkbox"
                id={widget}
                name="interest"
                value={widget}
                checked={selectedWidget.includes(widget)}
                onChange={handleCheckbox}
              />
              <label htmlFor={widget}>{widget}</label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Add Widgets</button>
        <button type="button" onClick={handleClear}>
          Clear All
        </button>
      </form>

      <form onSubmit={handleSubmit} className="dashboard">
        <label htmlFor="widgets">Choose a widget:</label>
        <fieldset>
          <legend>Choose your widgets</legend>
          {reportsWidgets.map((widget) => (
            <div key={widget}>
              <input
                type="checkbox"
                id={widget}
                name="interest"
                value={widget}
                checked={selectedWidget.includes(widget)}
                onChange={handleCheckbox}
              />
              <label htmlFor={widget}>{widget}</label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Add Widgets</button>
        <button type="button" onClick={handleClear}>
          Clear All
        </button>
      </form>
    </div>
  );
}
