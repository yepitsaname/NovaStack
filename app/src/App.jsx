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
import AddTask from "./component/AddTask";
import EditTask from "./component/EditTask";
import TaskItem from "./component/TaskItem";

import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import Login from "./component/Login";

import AppContext from "./AppContext";

import "../css/app.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        token: token,
        setToken: setToken,
      }}
    >
      <NavBar />
      <SideBar />
      <Footer />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/system" element={<System />} />
          <Route path="/taskslist" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/taskslist/add" element={<AddTask />} />
          <Route path="/taskslist/edit" element={<EditTask />} />
          <Route path="/taskslist/:id" element={<TaskItem />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
