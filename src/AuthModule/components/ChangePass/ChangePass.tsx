import { useContext, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import style from "./ChangPass.module.css";
import logo from "../../../assets/images/PMS3.png";
import { AuthContext } from "../../../context/AuthContext";
import { userURLs } from "../../../lib/APIs";

export default function ChangePass() {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);

  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

  const toggleShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((prev) => !prev);

  type Inputs = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  interface ErrorResponse {
    message: string;
  }

  const onSubmit = async (data: Inputs) => {
    try {
      await axios.put(userURLs.changePassAPI, data, {
        headers: { Authorization: token },
      });
      toast.success("Password changed successfully");
      navigate("/dashboard");
    } catch (error: any) {
      const axiosError = error as AxiosError;
      const errorResponse = axiosError.response?.data as ErrorResponse;
      if (axiosError.response?.status === 401) {
        toast.error("Your session has expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(errorResponse?.message || "An error occurred");
      }
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
                <h2 className="form-header lh-1">Change Password</h2>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* Old Password Input */}
                <label
                  htmlFor="oldPassword"
                  className="form-label mb-0 opacity-75 "
                >
                  Old Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your Old Password"
                    autoComplete="old-password"
                    {...register("oldPassword", {
                      required: "Old Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
                      },
                    })}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        !showOldPassword ? "-slash" : ""
                      }`}
                      role="button"
                      onClick={toggleShowOldPassword}
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.oldPassword && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.oldPassword as FieldError).message}
                    </span>
                  )}
                </div>

                {/* New Password Input */}
                <label
                  htmlFor="password"
                  className="form-label mb-0 opacity-75"
                >
                  New Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter your New Password"
                    autoComplete="new-password"
                    {...register("newPassword", {
                      required: "New Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message:
                          "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
                      },
                    })}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        !showNewPassword ? "-slash" : ""
                      }`}
                      role="button"
                      onClick={toggleShowNewPassword}
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.newPassword && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.newPassword as FieldError).message}
                    </span>
                  )}
                </div>

                {/* Confirm New Password Input */}
                <label
                  htmlFor="confirmNewPassword"
                  className="form-label mb-0 opacity-75"
                >
                  Confirm New Password
                </label>
                <div className="input-group mb-4">
                  <input
                    id="confirmNewPassword"
                    type={showConfirmNewPassword ? "text" : "password"}
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Confirm Your New Password"
                    autoComplete="Confirm-password"
                    {...register("confirmNewPassword", {
                      required: "Password Confirmation is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                        message: "Not Matched with the new password provided.",
                      },
                    })}
                  />
                  <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                    <i
                      className={`fa-regular text-light fa-eye${
                        !showConfirmNewPassword ? "-slash" : ""
                      }`}
                      role="button"
                      onClick={toggleShowConfirmNewPassword}
                    ></i>
                  </span>
                </div>
                <div className="w-100">
                  {errors.confirmNewPassword && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.confirmNewPassword as FieldError).message}
                    </span>
                  )}
                </div>

                {/* submit button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn form-btn w-75 rounded-4 text-light mt-5 mx-auto d-block"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Save"
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
