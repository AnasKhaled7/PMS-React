import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { projectURLs } from "../../lib/APIs";

interface Props {
  id: string;
  getProjects: () => void;
}

const DeleteModal = ({ id, getProjects }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${projectURLs.base}/${projectId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Project deleted successfully.");
      handleClose();
      getProjects();
    } catch (error) {
      toast.error("An error occurred while deleting the project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline-danger"
        className="rounded-pill ms-2"
        onClick={handleShow}
      >
        <i className="fa-solid fa-trash me-2"></i>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete this project?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleting this project will remove it from the database. This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            disabled={isLoading}
            onClick={() => deleteProject(id)}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteModal;
