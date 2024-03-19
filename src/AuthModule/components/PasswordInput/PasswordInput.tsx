import React, { useState } from 'react';

interface PasswordInputProps {
  label: string;
  register: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, register }) => {
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="input-group mb-4">
    <input
      id="password"
      type={showPass ? "text" : "password"}
      className="form-control bg-transparent border-0 border-bottom rounded-0 shadow-none text-light py-1 px-2"
      placeholder={label}
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
      <button
        className="btn btn-outline-secondary bg-transparent border-0 border-bottom rounded-0"
        type="button"
        onClick={togglePasswordVisibility}
        aria-label={showPass ? "Hide password" : "Show password"}
      >
        <i className={`fa-regular text-light fa-eye${showPass ? "" : "-slash"}`}></i>
      </button>
    </span>
  </div>
  );
};

export default PasswordInput;
