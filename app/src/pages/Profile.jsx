import { useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { GetUser } from "../../utils/utils";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, profile, token } = useContext(AppContext);

  if (!token || !user || !profile) return <Navigate to="/login" />
  // Edit actions
  // should update the user's prefered scheme in the
  // database and on their profile
  const updateTheme = (event) => { }


  if (!profile) return <div className="form"><h2>Loading Profile</h2></div>

  return (
    <div className="form">
      <h2>{user}'s Profile</h2>
      <fieldset name="user information">
        <legend>Overview</legend>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="user name" value={user} disabled />
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" name="first name" value={profile.first_name} disabled />
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="last name" value={profile.last_name} disabled />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={profile.email} disabled />
        <label htmlFor="roles">Roles</label>
        <input type="text" id="roles" name="roles" value={profile.roles.map(role => role.role_name).join(", ")} disabled />
      </fieldset>
      <fieldset>
        <legend>Theming</legend>
        <label htmlFor="theme">Themes</label>
        <select defaultValue={profile.theme}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <button onClick={() => { }}>Update</button>
      </fieldset>
      <fieldset>
        <legend>Password Reset</legend>
        <label htmlFor="current-password">Current Password</label>
        <input type="password" id="current-password" name="current password" />
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" name="new password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm password" />
        <button>Reset Password</button>
      </fieldset>
    </div>
  );
}
