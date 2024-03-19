import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  Dropdown: any;
}

const Logout = ({ Dropdown }: Props) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Dropdown.Item as="button" className="text-danger" onClick={handleShow}>
        <i className="fa-solid fa-right-from-bracket pe-2" />
        Logout
      </Dropdown.Item>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Clicking on the logout button will log you out of the system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Logout;
