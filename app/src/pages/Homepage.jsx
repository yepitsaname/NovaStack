import NovaText from "../assets/NovaText.png";
import Logo from "../component/Logo";

export default function Homepage() {
  return (
    <div className="homepage">


      <Logo />
      <div className="home-text">
        <img src="src/assets/NovaText.png" height="100px" width="300px" />
        <h3>New Operational Vector Application</h3>
        <h4><i>Not another tool -- Your Team's Mission Dashboard</i></h4>
      </div>
    </div>

  );
}
