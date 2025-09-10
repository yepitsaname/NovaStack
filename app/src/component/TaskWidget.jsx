import { Link } from "react-router-dom";
import "../../css/card.css"; // keep this path for your tree

export default function TaskWidget() {
  return (
    <Link to="/tasks" style={{ display: "block" }}>
      <div className="task-widget">Recent Tasks</div>
    </Link>
  );
}
