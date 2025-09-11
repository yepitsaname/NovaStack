import AppContext from "../AppContext";
import { GetTaskById } from "../../utils/utils";
import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ArchievedTask } from "../../utils/utils";

export default function TaskItem() {
  const { token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tasks = await GetTaskById(id, token);
      setTaskData(tasks);
    })();
  }, []);

  async function handleDelete(data) {
    //console.log(data);
    const deleteTasks = await ArchievedTask(token, data[0]);
    console.log(deleteTasks);
    navigate("/dashboard");
  }

  if (!taskData) return <div> Loading...</div>;

  // let tId;
  // console.log(taskData);
  // taskData.map((d) => {
  //   tId = d.task_id;
  //   return tId;
  // });

  // console.log(tId);

  return (
    <div>
      <button>Edit</button>
      <button onClick={() => handleDelete(taskData)}>Delete</button>

      {taskData.map((d) => (
        <div key={d.task_id}>
          <h3>Task: {d.title}</h3>
          <p>Description: {d.description}</p>
          <h4>Mission: {d.mission_id}</h4>
          <h4>Status: {d.status}</h4>
        </div>
      ))}
    </div>
  );
}
