import { useState } from "react";

const WIDGETS = [
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
    <div>
      <h1>Configuration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="widgets">Choose a widget:</label>
        <fieldset>
          <legend>Choose your interests</legend>
          {WIDGETS.map((widget) => (
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
