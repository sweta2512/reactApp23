import React, { useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { updatePluginUserEmail , updateTableData } from "../../../../store/reducer/Settings/PluginUser/pluginUserSlice";
import { showError ,showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";
import { emailValidation} from "../../../../services/helper";



const UpdatePluginUserEmailModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const {tableData} = useSelector((state)=>state.pluginUser)
 
  const { id, email } = useSelector(
    (state) => state.showHideModal?.pluginUserEmailData || []
  );
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(email);
  }, [email , show]);


  //HANDLE UPDATE
  const handleUpdate = () => {
    if (!userEmail ) {
      showError("Email is required", toast);
      return false;
    }

    if (!emailValidation(userEmail)) {
      showError("Email is not valid.", toast);
      return false;
    }

    let updatedData = tableData?.result?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          email: userEmail,
        };
      }
      return item;
    });


    dispatch(updatePluginUserEmail({ userID: id, email: userEmail })).then(
      (res) => { 
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(updateTableData({ ...tableData ,result: updatedData}));
          showSuccess(res.payload.data?.message, toast);
          
        }
        if (res.meta.requestStatus === "rejected") {
          showError(res.payload.error?.message, toast);
        }

      }
    );
  };

  const handleReset = () => {
    setUserEmail("");
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
            <span style={{fontSize:'20px'}}>
              Update Plugin User email{" "}
              <span className="warning">{userEmail}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="4" className="add_admin">
                      Email <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="email"
                        onChange={(e) => setUserEmail(e.target.value)}
                        value={userEmail || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>

                {/* <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      User Name <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </Col>
                  </Form.Group>
                </div> */}

                <div className="p-0">
                  <Button
                    variant="primary"
                    className="Update_Buying_account"
                    onClick={handleReset}
                    style={{ marginLeft: "169px" }}
                  >
                    <i className="fa fa-undo"></i>
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    className="Update_Buying_account"
                    onClick={() => handleUpdate()}
                    style={{
                      float: "right",
                      marginRight: "57px",
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
            className="closeAdminButton"
          >
            <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePluginUserEmailModal;
