import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router";
import { AddReport, EditReport } from "../../utils/utils"

//state "view", "edit", "create"
export default function Report({state = "create", report }){
  const { user, token, systems } = useContext(AppContext)
  const navigate = useNavigate();

  report = report || {
    classification: "",
    title: "",
    system: NaN,
    syscap: "N/A",
    opscap: "N/A",
    short_description: "",
    long_description: "",
    start: "",
    stop: "",
    impact: "",
    fix_action: "",
    cause: ""
  };

  const [formState,setFormState] = useState(state);
  const [classification, setClassification] = useState(report.classification)
  const [title, setTitle] = useState(report.title);
  const [system, setSystem] = useState(report.system);
  const [syscap, setSyscap] = useState(report.syscap);
  const [opscap, setOpscap] = useState(report.opscap);
  const [short_description, setShort_description] = useState(report.short_description);
  const [long_description, setLong_description] = useState(report.long_description);
  const [start, setStart] = useState(report.start);
  const [stop, setStop] = useState(report.stop);
  const [impact, setImpact] = useState(report.impact);
  const [fix_action, setFix_action] = useState(report.fix_action);
  const [cause, setCause] = useState(report.cause);

  const handleEdit = (event)=>{
    event.preventDefault();
    setFormState("edit");
  }

  const handleCancel = (event)=>{
    event.preventDefault();
    if( state == "create" || formState == "view" ) navigate(-1);

    setClassification(report.classification);
    setTitle(report.title);
    setSystem(report.system);
    setSyscap(report.syscap);
    setOpscap(report.opscap);
    setShort_description(report.short_description);
    setLong_description(report.long_description);
    setStart(report.start);
    setStop(report.stop);
    setImpact(report.impact);
    setFix_action(report.fix_action);
    setCause(report.cause);
    setFormState("view");
  }

  const saveReport = async (event)=>{
    event.preventDefault();
    // Some validation logic here
    const payload = {
      username: user,
      system: system,
      title: title,
      classification: classification,
      opscap: opscap,
      syscap: syscap,
      short_description: short_description,
      long_description: long_description,
      start: start,
      stop: stop,
      impact: impact,
      fix_action: fix_action,
      cause: cause
    }
    let submitResult = state == "create" ? await AddReport(token, payload) : await EditReport(token, payload);
    console.log(submitResult);
    if( submitResult.hasOwnProperty("report_id") ){
      state = "view";
      setFormState("view");
      report.report_id = submitResult.report_id[0].report_id;
      console.log(report);
    }
  }

  return(
    <form className="form component" onSubmit={saveReport} id="report-form">
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
              {systems.map(sys=><option value={sys.system_id}>{sys.system_name}</option>)}
              <option value={NaN}>None</option>
            </select>
          </div>
          <div>
            <label htmlFor="opscap">OPSCAP</label>
            <select id="opscap" defaultValue={opscap} onChange={event=>setOpscap(event.target.value)}>
              <option value="N/A">N/A</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Red</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div>
            <label htmlFor="syscap">SYSCAP</label>
            <select id="syscap" defaultValue={syscap}>
              <option value="N/A">N/A</option>
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
        <textarea id="description" value={long_description} onChange={event=>setLong_description(event.target.value)}/>
      </fieldset>
      <fieldset name="cause and fix">
        <legend>Cause & Resolution</legend>
        <label htmlFor="cause">Cause</label>
        <input type="text" id="cause" name="cause" value={cause} onChange={event=>setCause(event.target.value)}/>
        <label htmlFor="fix_action">Fix Action</label>
        <input type="text" id="fix_action" name="fix_action" value={fix_action} onChange={event=>setFix_action(event.target.value)}/>
        <label htmlFor="stop">Estimated Time of Return to Operations</label>
        <input type="datetime-local" id="stop_time" name="stop time" value={stop} onChange={event=>setStop(event.target.value)}/>
      </fieldset>
      <div>
        {formState == "create" || formState == "edit" ? (<>
          <button type="submit" form="report-form">Submit Report</button>
          <button type="button" onClick={(event)=>{handleCancel(event)}}>Cancel</button>
        </>):(<>
          <button type="button" onClick={(event)=>{handleEdit(event)}}>Edit</button>
          <button type="button" onClick={(event)=>{handleCancel(event)}}>Go Back</button>
        </>)}
      </div>
      <h3 className={"classification " + classification}>{classification}</h3>
    </form>
  )
}