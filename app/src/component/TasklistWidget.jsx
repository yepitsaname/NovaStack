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
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { GetAllTasks } from "../../utils/utils";
import { AddTask } from "../../utils/utils";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function TaskListWidget({
  isDashboard = false,
  isCurrent = false,
}) {
  const [taskListData, setTaskListData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    due_date: "",
  });
  const { token } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tasks = async () => {
      let temp = await GetAllTasks(token);
      setTaskListData(temp);
    };
    tasks();
  }, []);

  const handleInputChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await AddTask(token, form);
    setOpen(false);
    setForm({
      title: "",
      description: "",
      status: "",
      due_date: "",
      mission_id: "",
    });
    const updatedTasks = await GetAllTasks(token);
    setTaskListData(updatedTasks);
  };

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  if (!taskListData.length) return <div>Loading</div>;

  return (
    <>
      {isDashboard ? (
        <></>
      ) : (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* <TextField
              name="mission"
              label="mission"
              value={mission}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            /> */}
            <TextField
              name="description"
              label="description"
              value={form.description}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* <TextField
              name="status"
              label="status"
              value={form.status}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            /> */}
            <TextField
              name="due_date"
              label="due_date"
              value={form.due_date}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
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
              {taskListData.map((row) => (
                <StyledTableRow
                  key={row.task_id}
                  onClick={() => navigate(`/taskslist/${row.task_id}`)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.mission}
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
