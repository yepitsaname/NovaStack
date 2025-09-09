import { Link } from "react-router";
import "../../css/forms.css";
import { handleEvent, build_LoginPaylod } from "../../utils/forms";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/");
    }
  }, user);
  // Replace anon function with real fetch function
  return (
    <form
      className="form component"
      onSubmit={(e) => {
        handleEvent(
          e,
          build_LoginPaylod,
          () => {
            return Promise.resolve("legoman");
          },
          setUser
        );
      }}
    >
      <label htmlFor="username">Username</label>
      <input id="username" type="text" placeholder="Username" /> <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="text" placeholder="Password" /> <br />
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
