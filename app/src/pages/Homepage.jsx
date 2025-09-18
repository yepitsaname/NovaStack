import NovaText from "../assets/NovaText.png";
import Logo from "../component/Logo";

export default function Homepage() {
  return (
    <div className="homepage">


      <Logo />
      <div className="home-text">
        {/* <img src="src/assets/NovaText.png" height="100px" width="300px" /> */}
        <h2>New Operational Vector Application</h2>
        <h3><i>Not another tool -- Your Team's Mission Dashboard</i></h3>
      </div>
    </div>

  );
}
