import { Link } from "react-router-dom";
import "../../css/card.css"; // keep this path for your tree
import CurrentTasks from "../component/CurrentTasks";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Mission Control Dashboard</h1>
        <p>Welcome back, User. Your systems are operational</p>
        <div className="dashboard-grid">
          <CurrentTasks />
        </div>
      </div>
    </>
  );
}
