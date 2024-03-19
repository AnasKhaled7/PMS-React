import axios from "axios";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/PMS3.png";
import { userURLs } from "../../../lib/APIs";
import {
  countryValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../../../lib/InputValidator";

export default function Register() {
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
    userName: string;
    country: string;
    phoneNumber: string;
    confirmPassword: string;
    profileImage: FileList;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Inputs>();

  const password = watch("password");

  const appendToFormData = (data: Inputs) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  const onSubmit = async (data: Inputs) => {
    const registerFormData = appendToFormData(data);

    try {
      await axios.post(`${userURLs.registerAPI}`, registerFormData);
      navigate("/verification");
      toast.success("Registered successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid py-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-9">
            <div className="logo text-center mb-2">
              <img src={logo} alt="Logo" />
            </div>
            <div className="form-container rounded-4 text-light p-5">
              <div className="form-info mb-5">
                <p className="lh-1 form-title">welcome to PMS</p>
                <h2 className="form-header lh-1">Create New Account</h2>
              </div>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    {/* userName  */}
                    <label htmlFor="userName" className="form-label mb-0">
                      Username
                    </label>
                    <div className="input-group flex-nowrap mb-3">
                      <input
                        id="userName"
                        type="text"
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                        placeholder="Enter your userName"
                        aria-label="Enter your userName"
                        aria-describedby="addon-wrapping"
                        {...register("userName", userNameValidation)}
                      />
                    </div>
                    {errors.userName && (
                      <div className="alert alert-danger py-1">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
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
                        {...register("email", emailValidation)}
                      />
                    </div>
                    <div className="w-100">
                      {errors.email && (
                        <div className="alert alert-danger py-1">
                          {(errors.email as FieldError).message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {/* country   */}
                    <label htmlFor="country" className="form-label mb-0">
                      Country
                    </label>
                    <div className="input-group flex-nowrap mb-3">
                      <input
                        id="country"
                        type="text"
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                        placeholder="Enter your country  "
                        aria-label="Enter your country  "
                        aria-describedby="addon-wrapping"
                        {...register("country", countryValidation)}
                      />
                    </div>
                    {errors.country && (
                      <div className="alert alert-danger py-1">
                        {errors.country.message}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    {/* phoneNumber   */}
                    <label htmlFor="phoneNumber" className="form-label mb-0">
                      phone
                    </label>
                    <div className="input-group flex-nowrap mb-3">
                      <input
                        id="phoneNumber"
                        type="text"
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                        placeholder="Enter your Egyptian phone number"
                        aria-label="Enter your Egyptian phone number"
                        aria-describedby="addon-wrapping"
                        {...register("phoneNumber", phoneNumberValidation)}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <div className="alert alert-danger py-1">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {/* password input */}
                    <label htmlFor="password" className="form-label mb-0">
                      Password
                    </label>
                    <div className="input-group mb-4">
                      <input
                        id="password"
                        aria-label="password"
                        type={showPass["password"] ? "text" : "password"}
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                        placeholder="Enter your Password"
                        autoComplete="new-password"
                        {...register("password", passwordValidation)}
                      />

                      <button
                        className="btn bg-transparent border-0 border-bottom rounded-0"
                        type="button"
                        onClick={() => showPassHandler("password")}
                        aria-label={
                          showPass ? "Hide password" : "Show password"
                        }
                      >
                        <i
                          className={`fa-regular text-light fa-eye${
                            showPass["password"] ? "" : "-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <div className="w-100">
                      {errors.password && (
                        <div className="alert alert-danger py-1">
                          {(errors.password as FieldError).message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/* confirmPassword input */}
                    <label
                      htmlFor="confirmPassword"
                      className="form-label mb-0"
                    >
                      Confirm Password
                    </label>
                    <div className="input-group mb-4">
                      <input
                        id="confirmPassword"
                        aria-label="confirm password"
                        type={showPass["confirmPassword"] ? "text" : "password"}
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      <button
                        className="btn btn-outline-secondary bg-transparent border-0 border-bottom rounded-0"
                        type="button"
                        onClick={() => showPassHandler("confirmPassword")}
                        aria-label={
                          showPass ? "Hide password" : "Show password"
                        }
                      >
                        <i
                          className={`fa-regular text-light fa-eye${
                            showPass["confirmPassword"] ? "" : "-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <div className="w-100">
                      {errors.confirmPassword && (
                        <div className="alert alert-danger py-1">
                          {(errors.confirmPassword as FieldError).message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* profileImage */}
                <label htmlFor="confirmPassword" className="form-label mb-2">
                  profileImage
                </label>

                <div className="input-group flex-nowrap mb-3">
                  <input
                    id="profileImage"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                    aria-label="Upload your profile image"
                    aria-describedby="addon-wrapping"
                    {...register("profileImage", {
                      required: "Profile image is required",
                      validate: {
                        fileSize: (value: FileList | null) => {
                          if (value && value.length > 0) {
                            const fileSizeInMB = value[0].size / (1024 * 1024);
                            if (fileSizeInMB > 5) {
                              return "File size exceeds the limit (5 MB)";
                            }
                          }
                          return true;
                        },
                      },
                    })}
                  />
                </div>
                {errors.profileImage && (
                  <div className="alert alert-danger py-1">
                    {errors.profileImage.message}
                  </div>
                )}

                {/* submit button */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn form-btn w-50 rounded-4 text-light mt-4 mx-auto d-block"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Register"
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
