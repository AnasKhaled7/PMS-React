import axios from "axios";
import { FieldError, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/PMS3.png";
import style from "../Login/Login.module.css";
import { userURLs } from "../../../lib/APIs";
import { OTPValidation, emailValidation } from "../../../lib/InputValidator";

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
      await axios.put(`${userURLs.verifyAPI}`, data);
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
                    {...register("email", emailValidation)}
                  />
                </div>

                {errors.email && (
                  <div className="alert alert-danger py-1">
                    {(errors.email as FieldError).message}
                  </div>
                )}

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
                    {...register("code", OTPValidation)}
                  />
                </div>
                {errors.code && (
                  <div className="alert alert-danger py-1">
                    {(errors.code as FieldError).message}
                  </div>
                )}

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
