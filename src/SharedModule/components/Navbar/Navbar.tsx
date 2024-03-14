import { Link } from "react-router-dom";
import logo from "../../../assets/images/nav-logo.png";
import avatar from "../../../assets/images/avatar.png";
import "./Navbar.css";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/dashboard">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex justify-content-center align-items-center ms-auto">
            <div className="navbar-nav mb-2 me-3 mb-lg-0">
              <i className="fa-solid fa-bell"></i>
            </div>
            <div className="me-3">
              <img src={avatar} alt="user-avatar" />
            </div>
            <div className="user-data d-flex flex-column">
              <span>
                <Nav>
                  <NavDropdown title="Mohamed1">
                    <NavDropdown.Item className="bg-white">
                      <Link className="change-dropdown" to="/change-pass">
                        <i className="fa-solid fa-lock-open px-2"></i>
                        Change Password
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="bg-white text-danger">
                      <i className="fa-solid fa-right-from-bracket px-2"></i>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </span>
              <span className=" text-body-tertiary">
                mohamed.a.abdelhay55@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
