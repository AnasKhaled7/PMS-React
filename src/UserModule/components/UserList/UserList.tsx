import axios from "axios";
import { userURLs } from "../../../lib/APIs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import NoData from "../../../SharedModule/components/NoData/NoData";

interface User {
  id: number;
  userName: string;
  userEmail: string;
  imagePath: string;
  email: string;
}
interface ParamsType {
  userName?: string;
  email?: string;
  groupValue?: number;
  pageNo: number;
  pageSize: number;
}
interface SelectedUser {
  isActivated: boolean;
  id: number;
}
interface ResponseType {
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageNumber: number;
  pageSize: number;
}

export default function UserList() {
  const { base } = userURLs;
  const { token } = useContext(AuthContext);

  const [usersList, setUsersList] = useState<User | any>([]);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [groupValue, setGroupValue] = useState<number | undefined>();

  const getUserNameValue = (e: any) => {
    setUserName(e.target.value);
    getUsersList({
      pageNo: currentPage,
      pageSize: 10,
      userName: e.target.value,
      groupValue: groupValue,
    });
  };

  const getRoleValue = (e: any) => {
    setGroupValue(e.target.value);
    getUsersList({
      pageNo: currentPage,
      pageSize: 10,
      userName: userName,
      groupValue: e.target.value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = (user: any) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getUsersList({ pageNo: pageNumber, pageSize: 10 });
  };

  const getUsersList = async ({
    pageNo,
    pageSize,
    userName,
    groupValue,
  }: ParamsType) => {
    try {
      const response = await axios.get(`${base}`, {
        headers: {
          Authorization: token,
        },
        params: {
          pageNumber: pageNo,
          pageSize: pageSize,
          userName: userName,
          groups: groupValue,
        },
      });
      setResponse(response?.data);
      setUsersList(response?.data?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const activateUserHandler = async (id: number) => {
    try {
      await axios.put(
        `${base}/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      handleClose();
      getUsersList({ pageNo: currentPage, pageSize: 10 });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getUsersList({ pageNo: currentPage, pageSize: 10 });
  }, [currentPage]);

  const blockModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedUser?.isActivated ? "Deactivate user" : "Activate user"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to{" "}
        {selectedUser?.isActivated ? "deactivate" : "activate"} this user?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={selectedUser?.isActivated ? "danger" : "success"}
          onClick={() => {
            if (selectedUser?.id) {
              activateUserHandler(selectedUser.id);
            }
          }}
        >
          {selectedUser?.isActivated ? "Deactivate" : "Activate"}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <header className="headerModule">
        <h2 className="textStyle">Users</h2>
      </header>
      {show && blockModal}
      <div className="moduleContainer">
        <div className="container-fluid tableContainer rounded">
          <div className="row my-3">
            <div className="col-md-9">
              <div className="input-group mt-3">
                <span className="input-group-text border-end-0 bg-transparent">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 searchInput"
                  placeholder="Search"
                  onChange={getUserNameValue}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="input-group mt-3">
                <select
                  className="form-select"
                  name="groupValue"
                  onChange={getRoleValue}
                >
                  <option defaultValue={""} disabled>
                    Search by Role
                  </option>
                  <option value={""}>All Roles</option>
                  <option value={1}>Manager</option>
                  <option value={2}>Employee</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-white tableRow fw-normal border border-secondary"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="text-white tableRow fw-normal border border-secondary"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-white tableRow fw-normal border border-secondary"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="text-white tableRow fw-normal border border-secondary"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-white tableRow fw-normal border border-secondary"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {usersList?.length > 0 ? (
                  usersList?.map((user: any) => (
                    <tr key={user?.id}>
                      <td className="text-capitalize grayText">
                        {user?.userName}
                      </td>
                      <td>
                        {user?.isActivated ? (
                          <span className="px-3 py-1 bg-success rounded-5 text-light">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-danger rounded-5 text-light">
                            Not Active
                          </span>
                        )}
                      </td>
                      <td className="grayText">{user?.phoneNumber}</td>
                      <td className="grayText">{user?.email}</td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <i
                            className="fa-solid fa-ellipsis-vertical"
                            role="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></i>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a
                                className="dropdown-item text-success textStyle"
                                href="#"
                              >
                                <i className="fa-solid fa-eye text-success"></i>{" "}
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item text-danger textStyle"
                                href="#"
                                onClick={() => handleShow(user)}
                              >
                                <i className="fa-solid fa-ban text-danger"></i>{" "}
                                Block
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-end align-items-center">
            <div className="col-md-3 grayText">
              <div>
                Showing
                <div className="dropdown d-inline border rounded mx-2">
                  <select
                    className="btn dropdown-toggle"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                  >
                    {response?.totalNumberOfPages &&
                      Array.from(
                        { length: response.totalNumberOfPages },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                  </select>
                </div>
                of {response?.totalNumberOfRecords} Results{" "}
              </div>
            </div>
            <div className="col-md-3 grayText d-flex">
              Page {response?.pageNumber} of {response?.totalNumberOfPages}
              <div className="ms-4">
                <i
                  className="fa-solid fa-angle-left me-5"
                  role="button"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                ></i>
                <i
                  className="fa-solid fa-angle-right"
                  role="button"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(
                        prevPage + 1,
                        response?.totalNumberOfPages || prevPage
                      )
                    )
                  }
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
