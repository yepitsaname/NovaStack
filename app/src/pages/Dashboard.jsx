import "../../css/card.css"; // keep this path for your tree
import TaskListWidget from "../component/TasklistWidget";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Mission Control Dashboard</h1>
        <p>Welcome back, User. Your systems are operational</p>
        <div className="dashboard-grid">
          <TaskListWidget isDashboard={true} isCurrent={true} />
        </div>
      </div>
    </>
  );
}
