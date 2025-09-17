import "../../css/app.css";
import TaskListWidget from "../component/TasklistWidget";
import CapesChart from "../component/CapesChart";

import AppContext from "../AppContext";
import { useContext, useState, useCallback, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const { token, user, profile, systems } = useContext(AppContext);
  if (!token || !user || !profile) return <Navigate to="/login" replace />;

  const breakpoints = useMemo(
    () => ({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }),
    []
  );
  const cols = useMemo(
    () => ({ lg: 12, md: 10, sm: 8, xs: 6, xxs: 2 }),
    []
  );

  const defaultLayouts = useMemo(
    () => ({
      lg: [
        { i: "tasklist", x: 0, y: 0, w: 11, h: 12, minW: 6, minH: 4 },
        { i: "opscap", x: 0, y: 10, w: 5, h: 9, minW: 4, minH: 3 },
        { i: "syscap", x: 0, y: 16, w: 5, h: 9, minW: 4, minH: 3 },
      ],
      md: [
        { i: "tasklist", x: 0, y: 0, w: 9, h: 9, minW: 5, minH: 4 },
        { i: "opscap", x: 0, y: 10, w: 9, h: 9, minW: 4, minH: 3 },
        { i: "syscap", x: 0, y: 16, w: 9, h: 9, minW: 4, minH: 3 },
      ],
      sm: [
        { i: "tasklist", x: 0, y: 0, w: 4, h: 9, minW: 1, minH: 1 },
        { i: "opscap", x: 0, y: 10, w: 4, h: 9, minW: 1, minH: 1 },
        { i: "syscap", x: 0, y: 16, w: 4, h: 9, minW: 1, minH: 1 },
      ],
    }),
    []
  );

  const [layouts, setLayouts] = useState(defaultLayouts);

  const handleLayoutsChange = useCallback((allLayouts) => {
    setLayouts((prev) => ({ ...prev, ...allLayouts }));
  }, []);

 
  const handleLayoutChange = useCallback(
    (_current, all) => handleLayoutsChange(all),
    [handleLayoutsChange]
  );


  return (
    <div className="dashboard">
      <h1>Mission Control Dashboard</h1>
      <p>Welcome back, {user}. Your systems are operational.</p>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={60}
        isDraggable
        isResizable
        draggableHandle=".widget-header"
        margin={[10, 10]}
        containerPadding={[0, 0]}
        useCSSTransforms
        measureBeforeMount={false}
        onLayoutChange={handleLayoutChange}
        onDragStop={(_layout, all) => handleLayoutsChange(all)}
        onResizeStop={(_layout, all) => handleLayoutsChange(all)}
        preventCollision={false}
        compactType="vertical"
      >
        <div key="tasklist" className="widget-content">
          <div className="widget-header">
            <h3>Task Management</h3>
          </div>
          <TaskListWidget isDashboard isCurrent />
        </div>

        <div key="opscap" className="widget-content">
          <div className="widget-header">
            <h3>OPSCAP Analytics</h3> 
          </div>
          <CapesChart title="OPSCAP" systems={systems} />
        </div>

        <div key="syscap" className="widget-content">
          <div className="widget-header">
            <h3>SYSCAP Overview</h3>
          </div>
          <CapesChart title="SYSCAP" systems={systems} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
