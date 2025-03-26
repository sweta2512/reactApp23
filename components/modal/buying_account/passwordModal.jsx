import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toast } from "primereact/toast";
import Form from "react-bootstrap/Form";
import { showError, showSuccess } from "../../utilities/toast_message";
import {
  buyingAccountPasswordForm,
  updateBuyingAccountPasswordAction,
} from "../../../store/reducer/BuyingAccount/ModalActions/updatePasswordSlice";

import { setSelectedProduct } from "../../../store/reducer/BuyingAccount/buyingAccountSlice";
import { useDispatch } from "react-redux";

const PasswordModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let { id } = useSelector(
    (state) => state.showHideModal?.ticketPasswordData
  );
  const { password_form_data } = useSelector(
    (state) => state.buyingaccountUpdatePassword
  );
  const data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;
 

  useEffect(() => {
    if (show === true) {
      dispatch(buyingAccountPasswordForm({ dataID: id }));
    }
  }, [dispatch, show , data]);

  useEffect(() => {
    setPassword(password_form_data?.data?.user_credential?.pass || "");
    setEmail(password_form_data?.data?.email || "");
  }, [password_form_data, handleClose]);

  const handleReset = () => {
    setPassword("");
  };
  const handleUpdate = () => {

    if (!password) {
      showError("Password is requird.", toast);
      return false;
    }
    
    let updatedData = data?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          PW: password,
        };
      }
      return item;
    });



    dispatch(
      updateBuyingAccountPasswordAction({ dataID: id, newPass: password })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
        handleClose();
      }
      if (response.meta.requestStatus === "fulfilled") {
        if (response?.payload?.status === "Failed") {
          showError(response.payload.message, toast);
          handleClose();
        } else if (response?.payload?.status === "Success") {
          dispatch(setSelectedProduct({ data: updatedData }));
          showSuccess(response?.payload?.message, toast);
          handleClose();
        }
      }
    });
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
            <h5>
              Update user password: <span className="warning">{email}</span>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                {" "}
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Password <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Button
                    variant="primary"
                    className="Update_Buying_account"
                    onClick={handleReset}
                    style={{ marginLeft: "117px" }}
                  >
                    <i className="fa fa-undo"></i>
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    className="Update_Buying_account"
                    onClick={handleUpdate}
                    style={{
                      float: "right",
                      marginRight: "1px",
                      borderRadius: "none",
                    }}
                  >
                    <i className="fa fa-edit"></i>
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ float: "right" }}
            className="closeAdminButton "
          >
            <i className="fa fa-times"></i> Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(PasswordModal);
