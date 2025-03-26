import React, { useState, useRef } from "react";
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
import { showError, showSuccess } from "../utilities/toast_message";
import {
  addAdmin,
  adminMainTable,
} from "../../store/reducer/Settings/Admin/adminSlice";

import "../style/modal.css";

export function AddUserModal({ handleClose, show }) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [access, setAccess] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailConfirm, setEmailConfirm] = useState(null);

  const handleAddAdmin = () => {
    if (!name) {
      showError("Name is required", toast);
      return false;
    }
    if (!email) {
      showError("Email is required", toast);
      return false;
    }
    if (!emailConfirm) {
      showError("Confirm Email is required", toast);
      return false;
    }
    if (!access) {
      showError("Access is required", toast);
      return false;
    }
    dispatch(addAdmin({ name, email, emailConfirm, access })).then(
      (response) => {
        if (response.meta.requestStatus === "rejected") {
          showError(response.payload, toast);
        }
        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(response.payload.message, toast);
          dispatch(adminMainTable());
        }
      }
    );
  };
  const handleReset = () => {
    setAccess("");
    setName("");
    setEmail("");
    setEmailConfirm("");
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
          <Modal.Title>Add new plugin admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Admin <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                    <Form.Label column sm="3" className="add_admin">
                      Email Address <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="confirm-password"
                  >
                    <Form.Label column sm="3" className="add_admin">
                      Confirm Email Address <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setEmailConfirm(e.target.value)}
                        value={emailConfirm}
                      />
                    </Col>
                  </Form.Group>
                </div>

                <div className="p-0">
                  <Form.Group as={Row} className="mb-1">
                    <Form.Label column sm="3" className="add_admin">
                      Access <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Select
                        onChange={(e) => {
                          setAccess(e.target.value);
                        }}
                      >
                        <option></option>
                        <option value="db_app">Database</option>
                        <option value="scraper_app">Scraper</option>
                        <option value="db_app,scraper_app">
                          Database and Scraper
                        </option>
                      </Form.Select>
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
            onClick={handleAddAdmin}
          >
            <PersonAddAltIcon />
            Add User
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

//Reset admin password Modal
export function ResetAdminPasswordModal({
  handleClose,
  show,
  handleReset,
  handleAddAdmin,
}) {
  const { toBeUpdated } = useSelector((state) => state.admin);
  console.log(toBeUpdated, "admin");

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user password: {toBeUpdated?.email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      New Password<span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        // onChange={(e) => handleFilter(e)}
                        // value={inputValues.keyword}
                        //   placeholder={}
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
                    <Form.Label column sm="3" className="add_admin">
                      Confirm Password <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        // onChange={(e) => handleFilter(e)}
                        // value={inputValues.keyword}
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
            onClick={handleAddAdmin}
          >
            <PersonAddAltIcon />
            Update & Share
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

// update setting admin email

export function UpdateAdminEmailModal({
  handleClose,
  show,
  handleReset,
  handleAddAdmin,
}) {

  const { toBeUpdated } = useSelector((state) => state.admin);
  console.log(toBeUpdated, "admin");
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update plugin admin{" "}
            <span style={{ color: " #F80" }}>{toBeUpdated?.email}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      New Password<span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        // onChange={(e) => handleFilter(e)}
                        // value={inputValues.keyword}
                        //   placeholder={}
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
                    <Form.Label column sm="3" className="add_admin">
                      Confirm Password <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="keyword"
                        // onChange={(e) => handleFilter(e)}
                        // value={inputValues.keyword}
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
            onClick={handleAddAdmin}
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
