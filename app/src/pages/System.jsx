import { Card, CardContent, Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect, useContext } from "react";

import AppContext from "../AppContext";
import { Navigate } from "react-router-dom";


export default function System() {
  const [systems, setSystems] = useState([]);
  const { token, user, profile } = useContext(AppContext);

  if (!token || !user || !profile) return <Navigate to="/login" />
  const colorMap = {
    Healthy: "green",
    Warning: "yellow",
    Critical: "red",
    Maintenance: "white",
    Special_Case: "magenta",
    Offline: "black"
  };

  useEffect(() => {
    fetch("http://localhost:3000/system/status", {
      method: "GET",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) => setSystems(res))
      .catch((err) => console.log(err));
  }, [token]);

  const getStopLight = (status) => {
    if (status == "Healthy") return "Healthy";
    if (status == "Warning") return "Warning";
    if (status == "Critical") return "Critical";
    if (status == "Maintenance") return "Maintenance";
    if (status == "Special_Case") return "Special_Case";
    return "Offline";
  };

  const ColorBlock = ({ status }) => (
    <Box
      sx={{
        width: 80,
        height: 80,
        bgcolor: colorMap[status],
        border: "2px solid #333",
        borderRadius: 2,
        mx: "auto"
      }}
    />
  );

  return (
    <>
      <Box sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ mb: 3, p: 2, backgroundColor: "var(--main-comp-mask)"}}>
          <CardContent>
            <Table>
              <TableHead>
              <Typography variant="h4">OPSCAP</Typography>
                <TableRow>
                  <TableCell />
                  {systems.map((sys) => (
                    <TableCell key={sys.system_id} align="center" sx={{ verticalAlign: "middle" }}>
                      <Typography variant="h6">StarFall: {sys.system_name}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      OPSCAP
                    </Typography>
                  </TableCell>
                  {systems.map((sys) => (
                    <TableCell key={sys.system_id + "-opscap"} align="center">
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <ColorBlock
                          status={getStopLight(sys.op_capabilities_available)}
                        />
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>



      <Box sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ mb: 3, p: 2, backgroundColor: "var(--main-comp-mask)" }}>
          <CardContent>
            <Table>
              <TableHead>
              <Typography variant="h4">SYSCAP</Typography>
                <TableRow>
                  <TableCell />
                  {systems.map((sys) => (
                    <TableCell key={sys.system_id} align="center" sx={{ verticalAlign: "middle" }}>
                      <Typography variant="h6">StarFall: {sys.system_name}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      SYSCAP
                    </Typography>
                  </TableCell>
                  {systems.map((sys) => (
                    <TableCell key={sys.system_id + "-syscap"} align="center">
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <ColorBlock status={getStopLight(sys.capabilities_available)} />
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}




//add clickability for the colorblocks to display number of reports and criticality
//details, date-time, reason, severity, system name
//move OPSCAP and SYSCAP to top of the Components

//button with a form to change the name of the system type/make new system dd an over