import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import style from "../Login/Login.module.css";
import logo from "../../../assets/images/PMS3.png";


export default function Register() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => setShowPass(!showPass);

  type Inputs = {
    email: string;
    password: string;
    userName: string;
    country: string;
    phoneNumber: string;
    confirmPassword: string;
    profileImage: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

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
    console.log(data);
    let registerFormData = appendToFormData(data);
    let token = localStorage.getItem("adminToken");
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
      toast.success("registeration is successfully");
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className={`${style["auth-container"]}`}>
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
                        className="form-control  bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your userName "
                        aria-label="Enter your userName "
                        aria-describedby="addon-wrapping"
                        {...register("userName", {
                          required: "userName is required",
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
                        placeholder="Enter your phoneNumber  "
                        aria-label="Enter your phoneNumber  "
                        aria-describedby="addon-wrapping"
                        {...register("phoneNumber", {
                          required: "phoneNumber  is required",
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
                        type={showPass ? "text" : "password"}
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your password"
                        autoComplete="current-password"
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
                        type={showPass ? "text" : "confirmPassword"}
                        className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                        placeholder="Enter your confirmPassword"
                        autoComplete="current-password"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                            message:
                              "confirmPassword must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
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
                    type="file"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
                    aria-label="Enter your profileImage"
                    aria-describedby="addon-wrapping"
                    {...register("profileImage")}
                  />
                </div>
                {errors.profileImage && (
                  <p className="alert alert-danger">
                    {errors.profileImage.message}
                  </p>
                )}

                {/* links */}
                {/* <div className="d-flex justify-content-between">
                  <Link
                    to="/login"
                    className="text-decoration-none text-light"
                  >
                    Login Now ?
                  </Link>
                  <Link
                    to="/verification"
                    className="text-decoration-none text-light"
                  >
                    verify Account  ?
                  </Link>
                </div> */}

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
