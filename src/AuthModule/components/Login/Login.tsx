import style from "./Login.module.css";
import logo from "../../../assets/images/PMS3.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  let navigate = useNavigate();

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      let req = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Login",
        data
      );
      console.log(req);
      navigate("/dashboard");
      setTimeout(() => {
        toast.success("You have successfully logged in. Welcome!", {
          position: "top-right",
        }),
          100;
      });
    } catch (error) {
      console.log(error);
      if ((error as any)?.response) {
        toast.error((error as any)?.response?.data?.message, {
          position: "top-right",
        });
      } else {
        toast.error("An error occurred", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className={`vh-100 ${style["auth-container"]}`}>
      <div className="container">
        <ToastContainer></ToastContainer>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group mb-4">
                  <input
                    id="email"
                    type="email"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 p-0 shadow-none text-light"
                    placeholder="Enter your E-mail"
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 p-0 shadow-none text-light"
                    placeholder="Enter your password"
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
                <div className="w-100">
                  {errors.password && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.password as FieldError).message}
                    </span>
                  )}
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
                    disabled={isSubmitting}
                    type="submit"
                    className="btn form-btn w-75 rounded-4 text-light"
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
