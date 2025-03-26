import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../utilities/toast_message";
import {buyingAccountTicketPasswordForm,updateBuyingAccountTicketPasswordAction} from "../../../store/reducer/BuyingAccount/ModalActions/updatePasswordSlice";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../store/reducer/BuyingAccount/buyingAccountSlice";


const TicketPasswordModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  let {id}= useSelector((state) => state.showHideModal?.ticketPasswordData);
  
  const {ticket_password_form_data} = useSelector(
    (state) => state.buyingaccountUpdatePassword
  );
  const data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;

  const [password, setPassword] = useState('');
  const [email, setEmail]= useState('')


  useEffect(() => {
    if (show === true) {
      dispatch(buyingAccountTicketPasswordForm({ dataID: id }));
    }
  }, [dispatch, show , data]);

  useEffect(() => {
    setPassword(ticket_password_form_data?.data?.user_credential?.tickets_password || "");
    setEmail(ticket_password_form_data?.data?.email||"")
   
  },[ticket_password_form_data,handleClose]);
 
 
  const handleReset = () => {
    setPassword('')
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
          ticketPW: password,
        };
      }
      return item;
    });

    dispatch(updateBuyingAccountTicketPasswordAction({ dataID: id ,newPass:password})).then((response)=>{
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
                  <Col className="mt-5" style={{fontSize:'14px'}}>
                    <span>
                      {" "}
                      * Password should be contain first charecter in capital
                      letter.
                    </span>
                    <br></br>
                    <span>
                      {" "}
                      * Password should be contain atleast 8 charecters.
                    </span>
                    <br></br>
                    <span>
                      {" "}
                      * Password should not be any special charecter.
                    </span>
                    <br></br>
                    <span>
                      {" "}
                      * If passwod is not contain format then system will be
                      convert password in format.
                    </span>
                    <br></br>
                  </Col>
                </div>
                <div className="p-2 mt-4">
                  <Button
                    variant="primary"
                    className="Update_Buying_account"
                    onClick={handleReset}
                    style={{ marginLeft: "115px" }}
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
                      marginRight: "2px",
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

export default React.memo(TicketPasswordModal);
