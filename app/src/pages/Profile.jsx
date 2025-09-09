import { useContext } from "react";
import AppContext from "../AppContext";

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
    <>
      <div>
        <h2>{ user.username }</h2>
        <label htmlFor="username">Username</label>
        <text id="username" name="user name" value={user.username} disabled/>
        <label htmlFor="firstname">First Name</label>
        <text id="firstname" name="first name" value={user.firstname} disabled/>
      </div>
    </>
  );
}
