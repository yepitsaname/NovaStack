import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import AppContext from "./AppContext";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import Homepage from "./pages/Homepage";
import "../css/App.css";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser }}>
      <NavBar />
      <SideBar />
      <Footer />

      <Routes>
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </AppContext.Provider>
  );
}
