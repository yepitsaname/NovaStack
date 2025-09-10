import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import System from "./pages/System";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";

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
      value={{ user: user, setUser: setUser, token: token, setToken: setToken }}
    >
      <NavBar />
      <SideBar />
      <Footer />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/system" element={<System />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile:user" element={<Profile />} />
        <Route path="/" element={<Homepage />} />
        <Route />
      </Routes>
    </AppContext.Provider>
  );
}
