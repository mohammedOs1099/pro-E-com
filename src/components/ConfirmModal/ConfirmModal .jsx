// components/ConfirmModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header >
        <Modal.Title className="fw-bold">
          {title || "Confirm Action"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Are you sure you want to continue?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
