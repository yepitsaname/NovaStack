import { useContext, useEffect, useState } from "react";
import { useParams, } from "react-router";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { GetTaskById, EditTask, ArchievedTask, GetAllMissions, GetAllStatus, GetAllUsers } from "../../utils/utils";
import AppContext from "../AppContext";

export default function TaskItem() {
  
  const { token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);
  const [edit, setEdit] = useState(false)
  const [mission, setMission] = useState([]);
  const [status, setStatus] = useState([]);
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(dayjs())
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tasks = await GetTaskById(id, token);
      setTaskData(tasks);
    })();
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
  }, []);


  async function handleDelete(data) {
    const deleteTasks = await ArchievedTask(token, data[0]);
    navigate("/dashboard");
  }

  async function applyEdit(formData) {
    await EditTask(token, id, data);
    let data = {
      title: formData.get("title"),
      description: formData.get("description"),
      mission_id: formData.get("mission_id"),
      status: formData.get("status"),
      due_date: dayjs(),
      assignee: formData.get("assignee")
    }
    console.log(data)
    navigate("/taskslist")
    setEdit(false);
    
  }
  function enableEdit() {
    setEdit(true)
  }
  if (!taskData[0]) return <div> Loading...</div>;

  console.log(taskData);

  return (
    <div>
      <button type="button" onClick={enableEdit}>
        Edit
      </button>
      <button type="button" onClick={() => handleDelete(taskData)}>
        Delete
      </button>
      <form className="form component" onSubmit={applyEdit}>
        <label htmlFor="title">Task Name:</label>
        <input
          type="text"
          name="title"
          id="title"
          disabled={!edit}
          defaultValue={taskData[0].title}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          disabled={!edit}
          defaultValue={taskData[0].description}
        />

        <label htmlFor="mission_id">Mission:</label>
        <select
          name="mission_id"
          id="mission_id"
          defaultValue={taskData[0].mission_id}
          disabled={!edit}
        >
          {mission.map((elem) => (
            <option key={elem.mission_id} value={elem.mission_id}>
              {elem.mission_name}
            </option>
          ))}
        </select>

        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          defaultValue={taskData[0].status_id}
          disabled={!edit}
        >
          {status.map((elem) => (
            <option key={elem.status_id} value={elem.status_id}>
              {elem.status}
            </option>
          ))}
        </select>

        <label htmlFor="due_date">Due Date/Time:</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          disabled={!edit}
          value={taskData.due_date}
          onChange={(e) => setDate((f) => ({due_date: dayjs(e.target.value) }))}
        />

        <label htmlFor="assignee">Assignee:</label>
        <select
          name="assignee"
          id="assignee"
          defaultValue={taskData[0].assignee_id}
          disabled={!edit}
        >
          {userList.map((elem) => (
            <option key={elem.user_id} value={elem.user_id}>
              {elem.username}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!edit}
          hidden={!edit}
        >
          Save
        </button>
      </form>
    </div>
  );
}
