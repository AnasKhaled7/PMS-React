import React, { useContext, useEffect, useState } from "react";
import "./TasksList.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import CustomModal from "./CustomModal";
import { toast } from "react-toastify";

import noData from "../../../assets/images/no-data.png";

export default function TasksList() {
  interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    employee: {
      userName: string;
    };
    project: {
      title: string;
    };
    creationDate: string;
  }

  const [taskId, setTaskId] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTask, setShowTask] = useState(false);

  const handleCloseTask = () => setShowTask(false);
  const handleShowTask = () => setShowTask(true);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [id, setId] = useState<string | undefined>();

  const [pageSize, setPageSize] = useState<number[]>([]);

  const [searchByName, setSearchByName] = useState("");

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const { token }: any = useContext(AuthContext);

  let navigate = useNavigate();

  const navigateToAddNewTask = () => {
    navigate("/dashboard/task-data");
  };

  const getTasks = async (pageSize: number, pageNo: number, title: string) => {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task/manager`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            pageSize: pageSize,
            pageNumber: pageNo,
            title: title,
          },
        }
      );
      setPageSize(
        Array(res.data.totalNumberOfPages)
          .fill(null, 0, res.data.totalNumberOfPages)
          .map((_, i) => i + 1)
      );
      setTasks(res.data.data as Task[]);
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const getTaskById = async (id: string) => {
    id = taskId;
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(res.data as Task);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get task by ID");
    }
  };

  const deleteTaskAndUpdateList = async (id: string) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTasks((tasks: Task[]) => tasks.filter((task) => task.id !== id));
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  const updateTaskAndUpdateList = async (id: string) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3003/api/v1/Task/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTasks((tasks: Task[]) =>
        tasks.map((task) => (task.id === id ? (response.data as Task) : task))
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };

  const getNameValue = (e: any) => {
    setSearchByName(e.target.value);
    getTasks(5, 1, e.target.value);
  };

  useEffect(() => {
    getTasks(pageSize[0], 1, searchByName);
  }, []);

  return (
    <div className="tasks container py-4">
      <div className="head d-flex justify-content-between pb-3">
        <h3>Tasks</h3>
        <button
          onClick={navigateToAddNewTask}
          className="btn add-task-btn rounded-5 text-light px-5"
        >
          + Add New Task
        </button>
      </div>
      {tasks.length > 0 ? (
        <div className="bg-div">
          <div className="tasks-area">
            <div style={{ position: "relative" }}>
              <input
                onChange={getNameValue}
                className="form-control bg-transparent border-1 rounded-5 shadow-none text-dark py-2 px-5 w-50 mb-3 text-dark-placeholder"
                type="text"
                placeholder="Search by title"
                style={{ paddingLeft: "30px" }} // Make room for the icon
              />
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              ></i>
            </div>
            <div className="scrollable-table">
              <table className="table table-striped">
                <thead>
                  <tr className="table-header">
                    <th>#</th>
                    <th className="col-name" scope="col">
                      Title
                    </th>
                    <th className="col-name" scope="col">
                      Status
                    </th>
                    <th className="col-name" scope="col">
                      User
                    </th>
                    <th className="col-name" scope="col">
                      Project
                    </th>
                    <th className="col-name" scope="col">
                      Date Created
                    </th>
                    <th className="col-name" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task: Task) => (
                    <tr key={task?.id}>
                      <th scope="row">{task?.id}</th>
                      <td className="col-name">{task?.title}</td>
                      <td className="col-name">{task?.status}</td>
                      <td className="col-name">{task?.employee.userName}</td>
                      <td className="col-name">{task?.project.title}</td>
                      <td className="col-name">
                        {new Date(task?.creationDate)
                          .toISOString()
                          .slice(0, 10)}
                      </td>
                      <td className="col-name">
                        <Dropdown>
                          <Dropdown.Toggle className="border-0 bg-none p-0"></Dropdown.Toggle>

                          <Dropdown.Menu className="top-50">
                            <Dropdown.Item
                              onClick={() => {
                                getTaskById(task?.id);
                                handleShowTask();
                                setTaskId(task?.id);
                              }}
                            >
                              <i className="fa-solid fa-eye p-1"></i>
                              View
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => {
                                handleShowEditModal();
                                setCurrentTask(task);
                                setId(task?.id);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square p-1"></i>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => {
                                handleShow();
                                setId(task?.id);
                              }}
                            >
                              <i className="fa-solid fa-trash p-1"></i>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul className="pagination flex-pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {pageSize.map((page, index) => (
                    <li
                      key={page}
                      className="page-item"
                      onClick={() => {
                        getTasks(5, index + 1, searchByName);
                      }}
                    >
                      <a className="page-link">{page}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <CustomModal
                show={show}
                handleClose={handleClose}
                title="Delete Task"
              >
                <DeleteTask
                  handleClose={handleClose}
                  id={id}
                  deleteTaskAndUpdateList={deleteTaskAndUpdateList}
                />
              </CustomModal>

              <CustomModal
                show={showTask}
                handleClose={handleCloseTask}
                title="Task Details"
              >
                <div>
                  <p>Task Title: {task?.title}</p>
                  <p>Task Description: {task?.description}</p>
                  <p>Task Status: {task?.status}</p>
                  <p>Task User: {task?.employee?.userName}</p>
                  <p>Task Project: {task?.project?.title}</p>
                  <p>
                    Task Date Created:{" "}
                    {task?.creationDate &&
                      new Date(task?.creationDate).toISOString().slice(0, 10)}
                  </p>
                </div>
              </CustomModal>

              <CustomModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                title="Edit Task"
              >
                <UpdateTask
                  handleCloseEditModal={handleCloseEditModal}
                  id={id || ""}
                  updateTaskAndUpdateList={(id: string) =>
                    updateTaskAndUpdateList(id)
                  }
                  currentTask={currentTask}
                />
              </CustomModal>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center pt-5">
          <h2 className="text-danger">No Tasks Exist</h2>
          <div>
            <img src={noData} className="w-100" alt="No data" />
          </div>
        </div>
      )}
    </div>
  );
}
