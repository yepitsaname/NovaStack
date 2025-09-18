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
      <img src="src/assets/NovaStack_Logo.png" onClick={() => navigate("/")} />
      <h1 onClick={() => navigate("/")}>NOVAStack</h1>
      {user ? (
        <>
          <Link to="/profile" className="nav-btn">{user}</Link>
          <Link to="/login" onClick={() => { logout() }} className="nav-btn">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </>
      )}
    </nav>
  );
}
