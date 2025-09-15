import { useState, useContext } from "react"
import AppContext from "../AppContext";

export default function Report(){
  const { systems } = useContext(AppContext)
  const [report, setReport] = useState({
    classification: "unclassified",
    title: null,
    system: null,
    syscap: null,
    opscap: null,
    short_description: null,
    long_description: null,
    start: null,
    stop: null,
    impact: null,
    fix_action: null,
    cause: null
  });
  const [classification, setClassification] = useState(report.classification || null)


  return(
    <div className="form component">
      <h3 className={"classification " + classification}>{classification}</h3>
      <fieldset name="user information">
        <legend>Basic Information</legend>
        <label htmlFor="classification">Classification</label>
        <select defaultValue={classification} onChange={(event)=>{setClassification(event.target.value)}}>
          <option value={null}>--Select an Option--</option>
          <option value="unclassified">Unclassified</option>
          <option value="cui">CUI</option>
        </select>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={report.title} />
        <label htmlFor="start_time">Time of Event</label>
        <input type="datetime-local" id="start_time" name="start time" value={report.start} />
        <label htmlFor="short_description" >Short Description</label>
        <input type="text" id="short_description" name="short description" value={report.short_description}/>
      </fieldset>
      <fieldset name="event details">
        <legend>Event Details</legend>
        <label htmlFor="system">Impacted System</label>
        <div>
          <select defaultValue={report.system}>
            <option value={null}></option>
            {systems?.map(sys=>sys?.system_name)}
          </select>
          <select defaultValue={report.syscap}>
            <option value={null}>N/A</option>
            <option value="Warning">Yellow</option>
            <option value="Critical">Red</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Special_Case">Other</option>
            <option value="Offline">Offline</option>
          </select>
          <select defaultValue={report.opscap}>
            <option value={null}>N/A</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Red</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </fieldset>
      <h3 className={"classification " + classification}>{classification}</h3>
    </div>
  )
}