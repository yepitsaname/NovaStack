import { useState, useContext, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";
//import { SelectChangeEvent } from "@mui/material/Select";
import AppContext from "../AppContext";
import { AddTask, GetAllMissions, GetAllStatus, GetAllUsers } from "../../utils/utils";

import dayjs from "dayjs";

export default function AddTasks() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [mission, setMission] = useState([]);
  const [status, setStatus] = useState([]);
  const [userList, setUserList] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    mission: "",
    due_date: dayjs(),
    assignee: "",
  });

  useEffect(() => {
    const missions = async () => {
      let temp = await GetAllMissions(token);
      setMission(temp);
    };
    missions();

    const statuses = async () => {
      let temp = await GetAllStatus(token);
      setStatus(temp);
    };
    statuses();

    const users = async () => {
      let temp = await GetAllUsers(token);
      setUserList(temp);
    };
    users();
    console.log(userList)
  }, [])


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
        <Select
          name="mission"
          label="Mission"
          value={form.mission}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{
            sx: { color: "#A855F7" },
          }}
        >
          {mission.map((elem, key) => {
            return (
              <MenuItem value={key}>{elem.mission_name}</MenuItem>
            )
          })}

        </Select>

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
        <Select
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
        >
          {status.map((elem, key) => {
            return (
              <MenuItem value={key}>{elem.status}</MenuItem>
            )
          })}

        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label={"Due Date/Time"}
              value={form.due_date}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Select
          name="assignee"
          label="Assignee"
          value={form.assignee}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2, input: { color: "#22C55E" } }}
          InputLabelProps={{
            sx: {
              color: "#A855F7",
            },
          }}
        >
          {userList.map((elem, key) => {
            return (
              <MenuItem value={key}>{elem.username}</MenuItem>
            )
          })}

        </Select>

        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}
