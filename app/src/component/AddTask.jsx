import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    mission_id: "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      due_date: dayjs(e.target.value),
    };
    console.log(dataToSend);
    const add = await AddTask(token, dataToSend);
    setForm({
      title: "",
      description: "",
      status: "",
      mission_id: "",
      due_date: dayjs(),
      assignee: "",
    });
    navigate("/taskslist");
  };

  return (
       <div style={{ margin: "40px", padding: "8px" }}>
      <form onSubmit={handleFormSubmit}>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="title" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
            required
          />
        </div>


        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="mission_id" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Mission
          </label>
          <select
            id="mission_id"
            name="mission_id"
            value={form.mission_id}
            onChange={handleInputChange}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
            required
          >
            <option value="">Select Mission</option>
            {mission.map((elem) => (
              <option key={elem.mission_id} value={elem.mission_id}>
                {elem.mission_name}
              </option>
            ))}
          </select>
        </div>

  
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="description" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
            required
          />
        </div>

 
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="status" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
            required
          >
            <option value="">Select Status</option>
            {status.map((elem) => (
              <option key={elem.status_id} value={elem.status_id}>
                {elem.status}
              </option>
            ))}
          </select>
        </div>


        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="due_date" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Due Date/Time
          </label>
          <input
            type="datetime-local"
            id="due_date"
            name="due_date"
            value={form.due_date.format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setForm((f) => ({ ...f, due_date: dayjs(e.target.value) }))}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
          />
        </div>

        {/* Assignee Select */}
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="assignee" style={{ color: "#A855F7", display: "block", fontWeight: "bold" }}>
            Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleInputChange}
            style={{ width: "100%", color: "#22C55E", padding: "8px" }}
            required
          >
            <option value="">Select Assignee</option>
            {userList.map((elem) => (
              <option key={elem.user_id} value={elem.user_id}>
                {elem.username}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ width: "100%", backgroundColor: "#A855F7", color: "#fff", padding: "12px", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
