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
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// if (!taskListData.length) return <div>Loading</div>;
export default function SystemReport() {
    const { token, user, profile, systems, setSystems } = useContext(AppContext);
    const [reportData, setReportData] = useState([]);
    const navigate = useNavigate();


    const refetch = async () => {
        const tasks = async () => {
            let temp = await GetReportBySystem(token);
            setReportData(temp);
            console.log(temp)
        };
        tasks();
    }
    useEffect(() => {
        refetch()
    }, []);



    return (
        <div>SystemReport</div>
    )
}


//all reports is in reports page
//system report shows all reports for specific system
