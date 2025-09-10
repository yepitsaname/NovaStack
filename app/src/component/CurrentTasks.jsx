import { Link } from "react-router-dom";
import "../../css/card.css"; // keep this path for your tree

export default function CurrentTasks() {
  return (
    <Link to="/tasks" style={{ display: "block" }}>
      <div className="task-widget">Current Tasks</div>
    </Link>
  );
}
