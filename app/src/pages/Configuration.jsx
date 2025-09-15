import { useState } from "react";
import AppContext from "../AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const dashboardWidgets = [
  "OPSCAP",
  "SYSCAP",
  "Task List",
  "Report List"
];

// const systemWidgets = [...dashboardWidgets];
// const tasksWidgets = [...dashboardWidgets];
// const reportsWidgets = [...dashboardWidgets];

function WidgetForm({ label, widgetList, setWidgetList }) {
  const { token, user, profile } = useContext(AppContext);
  if (!token || !user || !profile) return <Navigate to="/login" />

  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState([]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((w) => w !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(selected);
    setWidgetList(selected);
  };

  const handleClear = () => {
    setSelected([]);
    setSubmitted([]);
    setWidgetList(selected);
  };

  return (
<div>
  <form onSubmit={handleSubmit}>
    <fieldset >
      <legend >
        {label}
      </legend>
      <div >
        {widgetList.map((widget) => (
          <label key={widget} >
            <input
              type="checkbox"
              checked={selected.includes(widget)}
              onChange={handleChange}
              value={widget}
              style={{ marginRight: '5px' }}
            />
            {widget}
          </label>
        ))}
      </div>
      <div >
        <button
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </fieldset>
  </form>
  {submitted.length > 0 && (
    <div >
      <span>
        <b>Submitted:</b> {submitted.join(", ")}
      </span>
    </div>
  )}
</div>
  );
}
export default function Configuration() {
  const [dashboardList, setDashboardList] = useState([]);
  // const [systemList, setSystemList] = useState([]);
  // const [tasksList, setTasksList] = useState([]);
  // const [reportList, setReportList] = useState([]);

  // console.log(dashboardList, systemList, tasksList, reportList);

  return (
<div >
  <h4 >
    Configuration
  </h4>

  <hr />

  <WidgetForm
    label="Dashboard Config"
    widgetList={dashboardWidgets}
    setWidgetList={setDashboardList}
  />

  {/* <WidgetForm
    label="System Config"
    widgetList={systemWidgets}
    setWidgetList={setSystemList}
  />

  <WidgetForm
    label="Tasks Config"
    widgetList={tasksWidgets}
    setWidgetList={setTasksList}
  />

  <WidgetForm
    label="Reports Config"
    widgetList={reportsWidgets}
    setWidgetList={setReportList}
  /> */}
</div>

  );
}
