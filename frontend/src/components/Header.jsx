import logo from "../assets/images/kudos.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Kudosboard logo" className="logo" />
      <h1>KUDOBOARD</h1>
    </header>
  );
};

export default Header;
