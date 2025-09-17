import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import "../../css/forms.css";
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
    <div className="form component">
      <form onSubmit={handleFormSubmit} >
        <fieldset>
          <label htmlFor="title" >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            required
          />


          <label htmlFor="mission_id">
            Mission
          </label>
          <select
            id="mission_id"
            name="mission_id"
            value={form.mission_id}
            onChange={handleInputChange}

            required
          >
            <option value="">Select Mission</option>
            {mission.map((elem) => (
              <option key={elem.mission_id} value={elem.mission_id}>
                {elem.mission_name}
              </option>
            ))}
          </select>

          <label htmlFor="description" >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}

            required
          />

          <label htmlFor="status" >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            {status.map((elem) => (
              <option key={elem.status_id} value={elem.status_id}>
                {elem.status}
              </option>
            ))}
          </select>

          <label htmlFor="due_date" >
            Due Date/Time
          </label>
          <input
            type="datetime-local"
            id="due_date"
            name="due_date"
            value={form.due_date.format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setForm((f) => ({ ...f, due_date: dayjs(e.target.value) }))}
          />

          <label htmlFor="assignee">
            Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Assignee</option>
            {userList.map((elem) => (
              <option key={elem.user_id} value={elem.user_id}>
                {elem.username}
              </option>
            ))}
          </select>
          <button type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
