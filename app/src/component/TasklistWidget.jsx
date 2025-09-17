import { useEffect, useState, useContext, useMemo } from "react";
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
  const { token, profile } = useContext(AppContext);
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

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('MM/DD/YYYY');
  };

  const assigneeTaskName = profile?.name?.trim()?.toLowerCase();
  const assigneeTaskId = profile?.id;

  const filterTask = useMemo(() => {
    if(!isDashboard) return taskListData;
    if(assigneeTaskId != null && taskListData?.[0]?.assignee_id != null){
      return taskListData.filter((task) => task.assignee_id === assigneeTaskId)
    }
    if (assigneeTaskName) {
      return taskListData.filter((t) => String(t.assignee || "")
        .trim()
        .toLowerCase() === assigneeTaskName);
    }
  },[isDashboard, taskListData, assigneeTaskId])

  if (!taskListData.length) return <div>Loading</div>;

  return (
    <div className="dashbaord">
          <div>
            {!isDashboard && (
              <button onClick={() => navigate("/taskslist/add")}>
                Add
              </button>
            )}
          </div>
          <div className="table-container">
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
              <tbody >
                {taskListData.map((row) => (
                  <tr


                  key={row.task_id}
                  style={{ cursor: "pointer" }}
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
     
    </div>
  );
}


