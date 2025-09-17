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
    <div className="dashboard">
      <Box className="form table" mb={2} p={2} border={0.5} borderRadius={5} borderColor="#edf1f5ff">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="reports table" className="report-table">
            <TableHead className="report-table header">
              <TableRow className="report-table row">
                <StyledTableCell align="center" className="report-table style-head">Report ID</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">User ID</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">System ID</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Title</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Classification</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Opscap</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Syscap</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Short Description</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Start</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Stop</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Impact</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Fix Action</StyledTableCell>
                <StyledTableCell align="center" className="report-table style-head">Cause</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className="report-table body">
              {reportData.map((row) => (
                <StyledTableRow
                  key={row.report_id}
                  onClick={() => navigate(`/reports/${row.report_id}`,
                    { state: { formState: "view", report: row } }
                  )}
                  sx={{ cursor: "pointer" }}
                  className="report-table style-row"
                >
                  <StyledTableCell align="center" className="report-table style-cell">{row.report_id}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.user_id}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.system}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.title}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.classification}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.opscap}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.syscap}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.short_description}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">
                    {new Date(row.start).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">
                    {new Date(row.stop).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.impact}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.fix_action}</StyledTableCell>
                  <StyledTableCell align="center" className="report-table style-cell">{row.cause}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}