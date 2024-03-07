import style from "./Login.module.css";
import logo from "../../../assets/images/PMS3.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  return (
    <div className={`vh-100 ${style["auth-container"]}`}>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-7">
            <div className="logo text-center mb-2">
              <img src={logo} alt="Logo" />
            </div>
            <div className="form-container rounded-4 text-light p-5">
              <div className="form-info mb-5">
                <p className="lh-1 form-title">welcome to PMS</p>
                <h2 className="form-header lh-1">Login</h2>
              </div>
              <form>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group mb-4">
                  <input
                    id="email"
                    type="email"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 p-0 shadow-none text-light"
                    placeholder="Enter your E-mail"
                  />
                </div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="password"
                    type={showPass ? "password" : "text"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 p-0 shadow-none text-light"
                    placeholder="Enter your password"
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    {showPass ? (
                      <i
                        className="fa-regular fa-eye text-light"
                        role="button"
                        onClick={showPassHandler}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-eye-slash text-light"
                        role="button"
                        onClick={showPassHandler}
                      ></i>
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <Link
                    to={"register"}
                    className="text-decoration-none text-light"
                  >
                    Register Now ?
                  </Link>
                  <Link
                    to={"forgot-pass"}
                    className="text-decoration-none text-light"
                  >
                    Forget Password ?
                  </Link>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn form-btn w-75 rounded-4 text-light"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
