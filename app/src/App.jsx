import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Configuration from "./pages/Configuration";
import System from "./pages/System";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";
import EditTask from "./component/EditTask";
import TaskItem from "./component/TaskItem";
import AddTasks from "./component/AddTask";

import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Report from "./component/Report"
import SystemReport from "./component/SystemReport";

import AppContext from "./AppContext";

import "../css/app.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [systems, setSystems] = useState([])

  const PrivateRoute = () => {
    return user && profile && token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  const AnonymousRoute = () => {
    return user && profile && token ? <Navigate to="/" replace /> : <Outlet />;
  };

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        profile: profile,
        setProfile: setProfile,
        token: token,
        setToken: setToken,
        systems: systems,
        setSystems: setSystems
      }}
    >
      <NavBar />
      <Footer />
      <main className="main-content">
        <SideBar />
        <Routes>
          <Route path="/view-report" element={<Report />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/system" element={<System />} />
            <Route path="/taskslist" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/taskslist/edit" element={<EditTask />} />
            <Route path="/taskslist/add" element={<AddTasks />} />
            <Route path="/taskslist/:id" element={<TaskItem />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/report/system/:id" element={<SystemReport />} />
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </main>
    </AppContext.Provider>
  );
}
