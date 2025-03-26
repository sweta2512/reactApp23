import React, { useState, useEffect, useMemo, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";
import {
  createGroupManageCard,
  closeModal,
  getManageCardGroupingFormData
} from "../../../../store/reducer/Settings/ManageCardGroup/manageCardGroupSlice";
import { useDispatch } from "react-redux";

export function ManageCardGroupModal({ handleClose, show }) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [addGroup, setAddGroup] = useState(null);

  const addGroupHandler = () => {
    dispatch(createGroupManageCard({ groupName: addGroup })).then(
      (response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          showSuccess(response?.payload, toast);
          setTimeout(() => {
            dispatch(closeModal());
            dispatch(getManageCardGroupingFormData());
          }, 1000);
        }
        if (response?.meta?.requestStatus === "rejected") {
          showError(response?.payload, toast);
        }
      }
    );
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}

      <div>
      <Toast ref={toast} />
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new group name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Group as={Row} className="mb-1" controlId="add_group">
                <Col sm="3">
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={(e) => setAddGroup(e.target.value)}
                    value={addGroup || ""}
                  />
                </Col>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="secondary" onClick={addGroupHandler}>
              Submit
            </Button>
            {/* <Button variant="primary">Understood</Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
