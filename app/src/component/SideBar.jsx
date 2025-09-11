import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useContext } from "react";

export default function SideBar() {
const { token, user, profile } = useContext(AppContext);

  return (
    <>
      {!token||!user||!profile ? <></> :( <aside>
        <Link to={!token||!user||!profile ? "/login" : "/Dashboard"}>Dashboard</Link>
        <Link to={!token||!user||!profile ? "/login" : "/System"}>System</Link>
        <Link to={!token||!user||!profile ? "/login" : "/Tasks"}>Tasks</Link>
        <Link to={!token||!user||!profile ? "/login" : "/Reports"}>Reports</Link>
        <Link to={!token||!user||!profile ? "/login" : "/Configuration"}>Configuration</Link>
      </aside> )}
  </>
  );
}
