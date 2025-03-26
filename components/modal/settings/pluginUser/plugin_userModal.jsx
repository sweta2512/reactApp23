import React, { useState, useEffect, useMemo, useRef  } from "react";
import { useDispatch , useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import {addPluginUser , pluginUserMainTable} from "../../../../store/reducer/Settings/PluginUser/pluginUserSlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { emailValidation} from "../../../../services/helper";




export default function PluginUserModal({ handleClose, show }) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const {tableData} = useSelector((state)=>state.pluginUser)



  //add plugin user
  const handleAddAdmin = () => {

    if (!name) {
      showError("Name is required", toast);
      return false;
    }

    if (!displayName) {
      showError("Display Name is required", toast);
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


    dispatch(
      addPluginUser({
        userName: name,
        displayName: displayName,
        email: email,
        share: false,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        showSuccess(res.payload, toast);
        dispatch(pluginUserMainTable())
      }
      if (res.meta.requestStatus === "rejected") {
        showError(res.payload, toast);
      }
    });
  };


  // Add and share plugin user
  const handleAddAndShareAdmin = () => {
     if (!name) {
      showError("Name is required", toast);
      return false;
    }
    if (!displayName) {
      showError("Display Name is required", toast);
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

    dispatch(
      addPluginUser({
        userName: name,
        displayName: displayName,
        email: email,
        share: true,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        showSuccess(res.payload, toast);
        dispatch(pluginUserMainTable());
      }
      if (res.meta.requestStatus === "rejected") {
        showError(res.payload, toast);
      }
    });
  };


  const handleReset = ()=>{
    setName('');
    setEmail('');
    setDisplayName('');
    
  }
  return (
    <>
    <Toast ref={toast}/>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new plugin user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="4" className="add_admin">
                      User Name <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                    <Form.Label column sm="4" className="add_admin">
                      Display name <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
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
                    <Form.Label column sm="4" className="add_admin">
                      Email address <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
            Add User
          </Button>

          <Button
            variant="primary"
            className="addAdminButton"
            onClick={handleAddAndShareAdmin}
          >
            <PersonAddAltIcon />
            Add & Share
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
