import { Card, CardContent, Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";


export default function System() {
  const [systems, setSystems] = useState([]);
  const { token } = useContext(AppContext);

  const colorMap = {
    Healthy: "green",
    Warning: "yellow",
    Critical: "red",
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
    if (status > 75) return "Healthy";
    if (status >= 50) return "Warning";
    return "Critical";
  };

  const ColorBlock = ({ status }) => (
    <Box
      sx={{
        width: 30,
        height: 30,
        bgcolor: colorMap[status],
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    />
  );

  return (
    <Box sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {systems.map((sys) => (
                  <TableCell key={sys.system_id} align="center" sx={{ verticalAlign: "middle" }}>
                    <Typography variant="h6">HoneyPack: {sys.system_name}</Typography>
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
  );
}



//separate opscaps and syscaps into separate tables and a number to see open reports for opcaps
//white color for maintenance
//syscaps needs more color options
//add clickability for the colorblocks to display number of reports and criticality
//make blocks larger
//details, date-time, reason, criticality, system name