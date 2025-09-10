import { TaskWidget } from "../component/TaskWidget";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Mission Control Dashboard</h1>
        <p>Welcome back, User. Your systems are operational</p>
      </div>
      <div>
        <TaskWidget />
      </div>
    </>
  );
}
