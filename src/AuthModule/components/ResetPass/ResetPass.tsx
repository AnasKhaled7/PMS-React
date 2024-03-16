import axios from "axios";
import React, { useContext, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import logo from "../../../assets/images/PMS3.png";
import { userURLs } from "../../../lib/APIs";
import {
  OTPValidation,
  emailValidation,
  passwordValidation,
} from "../../../lib/InputValidator";
import style from "./ResetPass.module.css";

const ResetPass: React.FC = () => {
  const { saveUserData, requestHeader } = useContext(AuthContext);
  const { resetPassAPI } = userURLs;

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  const showPassHandler = (inputId: string) => {
    setShowPass((prevState) => ({
      ...prevState,
      [inputId]: !prevState[inputId],
    }));
  };

  type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
    seed: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Inputs>();

  const password = watch("password");

  const onSubmit = async (data: Inputs) => {
    try {
      await axios.post(resetPassAPI, data, {
        headers: requestHeader,
      });
      saveUserData();
      toast.success("Password has been reset successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={`${style["auth-container"]}`}>
      <div className="container-fluid py-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="logo text-center mb-2">
              <img src={logo} alt="Logo" />
            </div>
            <div className="form-container rounded-4 text-light p-5">
              <div className="form-info mb-5">
                <p className="lh-1 form-title">welcome to PMS</p>
                <h2 className="form-header lh-1">Reset Password</h2>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* email input */}
                <label htmlFor="email" className="form-label mb-0">
                  Email
                </label>
                <div className="input-group mb-4">
                  <input
                    id="email"
                    aria-label="email"
                    type="email"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your E-mail"
                    autoComplete="email"
                    {...register("email", emailValidation)}
                  />
                </div>
                <div className="w-100">
                  {errors.email && (
                    <span
                      className="alert alert-danger w-100 d-flex text-danger py-1"
                      aria-live="assertive"
                    >
                      {(errors.email as FieldError).message}
                    </span>
                  )}
                </div>

                {/* OTP input */}
                <label htmlFor="email" className="form-label mb-0">
                  OTP Verification
                </label>
                <div className="input-group mb-4">
                  <input
                    id="otp"
                    aria-label="otp code"
                    type="text"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter OTP Code"
                    autoComplete="one-time-code"
                    {...register("seed", OTPValidation)}
                  />
                </div>
                <div className="w-100">
                  {errors.seed && (
                    <span
                      className="alert alert-danger w-100 d-flex text-danger py-1"
                      aria-live="assertive"
                    >
                      {(errors.seed as FieldError).message}
                    </span>
                  )}
                </div>

                {/* password input */}
                <label htmlFor="password" className="form-label mb-0">
                  New Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="password"
                    aria-label="password"
                    type={showPass["password"] ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your New Password"
                    autoComplete="new-password"
                    {...register("password", passwordValidation)}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        showPass["password"] ? "" : "-slash"
                      }`}
                      role="button"
                      onClick={() => showPassHandler("password")}
                      aria-label="show password"
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.password && (
                    <span
                      className="alert alert-danger w-100 d-flex text-danger py-1"
                      aria-live="assertive"
                    >
                      {(errors.password as FieldError).message}
                    </span>
                  )}
                </div>

                {/* confirm password input */}
                <label htmlFor="confirmPassword" className="form-label mb-0">
                  Confirm Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="confirmPassword"
                    aria-label="confirm password"
                    type={showPass["confirmPassword"] ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Confirm New Password"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      ...passwordValidation,
                      validate: (value) =>
                        value === password ||
                        "New password and confirm password do not match",
                    })}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        showPass["confirmPassword"] ? "" : "-slash"
                      }`}
                      role="button"
                      aria-label="show password"
                      onClick={() => showPassHandler("confirmPassword")}
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.confirmPassword && (
                    <span
                      className="alert alert-danger w-100 d-flex text-danger py-1"
                      aria-live="assertive"
                    >
                      {(errors.confirmPassword as FieldError).message}
                    </span>
                  )}
                </div>

                {/* submit button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn form-btn w-75 rounded-4 text-light mt-4 mx-auto d-block"
                  role="submit"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
