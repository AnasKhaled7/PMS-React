import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../../assets/images/PMS3.png";

export default function Register() {
  const navigate = useNavigate();

  // const [showPass, setShowPass] = useState(false);
  // const showPassHandler = () => setShowPass(!showPass);

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

  const password = watch("password"); // Watching the 'password' field

  const appendToFormData = (data: Inputs) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  // handle axios (call api)
  const onSubmit = async (data: Inputs) => {
    // console.log(data);
    const registerFormData = appendToFormData(data);
    let token = localStorage.getItem("token");
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Register",
        registerFormData,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      navigate("/verification");
      toast.success("registration is successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
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
                      UserName
                    </label>
                    <div className="input-group flex-nowrap mb-3">
                      <input
                        id="userName"
                        type="text"
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your userName"
                        aria-label="Enter your userName"
                        aria-describedby="addon-wrapping"
                        {...register("userName", {
                          required: "UserName is required",
                          minLength: {
                            value: 4,
                            message: "UserName must be at least 4 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z]+\d*$/,
                            message:
                              "UserName must contain characters and end with numbers without spaces",
                          },
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger">
                        {errors.userName.message}
                      </p>
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
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
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
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your country  "
                        aria-label="Enter your country  "
                        aria-describedby="addon-wrapping"
                        {...register("country", {
                          required: "country  is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    {/* phoneNumber   */}
                    <label htmlFor="phoneNumber" className="form-label mb-0">
                      phoneNumber
                    </label>
                    <div className="input-group flex-nowrap mb-3">
                      <input
                        id="phoneNumber"
                        type="text"
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your Egyptian phone number"
                        aria-label="Enter your Egyptian phone number"
                        aria-describedby="addon-wrapping"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^(01)[0-9]{9}$/,
                            message:
                              "Please enter a valid Egyptian phone number",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="alert alert-danger">
                        {errors.phoneNumber.message}
                      </p>
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
                        placeholder="Enter your New Password"
                        autoComplete="new-password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                            message:
                              "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
                          },
                        })}
                      />
                      {/* it would be better if we changed this to a button because we have an onClick here. This will make it accessible for keyboard users as well by using the tap to navigate through them and space or enter to toggle the password */}
                      {/* <span className="input-group-text bg-transparent border-0 border-bottom rounded-0">
                        <i
                          className={`fa-regular text-light fa-eye${
                            showPass ? "-slash" : ""
                          }`}
                          role="button"
                          onClick={showPassHandler}
                        ></i>
                      </span> */}

                      <button
                        className="btn btn-outline-secondary bg-transparent border-0 border-bottom rounded-0"
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
                        <span className="alert alert-danger w-100 d-flex">
                          {(errors.password as FieldError).message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/* confirmPassword input */}
                    <label
                      htmlFor="confirmPassword"
                      className="form-label mb-0"
                    >
                      confirmPassword
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
                          required: "confirmPassword is required",
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
                        <span className="alert alert-danger w-100 d-flex">
                          {(errors.confirmPassword as FieldError).message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* profileImage    */}
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
                            // Check if files are selected
                            const fileSizeInMB = value[0].size / (1024 * 1024); // Calculate file size in MB
                            if (fileSizeInMB > 5) {
                              // Maximum allowed file size (5 MB)
                              return "File size exceeds the limit (5 MB)";
                            }
                          }
                          return true; // Validation passed
                        },
                      },
                    })}
                  />
                </div>
                {errors.profileImage && (
                  <p className="alert alert-danger">
                    {errors.profileImage.message}
                  </p>
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
