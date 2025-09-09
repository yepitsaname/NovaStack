import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import AppContext from "./AppContext";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import Homepage from "./pages/Homepage";
import "../css/App.css";
import Login from "./component/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser, token: token, setToken: setToken }}>
      <NavBar />
      <SideBar />
      <Footer />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" />
        <Route path="/dashboard" />
        <Route />
        <Route />
      </Routes>
    </AppContext.Provider>
  );
}
