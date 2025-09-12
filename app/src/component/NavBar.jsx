import { useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

export default function NavBar() {
  const { user, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate()
  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
  }

  return (
    <nav>
      <img src="src/assets/Nova-icon.png" onClick={() => navigate("/")} />
      <h1 onClick={() => navigate("/")}>NovaStack</h1>
      {user ? (
        <>
          <p>🔔</p>
          <Link to="/profile">{user}</Link>
          <Link to="/login" onClick={() => { logout() }}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
