import { useEffect, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { GetAllTasks } from "../../utils/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
  return (
<div>
      {!isDashboard && (
        <button
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
          onClick={() => navigate("/taskslist/add")}
        >
          Add
        </button>
      )}

      <div
        style={{
          marginBottom: "16px",
          padding: "16px",
          border: "1px solid #edf1f5",
          borderRadius: "20px",
        }}
      >
        <table style={{ minWidth: 600, width: "100%", borderCollapse: "collapse" }}>
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
                onClick={() => navigate(`/taskslist/${row.task_id}`)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #edf1f5",
                }}
              >
                <td >{row.title}</td>
                <td >{row.mission}</td>
                <td >{row.status}</td>
                <td >{row.due_date}</td>
                <td >{row.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


