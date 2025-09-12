import { Routes, Route } from "react-router-dom";
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

import AppContext from "./AppContext";

import "../css/app.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        profile: profile,
        setProfile: setProfile,
        token: token,
        setToken: setToken,
      }}
    >
      <NavBar />
      <Footer />
      <main className="main-content">
        <SideBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/system" element={<System />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/tasks/edit" element={<EditTask />} />
          <Route path="/tasks/:id" element={<TaskItem />} />
          <Route path="/tasks/add" element={<AddTasks />} />
        </Routes>
      </main>
    </AppContext.Provider>
  );
}
