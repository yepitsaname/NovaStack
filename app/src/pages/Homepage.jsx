import NovaText from "../assets/NovaText.png";
import Logo from "../component/Logo";

export default function Homepage() {
  return (
    <div className="homepage">
      <Logo />
      <div className="home-text">
        <h1 className="nova">NOVAStack</h1>
        <h2 className="nova">New Operational Vector Application</h2>
        <h3><i>Not another tool -- Your Team's Mission Dashboard</i></h3>
      </div>
    </div>

  );
}
