import { useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";

import AppContext from "../AppContext";
import { AddTask } from "../../utils/utils";

import dayjs from "dayjs";

export default function AddTasks() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    mission: "",
    due_date: dayjs(),
  });

  const handleInputChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (dateTime) => {
    setForm((f) => ({ ...f, due_date: dateTime }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      due_date: form.due_date.toISOString(),
    };
    console.log(dataToSend);
    const add = await AddTask(token, dataToSend);
    setForm({
      title: "",
      description: "",
      status: "",
      mission: "",
      due_date: dayjs(),
    });
    navigate("/tasks");
  };

  return (
    <Box sx={{ margin: 10, padding: 2 }}>
      <form onSubmit={handleFormSubmit}>
        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{ sx: { color: "#A855F7" } }}
        />
        <TextField
          name="mission"
          label="Mission"
          value={form.mission}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{
            sx: { color: "#A855F7" },
          }}
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{
            sx: {
              color: "#A855F7",
            },
          }}
        />
        <TextField
          name="status"
          label="Status"
          value={form.status}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{
            sx: {
              color: "#A855F7",
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label={"Due Date/Time"}
              value={form.due_date}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}
