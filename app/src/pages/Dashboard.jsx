import "../../css/app.css"; // keep this path for your tree
import TaskListWidget from "../component/TasklistWidget";
import AppContext from "../AppContext";
import { useContext, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import CapesChart from "../component/CapesChart";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const { token, user, profile, systems } = useContext(AppContext);
  if (!token || !user || !profile) return <Navigate to="/login" />

    const [layouts, setLayouts] = useState({
    lg: [
      { i: 'tasklist', x: 0, y: 4, w: 11.5, h: 10, minW: 6, minH: 4 },
      { i: 'opscap', x: 0, y: 4, w: 11.5, h: 5.5, minW: 4, minH: 2 },
      { i: 'syscap', x: 0, y: 4, w: 11.5, h: 5.5, minW: 4, minH: 2 }
    ]
  });

  const onLayoutChange = useCallback((currentLayout, allLayouts) => {
    setLayouts(allLayouts);
  }, []);

  const breakpoints = { lg: 1200};
  const cols = { lg: 10 };

  return (
    <>
      <div className="dashboard">
        <h1>Mission Control Dashboard</h1>
        <p>Welcome back, {user}. Your systems are operational</p>

        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={onLayoutChange}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={60}
          isDraggable={true}
          isResizable={true}
          margin={[0, 15]}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
        >        
          <div key="tasklist" className="widget-content">
            <div className="widget-header">
              <h3>Task Management</h3>
            </div>
            <TaskListWidget isDashboard={true} isCurrent={true} />
          </div>
          
          <div key="opscap" className="widget-content">
            <div className="widget-header">
              <h3>OPSCAP Analytics</h3>
            </div>
            <CapesChart title="OPSCAP" systems={systems}/>
          </div>
          
          <div key="syscap" className="widget-content">
            <div className="widget-header" >
              <h3>SYSCAP Overview</h3>
            </div>
            <CapesChart title="SYSCAP" systems={systems}/>
          </div>
        </ResponsiveGridLayout>
      </div>
    </>
  );
}
