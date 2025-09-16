import TaskListWidget from "../component/TasklistWidget";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";

export default function Tasks() {
  const { token, user, profile } = useContext(AppContext);
  if (!token || !user || !profile) return <Navigate to="/login" />
  return (
    <>
      <div className="dashboard">
        <h1>Task Management</h1>
        <TaskListWidget />
      </div>
    </>
  );
}
