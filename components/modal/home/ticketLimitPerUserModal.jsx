import React , {useState, useEffect , useRef}from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { ticketPurchaseLimitPerUserHomeAction } from "../../../store/reducer/Home/homemodalSlice";
import { showError, showSuccess } from "../../utilities/toast_message";
import { Toast } from "primereact/toast";
import CloseIcon from "@mui/icons-material/Close";


const TicketLimitPerUserModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  let toast = useRef(null);
  let {ticketLimit, id} = useSelector((state) => state.modal.ticketLimitPerUserData);
  const [purchaseLimitData, setPurchaseLimitData] = useState(0)

  useEffect(()=>{
    setPurchaseLimitData(ticketLimit)
  },[ticketLimit])

  const handleUpdate = () => {
    dispatch(
      ticketPurchaseLimitPerUserHomeAction({
        eventID: id,
        newVal: purchaseLimitData,
      })
    ).then((response) => {
      console.log(response, "response");
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response?.payload?.message, toast);
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
        className='cstm-capacity-outer custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Ticket Limit Per User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-1" controlId="keywords">
                <Form.Label column sm="4">
                  Ticket Limit Per User
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="keyword"
                    onChange={(e) => {
                      setPurchaseLimitData(e.target.value)
                    }}
                    value={purchaseLimitData||''}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                className="Update_Buying_account"
                // onClick={handleReset}
                style={{ marginLeft: "169px" }}
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
                  marginRight: "57px",
                  borderRadius: "none",
                }}
              >
                <i className="fa fa-edit"></i>
                Update
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="closeAdminButton">
          <CloseIcon />Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(TicketLimitPerUserModal);
