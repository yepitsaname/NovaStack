import React, { useEffect, useState, useContext } from "react";
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
  const [taskData, setTaskData] = useState([]);
  const [selected, setSelected] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    setSelected(row.id);
    navigate("/tasks/item");
  };

  useEffect(() => {
    (async () => {
      const tasks = await GetAllTasks(token);
      setTaskData(tasks);
    })();
  }, []);

  if (!taskData.length) return <div>Loading</div>;

  return (
    <>
      {isDashboard ? (
        <></>
      ) : (
        <div>
          <button>Add</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
      <Box mb={2} p={2} border={0.5} borderRadius={5} borderColor="#edf1f5ff">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Tasks</StyledTableCell>
                <StyledTableCell align="center">Mission</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((row) => (
                <StyledTableRow
                  key={row.tasks}
                  selected={selected === row.title}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.mission_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.due_date}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
