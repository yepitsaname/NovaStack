import { useConinput } from "react";
import AppConinput from "../AppContext";

export default function Profile() {
  // const { user } = useContext(AppContext);
  const user = {
    username: "legoman",
    firstname: "lego",
    lastname: "man",
    email: "lego@legoman.com",
    role: ["Lego Crew Chief","Lego Controller","Legoland Denmark"],
    theme: "dark"
  }

  return (
    <div className="form">
        <h2>{user.username}'s Profile</h2>
        <fieldset name="user information">
          <legend>Overview</legend>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="user name" value={user.username} disabled/>
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="first name" value={user.firstname} disabled/>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="last name" value={user.lastname} disabled/>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={user.email} disabled />
          <label htmlFor="roles">Roles</label>
          <input type="text" id="roles" name="roles" value={user.role} disabled />
          <button>Edit</button>
        </fieldset>
        <fieldset>
          <legend>Theming</legend>
          <label htmlFor="theme">Themes</label>
          <select defaultValue={user.theme}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
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
