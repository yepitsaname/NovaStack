import { useContext } from "react";
import { Link } from "react-router";

import AppContext from "../AppContext";

export default function NavBar() {
  const { user, setUser, setToken } = useContext(AppContext);

  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
  }

  return (
    <nav>
      <img src="src/assets/Nova-icon.png" />
      <h1>NovaStack</h1>
      {user ? (
        <>
          <p>🔔</p>
          <Link to="/profile">{user}</Link>
          <Link onClick={()=>{logout()}}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/Login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
