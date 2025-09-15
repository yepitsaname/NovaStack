import { Link } from "react-router";
import "../../css/forms.css";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { GetUser, GetUsersByRole, UserLogin, GetSystems } from "../../utils/utils";

export default function Login() {
  const { user, setUser, setToken, setProfile, setSystems } = useContext(AppContext);
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/");
    }
  }, [user]);

  async function login(formData) {
    let username = formData.get("username");
    let password = formData.get("password");
    const res = await UserLogin(username, password);
    if (res.token) {
      let profile = (await GetUser(username, res.token))[0]
      let roles = await GetUsersByRole(profile.user_id, res.token)
      let systems = await GetSystems(res.token)
      setUser(username);
      setToken(res.token);
      setProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        preferences: profile.preferences,
        roles: roles
      })
      setSystems(systems)
      document.querySelector("html").setAttribute("theme", profile.preferences.theme)
    }
  }

  return (
    <form className="form component" action={login}>
      <label htmlFor="username">Username</label>
      <input name="username" type="text" placeholder="Username" /> <br />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" placeholder="Password" /> <br />
      <div className="remember-me">
        <input type="checkbox" />
        <label>Remember Me</label>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
      <Link to="/register" className="hyperlink">
        Create An Account
      </Link>
    </form>
  );
}
