import { Box, Card, CardContent, Table, TableHead, TableCell, Typography, TableRow, TableBody } from "@mui/material"
import { useNavigate } from "react-router"


export default function CapesChart({title, systems}) {
      const navigate = useNavigate();
    const getStopLight = (status) => {
    if (status == "Healthy") return "Healthy";
    if (status == "Warning") return "Warning";
    if (status == "Critical") return "Critical";
    if (status == "Maintenance") return "Maintenance";
    if (status == "Special_Case") return "Special_Case";
    return "Offline";
  };
  const colorMap = {
    Healthy: "green",
    Warning: "yellow",
    Critical: "red",
    Maintenance: "white",
    Special_Case: "magenta",
    Offline: "black"
  };
  const handleClick = (sys) => {
    if (sys.op_capabilities_available || sys.capabilities_available) {
      navigate('/reports');
    } else {
      alert("Could not find data");
    }
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
    return (
         <Box sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ mb: 3, p: 2, backgroundColor: "var(--main-comp-mask)" }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={systems.length} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" align="center" fontWeight={"bold"}>{title}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
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
                    <TableCell key={sys.system_id + "-" + title} align="center">
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
    )
}