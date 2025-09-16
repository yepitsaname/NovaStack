import { useState } from "react"

export default function Report(){
  const [report, setReport] = useState({
    classification: "Unclassified",
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

  return(
    <div className="form component">
      <h3 className={report.classification}>{report.classification}</h3>
      <fieldset name="user information">
        <legend>Basic Information</legend>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={report.title} disabled/>
        <label htmlFor="classification">Classification</label>
        <select defaultValue={report.classification} onChange={(event)=>{ event.target.value}}>
          <option value={null}>--Select an Option--</option>
          <option value="unclassified">Unclassified</option>
          <option value="unclassified">CUI</option>
        </select>
      </fieldset>
      <h3 className={report.classification}>{report.classification}</h3>
    </div>
  )
}