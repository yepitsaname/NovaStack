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
//     <div className="dashboard">
//       <div className="box">
//         <div className="card" >
//           <div className="card-content">
//             <table>
//               <thead>
//                 <tr>
//                   <th colSpan={systems.length} >
//                     <h4 >OPSCAP</h4>
//                   </th>
//                 </tr>
//                 <tr>
//                   {systems.map((sys) => (
//                     <th key={sys.system_id}>
//                       <h6>StarFall: {sys.system_name}</h6>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {systems.map((sys) => (
//                     <td key={sys.system_id + "-opscap"} >
//                       <div >
//                         <ColorBlock
//                           status={getStopLight(sys.op_capabilities_available)}
//                           system={sys}
//                         />
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <div className="box" >
//         <div className="card" >
//           <div className="card-content">
//             <table>
//               <thead>
//                 <tr>
//                   <th colSpan={systems.length} >
//                     <h4 >SYSCAP</h4>
//                   </th>
//                 </tr>
//                 <tr>
//                   {systems.map((sys) => (
//                     <th key={sys.system_id} >
//                       <h6>StarFall: {sys.system_name}</h6>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {systems.map((sys) => (
//                     <td key={sys.system_id + "-syscap"} >
//                       <div>
//                         <ColorBlock
//                           status={getStopLight(sys.capabilities_available)}
//                           system={sys}
//                         />
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
    <>
      <CapesChart title="OPSCAP" systems={systems}/>
      <CapesChart title="SYSCAP" systems={systems}/>
    </>

  );
}


//make each box pull from new table "reports" with seeded data
//Reports should present the data from the specific box