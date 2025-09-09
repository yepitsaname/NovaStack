import { Link } from "react-router";
import "../../css/forms.css"

export default function Login() {
  return (
    <form className="form component">
      <label>Username</label>
      <input type="text" placeholder="Username" /> <br />
      <label>Password</label>
      <input type="text" placeholder="Password" /> <br />
      <div className="remember-me">
        <input type="checkbox" />
        <label>Remember Me</label>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
      <Link to="/register" className="hyperlink">Create An Account</Link>
    </form>
  )
}
