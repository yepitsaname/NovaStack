import { Card, CardContent, Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, ButtonBase } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router"

import AppContext from "../AppContext";
import { Navigate } from "react-router-dom";


export default function System() {
  const [systems, setSystems] = useState([]);
  const navigate = useNavigate();
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
  <div className="box" style={{ padding: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="card" style={{ marginBottom: "24px", padding: "16px", backgroundColor: "var(--main-comp-mask)" }}>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th colSpan={systems.length} style={{ textAlign: "center" }}>
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>OPSCAP</h4>
              </th>
            </tr>
            <tr>
              {systems.map((sys) => (
                <th key={sys.system_id} style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <h6>StarFall: {sys.system_name}</h6>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {systems.map((sys) => (
                <td key={sys.system_id + "-opscap"} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ColorBlock
                      status={getStopLight(sys.op_capabilities_available)}
                      system={sys}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div className="box" style={{ padding: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div className="card" style={{ marginBottom: "24px", padding: "16px", backgroundColor: "var(--main-comp-mask)" }}>
      <div className="card-content">
        <table>
          <thead>
            <tr>
              <th colSpan={systems.length} style={{ textAlign: "center" }}>
                <h4 style={{ textAlign: "center", fontWeight: "bold" }}>SYSCAP</h4>
              </th>
            </tr>
            <tr>
              {systems.map((sys) => (
                <th key={sys.system_id} style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <h6>StarFall: {sys.system_name}</h6>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {systems.map((sys) => (
                <td key={sys.system_id + "-syscap"} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ColorBlock
                      status={getStopLight(sys.capabilities_available)}
                      system={sys}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
  );
}
