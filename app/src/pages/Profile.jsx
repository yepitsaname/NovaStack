import { useState, useContext } from "react";
import AppContext from "../AppContext";
import { UpdatePassword, UpdateUser } from "../../utils/utils";
import Alert from "@mui/material/Alert";
import { Navigate } from "react-router";

export default function Profile() {
  const { user, token, profile, setProfile } = useContext(AppContext);

  if( !user || !token || !profile ) return <Navigate to="/login" />;

  // Flags: new matches current, new doees not match confirmation, error setting password, password change success
  const [ passStatus, setPassStatus ] = useState(0)
  let theme = profile.preferences.theme;

  const updateTheme = async () => {
    let payload = { "preferences": {
      "theme": theme,
      "layout": profile.preferences.layout
    }}
    let status = await UpdateUser(user, token, payload)
    setProfile((current)=>{
      return Object.assign(current, {preferences: {...current.preferences, theme: theme}})
    })
    document.querySelector("html").setAttribute("theme", profile.preferences.theme)
  }

  const resetPassword = async ()=>{
    const cur_password = document.querySelector("#current_password").value;
    const new_password = document.querySelector("#new_password").value;
    const con_password = document.querySelector("#confirm_password").value;

    if(new_password == cur_password) return setPassStatus(1);
    if(new_password != con_password) return setPassStatus(2);

    //send request to endpoint, compare current password, if true reset pass else throw error
    let passChange = await UpdatePassword(user, token, {password: new_password, current: cur_password});
    if( passChange != 200 ) return setPassStatus(3);
    return setPassStatus(4);
  }

  if( !profile ) return <div className="form"><h2>Loading Profile</h2></div>

  return (
    <div className="form component">
      <h2>{user}'s Profile</h2>
      <fieldset name="user information">
        <legend>Overview</legend>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="user name" value={user} disabled/>
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" name="first name" value={profile.first_name} disabled/>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="last name" value={profile.last_name} disabled/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={profile.email} disabled />
        <label htmlFor="roles">Roles</label>
        <input type="text" id="roles" name="roles" value={profile.roles.map(role=>role.role_name).join(", ")} disabled />
      </fieldset>
      <fieldset>
        <legend>Theming</legend>
        <label htmlFor="theme">Themes</label>
        <select defaultValue={profile.preferences.theme} onChange={(event)=>{theme = event.target.value}}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <button onClick={()=>{updateTheme()}}>Update</button>
      </fieldset>
      <fieldset>
        <legend>Password Reset</legend>
        <label htmlFor="current_password">Current Password</label>
        <input type="password" id="current_password" name="current password" />
        <label htmlFor="new_password">New Password</label>
        <input type="password" id="new_password" name="new password" />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm password" />
        <button onClick={()=>{resetPassword()}}>Reset Password</button>
        <div className="">
          {passStatus == 1 && (
            <Alert severity="error" onClose={() => setPassStatus(0)}>New password cannot be the current password</Alert>
          )}
          {passStatus == 2 && (
            <Alert severity="error" onClose={() => setPassStatus(0)}>Passwords do not match</Alert>
          )}
          {passStatus == 3 && (
            <Alert severity="error" onClose={() => setPassStatus(0)}>Unable to change password</Alert>
          )}
          {passStatus == 4 && (
            <Alert severity="success" onClose={() => setPassStatus(0)}>Password Changed!</Alert>
          )}
        </div>
      </fieldset>
    </div>
  );
}
