import AppContext from "../AppContext";
import { GetTaskById } from "../../utils/utils";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

export default function TaskItem() {
  const { token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const tasks = await GetTaskById(id, token);
      setTaskData(tasks);
    })();
  }, []);

  if (!taskData) return <div> Loading...</div>;

  return (
    <div>
      <button>Edit</button>
      <button>Delete</button>

      {taskData.map((d) => (
        <div>
          <h3>Task: {d.title}</h3>
          <p>Description: {d.description}</p>
          <h4>Mision: {d.mission_id}</h4>
          <h4>Status: {d.status}</h4>
        </div>
      ))}
    </div>
  );
}
