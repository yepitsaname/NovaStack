import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import AppContext from "../AppContext";
import { GetReportBySystem } from "../../utils/utils";


export default function SystemReport() {
  const [reportData, setReportData] = useState([]);
  const { token, user, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  if (!token || !user || !profile) return <Navigate to="/login" />;


  useEffect(() => {
    GetReportBySystem(token, id).then(temp => setReportData(temp))

  }, []);


  if (!reportData.length) return <div>No reports found for this system.</div>;

  return (
    <div className="dashboard">
      <h1>Reports</h1>
      <div> <button onClick={() => navigate("/reports/new")}>Add</button></div>
      <div className="reports-list">
        <table className="tb-system-report">
          <thead>
            <tr className="tr-report">
              <th>Report ID</th>
              <th>System ID</th>
              <th>Title</th>
              <th>Classification</th>
              <th>Opscap</th>
              <th>Syscap</th>
              <th>Short Description</th>
              <th>Start</th>
              <th>Stop</th>
              <th>Impact</th>
              <th>Fix Action</th>
              <th>Cause</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, idx) => (
              <tr
                key={idx}
                className="tr clickable"
                onClick={() =>
                  navigate(`/reports/${row.report_id}`, {
                    state: { formState: "view", report: row },
                  })
                }
              >
                <td>{row.report_id}</td>
                <td>{row.system}</td>
                <td>{row.title}</td>
                <td>{row.classification}</td>
                <td>{row.opscap}</td>
                <td>{row.syscap}</td>
                <td>{row.short_description}</td>
                <td>
                  {row.start ? new Date(row.start).toLocaleDateString() : ""}
                </td>
                <td>
                  {row.stop ? new Date(row.stop).toLocaleDateString() : ""}
                </td>
                <td>{row.impact}</td>
                <td>{row.fix_action}</td>
                <td>{row.cause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
