import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface IProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<IProps> = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;