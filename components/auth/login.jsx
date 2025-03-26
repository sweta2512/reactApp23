import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { image } from "../../constant/img";
import { useNavigate } from "react-router-dom";
import {
  login,
  setshowOtpModal,
  closeOtpModal,
} from "../../store/reducer/Auth/authSlice";
import { showError } from "../utilities/toast_message";
import "../style/login.css";
import { Toast } from "primereact/toast";
import { OtpModal } from "../modal/auth/otpModal";

const Login = () => {
  const dispatch = useDispatch();
  const { showOtpModal } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let hiddenRef = useRef(null);
  let toast = useRef(null);

  const forgetPasswordRedirect = () => {
    let path = "/admin/forgotPassword";
   // let path = "/dbapp/forgot_password";
    navigate(path);
  };

  const loginHandler = async () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let access = "db_app";

    dispatch(login({ email: email, password: password, access: access })).then(
      (response) => {
        if (response.meta.requestStatus === "rejected") {
          showError(response.payload, toast);
        }

        if (response.payload.token && response.payload.status === "Success") {
          navigate("/api/home");
        } else if (response.payload.status === "Success" && "token" in response.payload === false) {
          dispatch(setshowOtpModal({ email: email, password: password }));
        }
      }
    );
  };

  return (
    <Container fluid>
      <Toast ref={toast} />
      <Row id="pwd-container">
        <Col>
          <Stack gap={1} id="pwd-container">
            <div className="logo-section">
              <img src={image.logo} />
            </div>
            <div className="login-form">
              <Form className="form-signin" role="login">
                <h2>Admin Login</h2>
                <Form.Group className="mb-3" controlId="login_email">
                  <Form.Control
                    type="email"
                    placeholder="email"
                    required
                    ref={emailRef}
                    autocomplete="on"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="login_password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="access">
                  <Form.Control type="hidden" ref={hiddenRef} />
                </Form.Group>

                <Button
                  type="button"
                  className="btn login"
                  variant="primary"
                  id="request_otp"
                  onClick={loginHandler}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={forgetPasswordRedirect}
                >
                  Forget Password
                </Button>
              </Form>
            </div>
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col>
          <div id="footer_login">
            <div className="container">
              <p className="footer-block">www.algevents.com</p>
            </div>
          </div>
        </Col>
      </Row>

      <OtpModal
        show={showOtpModal}
        handleClose={() => {
          dispatch(closeOtpModal());
        }}
      />
    </Container>
  );
};

export default Login;
