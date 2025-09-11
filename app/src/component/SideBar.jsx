import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useContext } from "react";
export default function SideBar() {
const { token } = useContext(AppContext);

  return (
    <aside>
      <Link to={!token ? "/login" : "/Dashboard"}>Dashboard</Link>
      <Link to={!token ? "/login" : "/System"}>System</Link>
      <Link to={!token ? "/login" : "/Tasks"}>Tasks</Link>
      <Link to={!token ? "/login" : "/Reports"}>Reports</Link>
      <Link to={!token ? "/login" : "/Configuration"}>Configuration</Link>
    </aside>
  );
}
