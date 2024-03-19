import { useContext, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import style from "./ChangPass.module.css";
import logo from "../../../assets/images/PMS3.png";
import { AuthContext } from "../../../context/AuthContext";
import { userURLs } from "../../../lib/APIs";
import { passwordValidation } from "../../../lib/InputValidator";

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const password = watch("newPassword");

  const onSubmit = async (data: Inputs) => {
    try {
      await axios.put(userURLs.changePassAPI, data, {
        headers: { Authorization: token },
      });
      toast.success("Password changed successfully");
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
                    {...register("oldPassword", passwordValidation)}
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

                {errors.oldPassword && (
                  <div className="alert alert-danger py-1">
                    {(errors.oldPassword as FieldError).message}
                  </div>
                )}

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
                    {...register("newPassword", passwordValidation)}
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

                {errors.newPassword && (
                  <div className="alert alert-danger py-1">
                    {(errors.newPassword as FieldError).message}
                  </div>
                )}

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
                      required: "Confirm new password is required",
                      validate: (value) =>
                        value === password || "The passwords do not match",
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

                {errors.confirmNewPassword && (
                  <div className="alert alert-danger py-1">
                    {(errors.confirmNewPassword as FieldError).message}
                  </div>
                )}

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
