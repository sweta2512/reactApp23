import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../utilities/toast_message";
import { emailValidation } from "../../services/helper";
import { useDispatch , useSelector } from "react-redux";
import { forgetPasswordEmail } from "../../store/reducer/Auth/authSlice";

const ForgetPassword = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      showError("Email is required.", toast);
      return;
    }

    if (!emailValidation(email)) {
      showError("Email is not valid.", toast);
      return false;
    }
    dispatch(forgetPasswordEmail({ email })).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload.message, toast);
      }

      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload.message, toast);
      }
    });
  };



  //reset handle
  const handleReset = () => {
    setEmail("");
  };



  return (
    <>
      <Toast ref={toast} />

      <Stack
        gap={1}
        id="content"
        style={{ minHeight: "50vh", marginTop: "60px" }}
      >
        <Row>
          <Col>
            <Form.Group as={Row} className="mt-5">
              <Form.Label column sm="3">
                Email address <span className="error">*</span>
              </Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  name="keyword"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="6" className=" d-flex cstm-row-btn-btm upload">
            <Button
              variant="primary"
              className="resetAdminButton"
              style={{ marginRight: "-106px" }}
              onClick={handleReset}
            >
              <RestartAltIcon />
              Reset
            </Button>
          </Col>
          <Col sm="6" className="d-flex cstm-row-btn-btm upload">
            <Button
              variant="primary"
              className="addAdminButton"
              onClick={handleSubmit}
              style={{ marginLeft: "-575px" }}
            >
              <i className="fa fa-arrow-right"></i>
              Submit
            </Button>
          </Col>
        </Row>
      </Stack>
    </>
  );
};

export default ForgetPassword;
