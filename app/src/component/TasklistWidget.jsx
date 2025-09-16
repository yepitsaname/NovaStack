import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { GetAllTasks } from "../../utils/utils";
import "../../css/tables.css";

import dayjs from "dayjs";


export default function TaskListWidget({
  isDashboard = false,
  isCurrent = false,
}) {
  
const [taskListData, setTaskListData] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const refetch = async () => {
    const tasks = async () => {
      let temp = await GetAllTasks(token);
      setTaskListData(temp);
    };
    tasks();
  }
  useEffect(() => {
    refetch()
  }, []);

  if (!taskListData.length) return <div>Loading</div>;

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('MM/DD/YYYY') ;
  };

  return (
    <div className="dashbaord">
      <fieldset>
          <div>
            {!isDashboard && (
              <button onClick={() => navigate("/taskslist/add")}>
                Add
              </button>
            )}
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th >Tasks</th>
                  <th >Mission</th>
                  <th >Status</th>
                  <th >Date</th>
                  <th >Assignee</th>
                </tr>
              </thead>
              <tbody>
                {taskListData.map((row) => (
                  <tr
                  key={row.task_id}
                  onClick={() => navigate(`/taskslist/${row.task_id}`)}>
                    <td >{row.title}</td>
                    <td >{row.mission}</td>
                    <td >{row.status}</td>
                    <td >{formatDate(row.due_date)}</td>
                    <td >{row.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </fieldset>
    </div>
  );
}


