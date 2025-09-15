import AppContext from "../AppContext";
import { GetTaskById, EditTask, ArchievedTask, AddTask } from "../../utils/utils";
import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

export default function TaskItem() {
  const { token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false)
  const [mission, setMission] = useState([]);
  const [status, setStatus] = useState([]);
  const [userList, setUserList] = useState([]);
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

  async function applyEdit(formData) {
    let data = {
      title: formData.get("title"),
      description: formData.get("description"),
      mission_id: formData.get("mission_id"),
      status: formData.get("status"),
      due_date: formData.get("due_date"),
      assignee: formData.get("assignee")
    }
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
        <label htmlFor=""></label>
        <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].title} />
        <label htmlFor=""></label>
        <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].title} />
        <label htmlFor=""></label>
        <input type="text" disabled={!edit} name="title" defaultValue={taskData[0].title} />
        <button type="submit" disabled={!edit}>Save</button>
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
