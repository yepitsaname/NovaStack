import { Card, CardContent, Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, ButtonBase } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router"

import AppContext from "../AppContext";


export default function System() {
  const [systems, setSystems] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

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


const ColorBlock = ({ status, system }) => (
  <Box
    onClick={() => handleClick(system)}
    sx={{
      width: 80,
      height: 80,
      backgroundColor: colorMap[status],
      border: "2px solid #333",
      borderRadius: 2,
      mx: "auto",
      cursor: "pointer" 
    }}
  />
);

  const handleClick = (sys) => {
  if (sys.op_capabilities_available || sys.capabilities_available) {
    navigate('/reports'); 
  } else {
    alert("Could not find data");
  }
};

  return (
    <>
      <Box sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ mb: 3, p: 2, backgroundColor: "var(--main-comp-mask)" }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" align="center" fontWeight={"bold"}>OPSCAP</Typography>
                  </TableCell>
                </TableRow>
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
                  {systems.map((sys) => (
                    <TableCell key={sys.system_id + "-opscap"} align="center">
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <ColorBlock
                          status={getStopLight(sys.op_capabilities_available)}
                          system={sys}
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
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" align="center" fontWeight={"bold"}>SYSCAP</Typography>
                  </TableCell>
                </TableRow>
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
                        <ColorBlock status={getStopLight(sys.capabilities_available)}
                        system={sys} />
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
