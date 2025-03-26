import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toast } from "primereact/toast";
import Form from "react-bootstrap/Form";
import {
  verifyOtp,
  closeOtpModal,
} from "../../../store/reducer/Auth/authSlice";
import { showError } from "../../utilities/toast_message";

export function OtpModal({ handleClose, show }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let otpRef = useRef(null);
  let toast = useRef(null);
  const { credential } = useSelector((state) => state.auth);


  const SubmitOtpHandle = () => {
    const otp = otpRef.current.value.replaceAll(" - ", "");
    const POSITION =  otpRef.current.value.indexOf("-");
    var digitAndHyphenOnly= /(^[0-9]+(\s*-\s*[0-9]+)?$)/;  
    //var digitAndHyphenOnly= /(^[0-9]+[-]*[0-9]+$)/;  

    if (otpRef.current.value !== 9 && !otpRef.current.value.includes("-")) {
      showError("Enter OTP in correct format", toast);
      return false;
    }

    if (POSITION !== 4 ) {
      showError("Enter OTP in correct format", toast);
      return false;
    }


    if (digitAndHyphenOnly.test(otpRef.current.value) === false ) {
      showError("Enter OTP in digit format", toast);
      return false;
    }
 
    dispatch(verifyOtp({ ...credential, otp: otp })).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
      if (response.payload.token && response.payload.status === "Success") {
        dispatch(closeOtpModal());
        navigate("/api/home");
      }
    });
  };


  //Handle keydown function
  const handleKeyDown = (e) => {
    let textLength = e.target.value.length;
    if (textLength === 3 && !e.target.value.includes("-")) {
      otpRef.current.value = e.target.value + " - ";
    }
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
            Enter your OTP (sent on your email address {credential.email})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="login_password">
                  <Form.Control
                    type="text"
                    placeholder="Opt"
                    ref={otpRef}
                    autocomplete="on"
                    onChange={(e) => handleKeyDown(e)}
                    maxLength="9"
                    name="otp"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  className="closeAdminButton ">
          <i className="fa fa-times"></i>Close
          </Button>

          <Button variant="secondary" onClick={SubmitOtpHandle}>
            <i className="fa fa-arrow-up"></i> Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
