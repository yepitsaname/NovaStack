import { useContext } from "react";
import { Link } from "react-router";

import AppContext from "../AppContext";

export default function NavBar() {
  const { user } = useContext(AppContext);

  return (
    <nav>
      <img src="src/assets/Nova-icon.png" />
      <h1>NovaStack</h1>
      {user ? (
        <>
          <p>🔔</p>
          <Link>{user}</Link>
          <Link>Logout</Link>
        </>
      ) : (
        <>
          <Link>login</Link>
        </>
      )}
    </nav>
  );
}
