import { Link } from "react-router";
import "../../css/forms.css";
import { handleEvent, build_LoginPaylod } from "../../utils/forms";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { UserLogin } from "../../utils/utils";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const { token, setToken } = useContext(AppContext);
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
      setUser(username);
      setToken(res.token);
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
