import React, { useContext, useEffect, useState } from "react";
import "./TasksList.css";
import { Link, useNavigate } from "react-router-dom";
import { FieldError, useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export default function AddNewTask() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const { token }: any = useContext(AuthContext);

  const backToAllTasks = () => {
    navigate("/dashboard/tasks");
  };

  type Inputs = {
    title: string;
    description: string;
    employeeId: string;
    projectId: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
        let res = await axios.post('https://upskilling-egypt.com:3003/api/v1/Task/', data, {
            headers: {
                Authorization: token,
            },
            });
            console.log(res);
            backToAllTasks();
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Users/?pageSize=10&pageNumber=1`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = async () => {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=30&pageNumber=1`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getProjects();
  }, []);

  return (
    <div className="new-task ">
      <div className="head container py-3">
        <p className=" cursor-pointer" onClick={backToAllTasks}>
          <i className="fa-solid fa-less-than"></i> View All Tasks
        </p>
        <h3>Add a New Task</h3>
      </div>
      <div className="new-task-body d-flex justify-content-center align-items-center">
        <div className="add-task-card bg-white w-75 d-flex justify-content-center align-items-center my-5 py-3 container rounded-4">
          <form className="w-100" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* title input */}
            <label htmlFor="title" className="">
              Title
            </label>
            <div className="input-group mb-4">
              <input
                id="title"
                aria-label="title"
                type="text"
                className="form-control bg-transparent border-1 rounded-3 shadow-none text-dark p-2 w-100 text-dark-placeholder"
                placeholder="Title"
                autoComplete="title"
                {...register("title")}
              />
            </div>
            <div className="w-100">
              {errors.title && (
                <div className="alert alert-danger py-1" aria-live="assertive">
                  {(errors.title as FieldError).message}
                </div>
              )}
            </div>

            {/* description input */}
            <label htmlFor="description" className="">
              Description
            </label>
            <div className="input-group mb-4">
              <textarea
                id="description"
                aria-label="description"
                className="form-control bg-transparent border-1 rounded-3 shadow-none text-dark p-2 w-100 text-dark-placeholder"
                placeholder="Enter your description"
                {...register("description")}
              />
              <span className="input-group-text bg-transparent border-0 border-bottom w-100  rounded-0">
                <i
                  role="button"
                  aria-label="show password"
                  //   onClick={showPassHandler}
                ></i>
              </span>
            </div>
            <div className="w-100">
              {errors.description && (
                <div className="alert alert-danger py-1" aria-live="assertive">
                  {(errors.description as FieldError).message}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between ">
              <div className="input-group mb-4 select-input">
                <select
                  className="form-control text-black"
                  {...register("employeeId")}
                >
                  <option value="">Search By User</option>
                  {users.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-4 flex-nowrap select-input">
                <select
                  className="form-control text-black"
                  {...register("projectId")}
                >
                  <option value="">search by project</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* submit button */}
            <div className="btns d-flex justify-content-between ">
              <button onClick={backToAllTasks} className="btn btn-outline-dark text-black rounded-4 text-light px-3">
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn form-btn rounded-4 text-light px-4"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
