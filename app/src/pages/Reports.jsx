import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { GetAllReports } from "../../utils/utils";

export default function Reports() {
  const { token, user, profile } = useContext(AppContext);
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  if (!token || !user || !profile) return <Navigate to="/login" />;

  const refetch = async () => {
    const temp = await GetAllReports(token);
    setReportData(temp);
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleRowClick = (row) => {
    navigate(`/reports/${row.report_id}`, {
      state: { formState: "view", report: row },
    });
  };

  return (
    <div className="reports-list">

          <table >
            <thead>
              <tr>
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
                  key={row.report_id}
                  onClick={() => handleRowClick(row)}
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
  );
}