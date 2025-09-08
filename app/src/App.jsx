import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import Footer from "./component/Footer";
import Homepage from "./pages/Homepage";
import "../css/App.css";

export default function App() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Homepage />
      <Footer />
    </>
  );
}
