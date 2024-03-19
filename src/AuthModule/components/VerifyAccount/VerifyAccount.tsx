import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import style from "../Login/Login.module.css";
import logo from "../../../assets/images/PMS3.png";


export default function VerifyAccount() {
  const navigate = useNavigate();

  type Inputs = {
    email: string;
    code: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await axios.put(
        "https://upskilling-egypt.com:3003/api/v1/Users/verify",
        data
      );
      localStorage.setItem("token", result?.data?.token);
      toast.success("verification is successfully");
      navigate("/login");
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
              <img src={logo} alt="PMS Logo" />
            </div>
            <div className="form-container rounded-4 text-light p-5">
              <div className="form-info mb-5">
                <p className="lh-1 form-title">welcome to PMS</p>
                <h2 className="form-header lh-1">Verify Account</h2>
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

                {/* code input */}
                <label htmlFor="code" className="form-label mb-0">
                OTP Verification
                </label>
                <div className="input-group mb-4">
                  <input
                    id="code"
                    type="text"
                    className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-0"
                    placeholder="Enter Verification"
                    autoComplete="current-code"
                    {...register("code", {
                      required: "code is required",
                    })}
                  />
                  
                </div>
                <div className="w-100">
                  {errors.code && (
                    <span className="alert alert-danger w-100 d-flex">
                      {(errors.code as FieldError).message}
                    </span>
                  )}
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
                    "Verify Account"
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
