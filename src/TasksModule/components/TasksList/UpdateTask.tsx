import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { FieldError } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateTask({
  id,
  handleCloseEditModal,
  updateTaskAndUpdateList,
  currentTask,
}: {
  id: string;
  handleCloseEditModal: () => void;
  updateTaskAndUpdateList: (id: string) => void;
  currentTask: any;
}) {
  let { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  type Inputs = {
    title: string;
    description: string;
    employeeId: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: any) => {
    try {
      let res = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleCloseEditModal();
      toast.success("Task Updated Successfully");
      updateTaskAndUpdateList(id);
    } catch (error: any) {
      toast.error(error.response.data.message);
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

  useEffect(() => {
    if (currentTask) {
      setValue("title", currentTask.title);
      setValue("description", currentTask.description);
      setValue("employeeId", currentTask.employeeId);
    }
  }, [currentTask, setValue]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="cateField d-flex flex-column my-3">
          <label htmlFor="title" className="">
            Title
          </label>
          <div className="input-group mb-4">
            <input
              id="title"
              aria-label="title"
              type="text"
              className="form-control bg-transparent border-1 rounded-3 shadow-none text-dark p-2 text-dark-placeholder w-100"
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
        </div>
        <div className="cateField d-flex flex-column my-3">
          <label htmlFor="description" className="">
            Description
          </label>
          <div className="input-group mb-4">
            <input
              id="description"
              aria-label="description"
              type="text"
              className="form-control bg-transparent border-1 rounded-3 shadow-none text-dark p-2 text-dark-placeholder w-100"
              placeholder="description"
              autoComplete="description"
              {...register("description")}
            />
          </div>
          <div className="w-100">
            {errors.title && (
              <div className="alert alert-danger py-1" aria-live="assertive">
                {(errors.title as FieldError).message}
              </div>
            )}
          </div>
        </div>
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
        <div className="d-flex justify-content-end">
          <button
            disabled={isSubmitting}
            className="btn add-task-btn text-white "
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
