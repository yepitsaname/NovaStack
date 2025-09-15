import { useState, useContext } from "react"
import AppContext from "../AppContext";

//state "view", "edit", "create"
export default function Report({state}){
  const { systems } = useContext(AppContext)
  const [report, setReport] = useState({
    classification: "unclassified",
    title: "",
    system: "",
    syscap: "",
    opscap: "",
    short_description: "",
    long_description: "",
    start: "",
    stop: "",
    impact: "",
    fix_action: "",
    cause: ""
  });
  const [classification, setClassification] = useState(report.classification || "")
  const [title, setTitle] = useState(report.title || "");
  const [system, setSystem] = useState(report.system || "");
  const [syscap, setSyscap] = useState(report.syscap || "");
  const [opscap, setOpscap] = useState(report.opscap || "");
  const [short_description, setShort_description] = useState(report.short_description || "");
  const [long_description, setLong_description] = useState(report.long_description || "");
  const [start, setStart] = useState(report.start || "");
  const [stop, setStop] = useState(report.stop || "");
  const [impact, setImpact] = useState(report.impact || "");
  const [fix_action, setFix_action] = useState(report.fix_action || "");
  const [cause, setCause] = useState(report.cause || "");

  return(
    <form className="form component">
      <h3 className={"classification " + classification}>{classification}</h3>
      <fieldset name="basic information">
        <legend>Basic Information</legend>
        <label htmlFor="classification">Classification</label>
        <select defaultValue={classification} onChange={event=>setClassification(event.target.value)}>
          <option value="">--Select an Option--</option>
          <option value="unclassified">Unclassified</option>
          <option value="cui">CUI</option>
        </select>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} onChange={event=>setTitle(event.target.value)}/>
        <label htmlFor="start_time">Time of Event</label>
        <input type="datetime-local" id="start_time" name="start time" value={start} onChange={event=>setStart(event.target.value)}/>
        <label htmlFor="short_description" >Short Description</label>
        <input type="text" id="short_description" name="short description" value={short_description} onChange={event=>setShort_description(event.target.value)}/>
      </fieldset>
      <fieldset name="event details">
        <legend>Event Details</legend>
        <div className="flex-field">
          <div>
            <label htmlFor="system">Impacted System</label>
            <select id="system" defaultValue={system}>
              <option value="">--Select an Option--</option>
              {systems.map(sys=>sys?.system_name)}
              <option value="none">None</option>
            </select>
          </div>
          <div>
            <label htmlFor="opscap">OPSCAP</label>
            <select id="opscap" defaultValue={opscap}>
              <option value="">N/A</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Red</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div>
            <label htmlFor="syscap">SYSCAP</label>
            <select id="syscap" defaultValue={syscap}>
              <option value="">N/A</option>
              <option value="Warning">Yellow</option>
              <option value="Critical">Red</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Special_Case">Other</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
        <label htmlFor="impact">Impact</label>
        <input type="text" id="impact" name="impact" value={impact} onChange={event=>setImpact(event.target.value)}/>
        <label htmlFor="description">Description</label>
        <input type="textarea" id="description" value={long_description} onChange={event=>setLong_description(event.target.value)}/>
      </fieldset>
      <fieldset name="cause and fix">
        <legend>Cause & Resolution</legend>
      </fieldset>

      <h3 className={"classification " + classification}>{classification}</h3>
    </form>
  )
}