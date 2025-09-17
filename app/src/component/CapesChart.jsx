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
  
  return (
    <div className="content-container">
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th 
                  colSpan={systems.length} 
                >
                  <h4>
                    {title}
                  </h4>
                </th>
              </tr>
              <tr>
                {systems.map((sys) => (
                  <th 
                    key={sys.system_id} 
                  >
                    <h6>
                      StarFall: {sys.system_name}
                    </h6>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                {systems.map((sys) => (
                  <td 
                    key={sys.system_id + "-" + title} 

                  >
                    <div>
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
  )
}
