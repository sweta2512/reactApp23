import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../../utilities/toast_message";
import {
  updateAdminEmailAction,
  adminMainTable,
  updateTableData
} from "../../../../store/reducer/Settings/Admin/adminSlice";
import { emailValidation} from "../../../../services/helper";
import "../../../style/modal.css";

export function UpdateAdminEmailModal({ handleClose, show }) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const { toBeUpdated , tableData } = useSelector((state) => state.admin);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState(null);
 

  useEffect(() => {
    setName(toBeUpdated.name);
    setEmail(toBeUpdated.email);
    setConfirmEmail(toBeUpdated.email);
  }, [toBeUpdated, show]);

  const handleUpdateAdmin = () => {
    if (!name) {
      showError("Name is required", toast);
      return false;
    }

    if (!email) {
      showError("Email is required", toast);
      return false;
    }

    if (!emailValidation(email)) {
      showError("Email is not valid.", toast);
      return false;
    }
    
    if (!confirmEmail) {
      showError("Confirm Email is required", toast);
      return false;
    }

    if (email !== confirmEmail) {
      showError("Email and Confirm Email is not same.", toast);
      return false;
    }


    let updatedData = tableData?.data?.map((item) => {
      if (item.id === toBeUpdated.id) {
        return {
          ...item,
          email: email,
        };
      }
      return item;
    });
    
    dispatch(updateAdminEmailAction({id:toBeUpdated.id, name, email, confirmEmail })).then(
      (response) => {
        if (response.meta.requestStatus === "rejected") {
          showError(response.payload, toast);
        }
        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(response.payload, toast);
          dispatch(updateTableData({ ...tableData ,data: updatedData}));
        }
      }
    );
  };


  const handleReset = () => {
    setName("");
    setEmail("");
    setConfirmEmail("");
  };
  return (
    <>
     <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}        
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update plugin admin{" "}
            <span style={{ color: " #F80" }}>{toBeUpdated?.name}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="4" className="add_admin">
                      Admin<span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setName(e.target.value)}
                        value={name??""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="new-password"
                  >
                    <Form.Label column sm="4" className="add_admin">
                      Email  <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email??""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="new-password"
                  >
                    <Form.Label column sm="4" className="add_admin">
                      Confirm Email  <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        value={confirmEmail??""}
                      />
                    </Col>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="closeAdminButton"
            onClick={handleClose}
          >
            <CloseIcon />
            Close
          </Button>
          <Button
            variant="danger"
            className="resetAdminButton"
            onClick={handleReset}
          >
            <RestartAltIcon />
            Reset
          </Button>
          <Button
            variant="info"
            className="addAdminButton"
            onClick={handleUpdateAdmin}
          >
            <PersonAddAltIcon />
            Update
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
