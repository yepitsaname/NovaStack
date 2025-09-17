import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router"
import { GetSystemStatus } from "../../utils/utils";
import AppContext from "../AppContext";

export default function CapesChart({title, systems, isOps=false}) {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [stopLight, setStopLight] = useState([]);

  useEffect(()=>{
    GetSystemStatus(token)
    .then(data => setStopLight(data));
  },[])

  const getStopLight = (status) => {
    return stopLight.find(element => element.sys_status_id == status)?.color;
  };

  const handleClick = (sys) => {
    if (sys.op_capabilities_available || sys.capabilities_available) {
      navigate('/reports');
    } else {
      alert("Could not find data");
    }
  };

  const ColorBlock = ({ status, system }) => (
    <div
      onClick={() => handleClick(system)}
      style={{
        width: 80,
        height: 80,
        backgroundColor: status,
        border: "2px solid #333",
        borderRadius: 8,
        margin: "0 auto",
        cursor: "pointer"
      }}
    />
  );

  return (
    <div style={{
      padding: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        marginBottom: 24,
        padding: 16,
        backgroundColor: "var(--main-comp-mask)",
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th
                  colSpan={systems.length}
                  style={{
                    textAlign: 'center',
                    padding: 12,
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  <h4 style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "2rem"
                  }}>
                    {title}
                  </h4>
                </th>
              </tr>
              <tr>
                {systems.map((sys) => (
                  <th
                    key={sys.system_id}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      padding: 12,
                      borderBottom: "1px solid #ddd"
                    }}
                  >
                    <h6 style={{
                      margin: 0,
                      fontSize: "1.25rem"
                    }}>
                      StarFall: {sys.system_name}
                    </h6>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {systems.map((sys) => (
                  <td key={sys.system_id + "-" + title} >
                    <div>
                      <ColorBlock
                        status={getStopLight(isOps ? sys.ops_status : sys.sys_status)}
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
  )
}
