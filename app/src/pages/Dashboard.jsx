import "../../css/app.css"; // keep this path for your tree
import TaskListWidget from "../component/TasklistWidget";
import AppContext from "../AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { token, user, profile } = useContext(AppContext);
  if (!token || !user || !profile) return <Navigate to="/login" />

  return (
    <>
      <div className="dashboard">
        <h1>Mission Control Dashboard</h1>
        <p>Welcome back, {user}. Your systems are operational</p>
        <div className="dashboard-grid">
          <TaskListWidget isDashboard={true} isCurrent={true} />
        </div>
      </div>
    </>
  );
}
