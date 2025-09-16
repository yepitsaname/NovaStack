import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { GetAllReports } from "../../utils/utils";

export default function Reports() {
  const { token, user, profile } = useContext(AppContext);
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  
  if (!token || !user || !profile) return <Navigate to="/login" />;

  const refetch = async () => {
    let temp = await GetAllReports(token);
    setReportData(temp);
    console.log(temp)
  };

  useEffect(() => {
    refetch();
  }, []);

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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box mb={2} p={2} border={0.5} borderRadius={5} borderColor="#edf1f5ff">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="reports table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Report ID</StyledTableCell>
              <StyledTableCell align="center">User ID</StyledTableCell>
              <StyledTableCell align="center">System ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Classification</StyledTableCell>
              <StyledTableCell align="center">Opscap</StyledTableCell>
              <StyledTableCell align="center">Syscap</StyledTableCell>
              <StyledTableCell align="center">Short Description</StyledTableCell>
              <StyledTableCell align="center">Long Description</StyledTableCell>
              <StyledTableCell align="center">Start</StyledTableCell>
              <StyledTableCell align="center">Stop</StyledTableCell>
              <StyledTableCell align="center">Impact</StyledTableCell>
              <StyledTableCell align="center">Fix Action</StyledTableCell>
              <StyledTableCell align="center">Cause</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((row) => (
              <StyledTableRow
                key={row.report_id}
                onClick={() => navigate(`/report/system/${row.system}`)}
                sx={{ cursor: "pointer" }}
              >
                <StyledTableCell align="center">{row.report_id}</StyledTableCell>
                <StyledTableCell align="center">{row.user_id}</StyledTableCell>
                <StyledTableCell align="center">{row.system}</StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.classification}</StyledTableCell>
                <StyledTableCell align="center">{row.opscap}</StyledTableCell>
                <StyledTableCell align="center">{row.syscap}</StyledTableCell>
                <StyledTableCell align="center">{row.short_description}</StyledTableCell>
                <StyledTableCell align="center">{row.long_description}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.start).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.stop).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">{row.impact}</StyledTableCell>
                <StyledTableCell align="center">{row.fix_action}</StyledTableCell>
                <StyledTableCell align="center">{row.cause}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
