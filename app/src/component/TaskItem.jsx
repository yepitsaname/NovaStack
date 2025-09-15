import AppContext from "../AppContext";
import { GetTaskById, EditTask, ArchievedTask, GetAllMissions, GetAllStatus, GetAllUsers } from "../../utils/utils";
import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function TaskItem() {
  const { token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false)
  const [mission, setMission] = useState([]);
  const [status, setStatus] = useState([]);
  const [userList, setUserList] = useState([]);
  const [date, setDate] = useState(dayjs())

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
    //console.log(data);
    const deleteTasks = await ArchievedTask(token, data[0]);
    console.log(deleteTasks);
    navigate("/dashboard");
  }
  const handleDateChange = (dateTime) => {
    setDate(dayjs(dateTime).toISOString());
  };

  async function applyEdit(formData) {
    let data = {
      title: formData.get("title"),
      description: formData.get("description"),
      mission_id: formData.get("mission_id"),
      status: formData.get("status"),
      due_date: date,
      assignee: formData.get("assignee")
    }
    console.log(data)
    await EditTask(token, id, data);
    setEdit(false);
  }
  function enableEdit() {
    setEdit(true)
  }
  if (!taskData[0]) return <div> Loading...</div>;

  // let tId;
  // console.log(taskData);
  // taskData.map((d) => {
  //   tId = d.task_id;
  //   return tId;
  // });

  console.log(taskData);

  return (
    <div>
      <button onClick={() => enableEdit()}>Edit</button>
      <button onClick={() => handleDelete(taskData)}>Delete</button>
      <form className="form component" action={applyEdit}>
        <label htmlFor="">Task Name:</label>
        <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].title} />
        <label htmlFor="">Description</label>
        <input type="text" disabled={!edit} name="description" defaultValue={taskData[0].description} />
        <label htmlFor="">Mission:</label>
        <select name="mission_id" defaultValue={taskData[0].mission_id} disabled={!edit}>
          {mission.map((elem) => {
            return (<option value={elem.mission_id}>{elem.mission_name}</option>)
          })}
        </select>
        {/* <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].mission} /> */}
        <label htmlFor="">Status:</label>
        <select name="status" defaultValue={taskData[0].status_id} disabled={!edit}>
          {status.map((elem) => {
            return (<option value={elem.status_id}>{elem.status}</option>)
          })}
        </select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              name="due_date"
              label={"Due Date/Time"}
              value={dayjs(taskData[0].due_date)}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].status} /> */}
        <label htmlFor="">Assignee:</label>
        <select name="assignee" defaultValue={taskData[0].assignee_id} disabled={!edit}>
          {userList.map((elem) => {
            return (<option value={elem.user_id}>{elem.username}</option>)
          })}
        </select>
        {/* <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].assignee} /> */}
        <button type="submit" disabled={!edit} hidden={!edit}>Save</button>
      </form>
      {/* <h1>{taskData[0].title}</h1> */}
      {/* {taskData.map((d) => (
        <div key={d.task_id}>
          <h3>Task: {d.title}</h3>
          <p>Description: {d.description}</p>
          <h4>Mission: {d.mission}</h4>
          <h4>Status: {d.status}</h4>
          <h4>Assignee: {d.assignee}</h4>
        </div>
      ))} */}
    </div>
  );
}
