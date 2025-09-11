import { Card, CardContent, Typography, Box } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";

export default function system() {
  const [systems, setSystems] = useState([]);
  const { token } = useContext(AppContext);

  const colorMap = {
    Healthy: "green",
    Warning: "yellow",
    Critical: "red"
  };

  useEffect(() => {
    fetch('http://localhost:3000/system/status', {
      method: "GET",
      headers: { Authorization: token }
    })
      .then(data => data.json())
      .then(res => setSystems(res))
      .catch(err => console.log(err));
  }, [token]);

  const getStopLight = (value) => {
    if (value > 75) return "Healthy";
    if (value >= 50) return "Warning";
    return "Critical";
  };

  const StopLight = ({ status }) => {
    const lights = ["Critical", "Warning", "Healthy"];
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        {lights.map((light) => (
          <Box
            key={light}
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: status === light ? colorMap[light] : "gray",
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {systems.map((sys) => (
        <Card key={sys.system_id} sx={{ mb: 2, width: 300 }}>
          <CardContent>
            <Typography variant="h6">{sys.system_name}</Typography>
            <Typography>Value: {sys.capabilities_available}%</Typography>
            <StopLight status={getStopLight(sys.capabilities_available)} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
