import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/system">System</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/configuration">Configuration</Link>
    </aside>
  );
}
