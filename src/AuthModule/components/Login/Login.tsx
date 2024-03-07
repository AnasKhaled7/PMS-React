import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import style from "./Login.module.css";
import logo from "../../../assets/images/PMS3.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => setShowPass(!showPass);

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Login",
        data
      );
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={`${style["auth-container"]}`}>
      <div className="container-fluid py-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-7">
            <div className="logo text-center mb-2">
              <img src={logo} alt="Logo" />
            </div>
            <div className="form-container rounded-4 text-light p-5">
              <div className="form-info mb-5">
                <p className="lh-1 form-title">welcome to PMS</p>
                <h2 className="form-header lh-1">Login</h2>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* email input */}
                <label htmlFor="email" className="form-label mb-0">
                  Email
                </label>
                <div className="input-group mb-4">
                  <input
                    id="email"
                    type="email"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your E-mail"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email not valid",
                      },
                    })}
                  />
                </div>
                <div className="w-100">
                  {errors.email && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                </div>

                {/* password input */}
                <label htmlFor="password" className="form-label mb-0">
                  Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message: "Password is not valid",
                      },
                    })}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        showPass ? "-slash" : ""
                      }`}
                      role="button"
                      onClick={showPassHandler}
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.password && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.password as FieldError).message}
                    </span>
                  )}
                </div>

                {/* links */}
                <div className="d-flex justify-content-between">
                  <Link
                    to="/register"
                    className="text-decoration-none text-light"
                  >
                    Register Now ?
                  </Link>
                  <Link
                    to="/forgot-pass"
                    className="text-decoration-none text-light"
                  >
                    Forget Password ?
                  </Link>
                </div>

                {/* submit button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn form-btn w-75 rounded-4 text-light mt-4 mx-auto d-block"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
