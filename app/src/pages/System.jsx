import { useState, useEffect, useContext } from "react";


import AppContext from "../AppContext";
import { Navigate } from "react-router-dom";
import CapesChart from "../component/CapesChart";



export default function System() {
  const { token, user, profile, systems, setSystems } = useContext(AppContext);

  if (!token || !user || !profile) return <Navigate to="/login" />
  

  // useEffect(() => {
  //   GetSystems(token)
  //     .then((data) => setSystems(data))
  //     .catch((err) => console.log(err));
  // }, [token]);

  return (
    <>
      <CapesChart title="OPSCAP" systems={systems}/>
      <CapesChart title="SYSCAP" systems={systems}/>
    </>
  );
}


//make each box pull from new table "reports" with seeded data
//Reports should present the data from the specific box