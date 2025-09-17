import { useState, useEffect, useContext } from "react";


import AppContext from "../AppContext";
import { Navigate } from "react-router-dom";
import CapesChart from "../component/CapesChart";



export default function System() {
  const { token, user, profile, systems } = useContext(AppContext);

  if (!token || !user || !profile) return <Navigate to="/login" />

  return (
    <>
      <CapesChart title="OPSCAP" systems={systems} isOps={true}/>
      <CapesChart title="SYSCAP" systems={systems} />
    </>

  );
}


//make each box pull from new table "reports" with seeded data
//Reports should present the data from the specific box