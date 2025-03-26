import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../../utilities/toast_message";
import {
  updateAdminPasswordAction,
  adminMainTable,
} from "../../../../store/reducer/Settings/Admin/adminSlice";

import "../../../style/modal.css";



//Reset admin password Modal
export function ResetAdminPasswordModal({
  handleClose,
  show,  
}) {
  const { toBeUpdated } = useSelector((state) => state.admin);
  
  const toast = useRef(null);
  const dispatch = useDispatch();

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [icon1, setIcon1] = useState("nopassword");
  const [type1, setType1] = useState("password");
  const [icon2, setIcon2] = useState("nopassword");
  const [type2, setType2] = useState("password");

  const handleToggle2 = (e) => {
    if (type2 === "password") {
      setType2("text");
      setIcon2("showpassword");
    } else {
      setType2("password");
      setIcon2("nopassword");
    }
  };



  const handleToggle = (e) => {
    if (type1 === "password") {
      setType1("text");
      setIcon1("showpassword");
    } else {
      setType1("password");
      setIcon1("nopassword");
    }
  };

  const handleUpdateAdminPassword = () => {
   
    if (!password) {
      showError("password is required", toast);
      return false;
    }
    if (!confirmPassword) {
      showError("Confirm Password is required", toast);
      return false;
    }

    if (password.length < 6) {
      showError("Password should have minimum 6 characters", toast);
      return false;
    } 
   
    if (password !== confirmPassword) {
      showError("Password and Confirm Password is not same.", toast);
      return false;
    }

    dispatch(updateAdminPasswordAction({id:toBeUpdated.id, password, passConfirm:confirmPassword })).then(
      (response) => {
        console.log(response,'resssssss')
        if (response.meta.requestStatus === "rejected") {
          showError(response.payload, toast);
        }
        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(response.payload, toast);
          dispatch(adminMainTable());
        }
      }
    );
  };


  const handleReset = ()=>{
    setPassword('');
    setConfirmPassword('');
  }

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
            Update user password:{" "}
            <span className="warning">{toBeUpdated?.name}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="password">
                    <Form.Label column sm="4" className="password">
                      New Password<span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type={type2}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password ?? ""}
                      />
                      <span onClick={handleToggle2} style={{marginTop: '-30px',marginRight: '4px',float: 'right', cursor:'pointer'}}>
                        {icon2 === "nopassword" ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </span>
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="cofirmPassword"
                  >
                    <Form.Label column sm="4" className="cofirmPassword">
                      Confirm Password <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                         type={type1}
                        name="confrimPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword ?? ""}
                      />
                      <span  onClick={handleToggle} style={{marginTop: '-30px',marginRight: '4px',float: 'right' , cursor:'pointer'}}>
                        {icon1 === "nopassword" ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon /> 
                        )}
                      </span>
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
            onClick={handleUpdateAdminPassword}
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