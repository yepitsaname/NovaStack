import { Card, CardContent, Typography, Box } from "@mui/material"
import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";


export default function Reports() {
  const [sysPerc, setSysPerc] = useState();
  const [sysCaps, setSysCaps] = useState('');
  const { token } = useContext(AppContext);

  const OPSCAP = 80;
  const SYSCAP = 72;

  const colorMap = {
    high: "green",
    medium: "yellow",
    low: "red"
  }

  const getStopLight = (value) => {
    const getStopLight = () => {
      if (sysPerc > 75) return "Healthy"
      if (sysPerc >= 50) return "Warning"
      return "Critical"
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
      )
    }

    const [opsValue, setOpsValue] = useState(OPSCAP);
    const [sysValue, setSysValue] = useState(SYSCAP);

    useEffect(() => {
      fetch('http://localhost:3000/system/status', {
        method: "GET",
        headers: { Authorization: token }
      })
        .then(data => data.json)
        .then(res => setSysPerc(res.capabilities_available))
        .catch(err => console.log(err));
    }, [])

    return (
      <Box sx={{ p: 2 }}>
        <Card sx={{ mb: 2, width: 300 }}>
          <CardContent>
            <Typography variant="h6">OPSCAP</Typography>
            <Typography>Value: {OPSCAP}%</Typography>
            <StopLight status={getStopLight(OPSCAP)} />
          </CardContent>
        </Card>

        <Card sx={{ mb: 2, width: 300 }}>
          <CardContent>
            <Typography variant="h6">SYSCAP</Typography>
            <Typography>Value: {SYSCAP}%</Typography>
            <StopLight status={getStopLight(SYSCAP)} />
          </CardContent>
        </Card>
      </Box>
    )
  }
}