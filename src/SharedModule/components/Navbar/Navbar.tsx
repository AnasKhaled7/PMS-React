import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/nav-logo.png";
import { AuthContext } from "../../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/dashboard">
          <img src={logo} alt="logo" className="w-100 object-fit-contain" />
        </Link>

        <div className="d-flex justify-content-center align-items-center gap-3 ms-auto">
          <div>
            <img src={avatar} alt="user-avatar" />
          </div>

          <div className="user-data d-flex flex-column">
            <span>{userData?.userName}</span>

            <span className="text-body-tertiary d-none d-sm-inline-block">
              {userData?.userEmail}
            </span>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="border-0 text-bg-light p-0"
            />

            <Dropdown.Menu className="top-50">
              <Dropdown.Item as={Link} to="/change-pass">
                <i className="fa-solid fa-lock-open pe-2"></i>
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                className="text-danger"
                onClick={logout}
              >
                <i className="fa-solid fa-right-from-bracket pe-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
