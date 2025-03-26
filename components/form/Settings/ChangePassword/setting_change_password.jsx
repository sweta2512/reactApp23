import React, { useCallback, useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { ResetAndChangeComponent } from "../../../utilities/reset_refresh";
import { showError, showInfo } from "../../../utilities/toast_message";
import { changePassword } from "../../../../store/reducer/Settings/ChangePassword/changePasswordSlice";

const SettingChangePasswordForm = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [icon1, setIcon1] = useState("nopassword");
  const [type1, setType1] = useState("password");
  const [icon2, setIcon2] = useState("nopassword");
  const [type2, setType2] = useState("password");
  const [icon3, setIcon3] = useState("nopassword");
  const [type3, setType3] = useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleToggle = (e) => {
    if (type1 === "password") {
      setType1("text");
      setIcon1("showpassword");
    } else {
      setType1("password");
      setIcon1("nopassword");
    }
  };
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

  // useEffect(()=>{
  //   changePasswordHandler({
  //     confirmPassword,currentPassword,newPassword
  //   })
  //   console.log(newPassword, '  ',currentPassword,'    ', confirmPassword)
  // },[newPassword,currentPassword,confirmPassword])
  const changePasswordHandler = useCallback(() => {
    let isNewPassword = false;
    let isConfirmPassword = false;
    let isCurrentPassword = false;

    if (!currentPassword) {
      showError("Current Password is required", toast);
      isCurrentPassword = false;
    } else {
      isCurrentPassword = true;
    }

    if (!newPassword) {
      showError("New Password is required", toast);
      isNewPassword = false;
    } else {
      console.log(newPassword.length, "ewPassword.length");
      if (newPassword.length < 6) {
        showError("New password should have minimum 6 characters", toast);
        isNewPassword = false;
      } else {
        isNewPassword = true;
      }
    }

    if (!confirmPassword) {
      showError("Confirm Password is required", toast);
      isConfirmPassword = false;
    } else {
      isConfirmPassword = true;
    }

    if(confirmPassword!==newPassword){
      showError("New and Confirm password is not same.", toast);
      return false;
    }

    if (isCurrentPassword && isNewPassword && isConfirmPassword) {
      dispatch(
        changePassword({ newPassword, currentPassword, confirmPassword })
      );
    }
  }, [newPassword, currentPassword, confirmPassword]);

  const resetHandler = useCallback(() => {
    setConfirmPassword("");
    setNewPassword("");
    setCurrentPassword("");
  }, []);
  return (
    <Container>
      <Toast ref={toast} />
      <Row className="justify-content-center p-5">
        <Col md={7}>
          <div className="p-0">
            {" "}
            <Form.Group as={Row} className="mb-1" controlId="current-password">
              <Form.Label column sm="3">
                Current Password <span className="error">*</span>
              </Form.Label>
              <Col sm="10">
               <div className="input_wrap">
                <Form.Control
                  type={type1}
                  name="currnt_password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  //   placeholder={}
                />
                <span className="password-toggle" onClick={handleToggle}>
                  {icon1 === "nopassword" ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
                </div>
              </Col>
            </Form.Group>
          </div>
          <div className="p-0">
            {" "}
            <Form.Group as={Row} className="mb-1" controlId="new-password">
              <Form.Label column sm="3">
                New Password <span className="error">*</span>
              </Form.Label>
              <Col sm="10">
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
          <div className="p-0">
            {" "}
            <Form.Group as={Row} className="mb-1" controlId="confirm-password">
              <Form.Label column sm="3">
                Confirm Password <span className="error">*</span>
              </Form.Label>
              <Col sm="10">
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
          <div className="p-0">
            <Row>
              <Col sm="3">
                <span>Note:</span>
              </Col>
              <Col sm="9">
                <ol>
                  <li>Leading and trailing spaces will be ignored</li>
                  <li>New password should have minimum 6 characters</li>
                </ol>
                <div className="reset_btn">
                <ResetAndChangeComponent
            resetHandle={resetHandler}
            changePasswordHandle={changePasswordHandler}
          />
                </div>
              </Col>
            </Row>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default SettingChangePasswordForm;
