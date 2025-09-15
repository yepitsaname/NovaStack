import { useState, useEffect, useContext } from "react";


import AppContext from "../AppContext";
import { Navigate } from "react-router-dom";
import CapesChart from "../component/CapesChart";


export default function System() {
  const [systems, setSystems] = useState([]);
  const { token, user, profile } = useContext(AppContext);

  if (!token || !user || !profile) return <Navigate to="/login" />
  

  useEffect(() => {
    fetch("http://localhost:3000/system/status", {
      method: "GET",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then((res) => setSystems(res))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <CapesChart title="OPSCAP" systems={systems}/>
      <CapesChart title="SYSCAP" systems={systems}/>
    </>
  );
}
