import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

export default function DeleteTask({id, handleClose, deleteTaskAndUpdateList}: {id: any, handleClose: any, deleteTaskAndUpdateList: (id: any) => Promise<void>}) {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting },
  } = useForm();

  let{ token } = useContext(AuthContext);

  const onSubmit = async () => {
    try {
      await deleteTaskAndUpdateList(id);
        handleClose()
        reset()
          setTimeout(() => {
            toast.success("delete success", {position: "top-right"}), 100
          })
    
    } catch (error) {
        toast.error(error as string);
    }
  };

  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
            <div className="cateField d-flex flex-column align-items-center my-3">
            {/* <img src={deletImg} alt="deleteImg" className="my-4"/> */}
            <h3>Delete This Task ?</h3>
            <p className="text-body-tertiary">are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
              <div className="d-flex justify-content-end">
              <button disabled={isSubmitting} className="btn btn-outline-danger">
              {isSubmitting ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          'Delete This Item'
        )}
              </button>
              </div>
          </form>
  </div>;
}
