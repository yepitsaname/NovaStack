import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useContext } from "react";

export default function SideBar() {
  const { token, user, profile } = useContext(AppContext);

  return (
    <>
      {!token || !user || !profile ? <></> : (<aside>
        <Link to={!token || !user || !profile ? "/login" : "/dashboard"}>Dashboard</Link>
        <Link to={!token || !user || !profile ? "/login" : "/system"}>System</Link>
        <Link to={!token || !user || !profile ? "/login" : "/taskslist"}>Tasks</Link>
        <Link to={!token || !user || !profile ? "/login" : "/reports"}>Reports</Link>
        <Link to={!token || !user || !profile ? "/login" : "/configuration"}>Configuration</Link>
      </aside>)}
    </>
  );
}
