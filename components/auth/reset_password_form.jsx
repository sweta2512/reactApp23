import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../utilities/toast_message";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Footer from "../../../src/components/navigation/footer";

import { resetPassword } from "../../store/reducer/Auth/authSlice";

const ResetPasswordForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const toast = useRef(null);
  const dispatch = useDispatch();

  const [icon2, setIcon2] = useState("nopassword");
  const [type2, setType2] = useState("password");
  const [icon3, setIcon3] = useState("nopassword");
  const [type3, setType3] = useState("password");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
console.log(token.length,'token')
 
  const handleToggle2 = (e) => {
    if (type2 === "password") {
      setType2("text");
      setIcon2("showpassword");
    } else {
      setType2("password");
      setIcon2("nopassword");
    }
  };
  const handleToggle3 = (e) => {
    if (type3 === "password") {
      setType3("text");
      setIcon3("showpassword");
    } else {
      setType3("password");
      setIcon3("nopassword");
    }
  };

 

  const handleSubmit = ()=>{
    if (!token) {
      showError("Token is required", toast);
      return false;
    }

    if (!newPassword) {
      showError("New Password is required", toast);     
      return false;
    } else {
      if (newPassword.length < 6) {
        showError("New password should have minimum 6 characters", toast);       
        return false;
      } 
    }

    if (!confirmPassword) {
      showError("Confirm Password is required", toast);
      return false;
    }


    if (confirmPassword !== newPassword) {
      showError("New and Confirm password is not same.", toast);
      return false;
    }
   
      dispatch(
        resetPassword({
          token: token,
          newPass: newPassword,
          confirmPass: confirmPassword,
        })
      ).then((response) => {
        if (response.meta.requestStatus === "rejected") {
          showError(response.payload.message, toast);
        }

        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(
            <div>
              {response.payload.message + "  : "}
              <a
                href={`${process.env.REACT_APP_URL}dbapp`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {`${process.env.REACT_APP_URL}dbapp`}
              </a>
            </div>,
            toast
          );
          //showSuccess(response.payload.message+' Please Login Here :  '+  process.env.REACT_APP_URL+'dbapp', toast);
        }
      });
    

  }


  const handleReset = ()=>{
    setConfirmPassword('');
    setNewPassword('');
  }


  return (
    <>
      <Toast ref={toast} />

      <Stack
        gap={1}
        id="content"
        style={{ minHeight: "60vh", marginTop: "60px" }}
      >
        <Row style={{marginTop: "60px" ,marginLeft:'10%'}}>
          <Col md={7}>
            <div className="p-0">
              {" "}
              <Form.Group as={Row} className="mb-1" controlId="new-password">
                <Form.Label column sm="3">
                  New Password <span className="error">*</span>
                </Form.Label>
                <Col sm="7">
                  <div className="input_wrap">
                    <Form.Control
                      type={type2}
                      name="new_password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                    <span className="password-toggle2" onClick={handleToggle2}>
                      {icon2 === "nopassword" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                </Col>
              </Form.Group>
            </div>
            <div className="p-0 mt-3">
              {" "}
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="confirm-password"
              >
                <Form.Label column sm="3">
                  Confirm Password <span className="error">*</span>
                </Form.Label>
                <Col sm="7">
                  <div className="input_wrap">
                    <Form.Control
                      type={type3}
                      name="confirm_password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    <span className="password-toggle3" onClick={handleToggle3}>
                      {icon3 === "nopassword" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                </Col>
              </Form.Group>
            </div>
            <div className="p-0 mt-4">
              <Row style={{fontSize:'14px'}}>
                <Col sm="3">
                  <span>Note:</span>
                </Col>
                <Col sm="9">
                  <ol>
                    <li>Leading and trailing spaces will be ignored</li>
                    <li>New password should have minimum 6 characters</li>
                  </ol>
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
                    style={{ marginLeft: "5px" }}
                  >
                    <i className="fa fa-upload"></i>
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Stack>

      <Footer />
    </>
  );
};

export default ResetPasswordForm;
