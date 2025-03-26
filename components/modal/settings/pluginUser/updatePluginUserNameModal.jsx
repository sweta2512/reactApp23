import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { showError ,showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";
import { updatePluginUserName , updateTableData} from "../../../../store/reducer/Settings/PluginUser/pluginUserSlice";



const UpdatePluginUserNameModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const { tableData } = useSelector((state) => state.pluginUser);
  const { id, display_name } = useSelector(
    (state) => state.showHideModal?.pluginUserNameData || []
  );
  const [name, setName] = useState("");

  useEffect(() => {
    setName(display_name);
  }, [display_name]);

  //handle update
  const handleUpdate = () => {
    let updatedData = tableData?.result?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          display_name: name,
        };
      }
      return item;
    });
    dispatch(updatePluginUserName({ userID: id, userName: name })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(updateTableData({ ...tableData, result: updatedData }));
          showSuccess(res.payload.data.message, toast);
        }
        if (res.meta.requestStatus === "rejected") {
          showError(res.payload.data.message, toast);
        }
      }
    );
  };

  //reset handle
  const handleReset = () => {
    setName("");
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
              Update Plugin User Name <span className="warning">{name}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                {/* <div className="p-0">
                  {" "}
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Email <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Col>
                  </Form.Group>
                </div> */}

                <div className="p-0">
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
                        value={name || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>

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

export default UpdatePluginUserNameModal;
