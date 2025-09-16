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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { GetReportBySystem } from "../../utils/utils"; 



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

export default function SystemReport() {
    const [reportData, setReportData] = useState([]);
    const { token } = useContext(AppContext);
    const navigate = useNavigate();

    const refetch = async () => {
        let temp = await GetReportBySystem(token);
        setReportData(temp);
    };

    useEffect(() => {
        refetch();
    }, []);

    if (!reportData.length) return <div>Loading...</div>;
    if (!token || !user || !profile) return <Navigate to="/login" />

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Report</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportData.map((row, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell>{row.id}</StyledTableCell>
                            <StyledTableCell>{row.name}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}