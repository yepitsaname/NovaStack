import { useState } from "react";
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
  "systemHealth",
  "pendingTasks",
  "currentTasks",
  "recentActivity",
  "realTimeEvents",
  "sycapsTrends",
  "systemAvailability",
  "taskCompletionAnalytics",
];

const systemWidgets = [...dashboardWidgets];
const tasksWidgets = [...dashboardWidgets];
const reportsWidgets = [...dashboardWidgets];

function WidgetForm({ label, widgetList, setWidgetList }) {
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
    <Box mb={2} p={2} border={0.5} borderRadius={5} borderColor="#2c74cb">
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 1, color: "#a1d4d4" }}>
            {label}
          </FormLabel>

          <FormGroup row>
            {widgetList.map((widget) => (
              <FormControlLabel
                key={widget}
                control={
                  <Checkbox
                    checked={selected.includes(widget)}
                    onChange={handleChange}
                    value={widget}
                    color="primary"
                  />
                }
                label={widget}
              />
            ))}
          </FormGroup>

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
            >
              Submit
            </Button>

            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </FormControl>
      </form>

      {submitted.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2">
            <b>Submitted:</b> {submitted.join(", ")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
export default function Configuration() {
  const [dashboardList, setDashboardList] = useState([]);
  const [systemList, setSystemList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [reportList, setReportList] = useState([]);

  console.log(dashboardList, systemList, tasksList, reportList);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 0 }}>
      <Typography variant="h4" gutterBottom>
        Configuration
      </Typography>
      <Divider />

      <WidgetForm
        label="Dashboard Config"
        widgetList={dashboardWidgets}
        setWidgetList={setDashboardList}
      />

      <WidgetForm
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
      />
    </Box>
  );
}
