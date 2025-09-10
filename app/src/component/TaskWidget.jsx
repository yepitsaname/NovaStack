import { Link } from "react-router";

export default function TaskWidget() {
  return (
    <Link to={"/tasks"}>
      <div className="task-widget">
        <div
          className={`w-full flex-1`}
          style={{
            backgroundSize: `cover`,
            backgroundPosition: `bottom center`,
          }}
        ></div>
      </div>
    </Link>
  );
}
