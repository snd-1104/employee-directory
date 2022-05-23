import { Link } from "react-router-dom";
import logo from "./logo.png";
const Navbar = () => {
  return (
    <header className="row justify-content-between bg-gradient bg-dark align-items-center">
      <div className="div-logo col-6">
        <Link className="d-block" to="/">
          {" "}
          <img src={logo} className="img-fluid" width="120px"></img>
          <h1 className="h1-seo">Employee Directory</h1>
        </Link>
      </div>
      <div className="menu col-auto">
        <nav className="navbar">
          <Link to="/" className="d-block p-2">
            View List
          </Link>
          <Link to="/create" className="d-block p-2">
            Create New Employee
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
