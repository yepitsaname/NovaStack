import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useLocation, useNavigate } from "react-router";
import { AddReport, EditReport } from "../../utils/utils"

//state "view", "edit", "create"
export default function Report({state = "create", report}){
  const { user, token, systems } = useContext(AppContext)
  const locationState = useLocation().state;
  const navigate = useNavigate();
  const [report_data, setReport_data] = useState(locationState?.report || report || {
    classification: "",
    title: "",
    system: NaN,
    syscap: "N/A",
    opscap: "N/A",
    short_description: "",
    long_description: "",
    start: "Z",
    stop: "Z",
    impact: "",
    fix_action: "",
    cause: ""
  })

  const [originState, setOriginState] = useState(locationState?.formState || state);
  const [formState,setFormState] = useState(locationState?.formState || state);
  const [classification, setClassification] = useState(report_data.classification)
  const [title, setTitle] = useState(report_data.title);
  const [system, setSystem] = useState(report_data.system);
  const [syscap, setSyscap] = useState(report_data.syscap);
  const [opscap, setOpscap] = useState(report_data.opscap);
  const [short_description, setShort_description] = useState(report_data.short_description);
  const [long_description, setLong_description] = useState(report_data.long_description);
  const [start, setStart] = useState(report_data.start.substring(0,report_data.start.length - 1));
  const [stop, setStop] = useState(report_data.stop.substring(0,report_data.stop.length - 1));
  const [impact, setImpact] = useState(report_data.impact);
  const [fix_action, setFix_action] = useState(report_data.fix_action);
  const [cause, setCause] = useState(report_data.cause);

  const handleEdit = (event)=>{
    event.preventDefault();
    console.log(state,formState, originState);
    setFormState("edit");
  }

  const handleCancel = (event)=>{
    event.preventDefault();
    if( originState == "create" || formState == "view" ) navigate(-1);

    setClassification(report_data.classification);
    setTitle(report_data.title);
    setSystem(report_data.system);
    setSyscap(report_data.syscap);
    setOpscap(report_data.opscap);
    setShort_description(report_data.short_description);
    setLong_description(report_data.long_description);
    setStart(report_data.start.substring(0,report_data.start.length - 1));
    setStop(report_data.stop.substring(0,report_data.stop.length - 1));
    setImpact(report_data.impact);
    setFix_action(report_data.fix_action);
    setCause(report_data.cause);
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

    let submitResult = (originState == "create" ? await AddReport(token, payload) : await EditReport(token, report_data.report_id, payload));
    if( submitResult.hasOwnProperty("report_id") ){
      setFormState("view");
      setOriginState("view");
      setReport_data(Object.assign(report_data, {...payload, report_id: submitResult.report_id[0].report_id}))
    }
  }

  return(
    <form className="form component" onSubmit={saveReport} id="report-form">
      <h3 className={"classification " + classification}>{classification}</h3>
      <fieldset name="basic information">
        <legend>Basic Information</legend>
        <label htmlFor="classification">Classification</label>
        <select value={classification} onChange={event=>setClassification(event.target.value)} disabled={formState=="view"}>
          <option value="">--Select an Option--</option>
          <option value="unclassified">Unclassified</option>
          <option value="cui">CUI</option>
        </select>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={title} onChange={event=>setTitle(event.target.value)} disabled={formState=="view"}/>
        <label htmlFor="start_time">Time of Event</label>
        <input type="datetime-local" id="start_time" name="start time" value={start} onChange={event=>setStart(event.target.value)} disabled={formState=="view"}/>
        <label htmlFor="short_description" >Short Description</label>
        <input type="text" id="short_description" name="short description" value={short_description} onChange={event=>setShort_description(event.target.value)} disabled={formState=="view"}/>
      </fieldset>
      <fieldset name="event details">
        <legend>Event Details</legend>
        <div className="flex-field">
          <div>
            <label htmlFor="system">Impacted System</label>
            <select id="system" defaultValue={system} disabled={formState=="view"}>
              <option value="">--Select an Option--</option>
              {systems.map(sys=><option key={`${sys.system_id}_${sys.system_name}`} value={sys.system_id}>{sys.system_name}</option>)}
              <option value={NaN}>None</option>
            </select>
          </div>
          <div>
            <label htmlFor="opscap">OPSCAP</label>
            <select id="opscap" value={opscap} onChange={event=>setOpscap(event.target.value)} disabled={formState=="view"}>
              <option value="N/A">N/A</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Red</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div>
            <label htmlFor="syscap">SYSCAP</label>
            <select id="syscap" value={syscap} disabled={formState=="view"}>
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
        <input type="text" id="impact" name="impact" value={impact} onChange={event=>setImpact(event.target.value)} disabled={formState=="view"}/>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={long_description} onChange={event=>setLong_description(event.target.value)} disabled={formState=="view"}/>
      </fieldset>
      <fieldset name="cause and fix">
        <legend>Cause & Resolution</legend>
        <label htmlFor="cause">Cause</label>
        <input type="text" id="cause" name="cause" value={cause} onChange={event=>setCause(event.target.value)} disabled={formState=="view"}/>
        <label htmlFor="fix_action">Fix Action</label>
        <input type="text" id="fix_action" name="fix_action" value={fix_action} onChange={event=>setFix_action(event.target.value)} disabled={formState=="view"}/>
        <label htmlFor="stop">Estimated Time of Return to Operations</label>
        <input type="datetime-local" id="stop_time" name="stop time" value={stop} onChange={event=>setStop(event.target.value)} disabled={formState=="view"}/>
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