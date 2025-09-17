import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router"
import { GetSystemStatus } from "../../utils/utils";
import AppContext from "../AppContext";

export default function CapesChart({ title, systems, isOps = false }) {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [stopLight, setStopLight] = useState([]);

  useEffect(() => {
    GetSystemStatus(token)
      .then(data => setStopLight(data));
  }, [])

  const getStopLight = (status) => {
    return stopLight.find(element => element.sys_status_id == status)?.color;
  };


  const handleClick = (sys) => {
    if (sys.ops_status || sys.sys_status) {
      navigate(`/reports/system/${sys.system_id}`)
      return;
    } else {
      alert("Could not find data");
    }
  };
  //GetReportBySystem
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

    <div className="dashboard">
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