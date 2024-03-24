import React from "react";

interface Props {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocalSearch = ({ placeholder, onChange }: Props) => {
  return (
    <div className="col-md-4">
      <div className="input-group">
        <span className="input-group-text fs-6">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="search"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default LocalSearch;
