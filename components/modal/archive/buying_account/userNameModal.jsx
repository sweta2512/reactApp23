import React, { useEffect, useState, useRef, useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  getBuyingAccountUserNameForm,
  updateBuyingAccountUserName,
} from "../../../../store/reducer/BuyingAccount/ModalActions/updateUserNameSlice";
import { Dropdown } from "primereact/dropdown";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";

const UsernameModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const linkedAccountRef = useRef(null);
  const { id, mp } = useSelector(
    (state) => state.archiveBuyingAccount?.user_name_data
  );
  const formData = useSelector(
    (state) => state?.buyingAccountUpdateUserName?.form_data?.data
  );

  const [marketPlace, setMarketPlace] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [cardActiveAccount, setCardActiveAccount] = useState("");

  useEffect(() => {
    dispatch(getBuyingAccountUserNameForm({ dataID: id }));
  }, [id]);

  useEffect(() => {
    setEmail(formData?.formData?.email || "");
    setFirstname(formData?.formData?.first_name);
    setLastname(formData?.formData?.last_name);

    setCardActiveAccount(
      {
        code: id,
        name: formData?.linkedAccount[0]?.email,
      } || []
    );

    switch (mp) {
      case "TM":
        setMarketPlace("Ticket Master");
        break;
      case "axs":
        setMarketPlace("AXS");
        break;
      case "liveNation":
        setMarketPlace("liveNation");
        break;
      default:
    }
  }, [formData, mp, show, id]);

  useMemo(() => {
    linkedAccountRef.current = formData?.linkedAccount?.map((value, index) => {
      return {
        name: value?.email,
        code: id,
      };
    });
  }, [formData?.linkedAccount]);

  //reset handle
  const handleReset = () => {
    setEmail("");
    setLastname("");
    setFirstname("");
    setCardActiveAccount([]);
  };

  //handle update
  const handleUpdate = () => {
    dispatch(
      updateBuyingAccountUserName({
        email,
        dataID: id,
        firstName: firstname,
        lastName: lastname,
        activeAccountsID: cardActiveAccount?.code,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload?.message, toast);
        
      }
      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload, toast);
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
            <span style={{ fontSize: "18px" }}>
              Update User :{" "}
              <span className="warning">
                {email || ""}  [{marketPlace}]
              </span>
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  <Form.Group as={Row} className="mb-1">
                    <Form.Label column sm="4" className="add_admin">
                      Account Active <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      {/* <Form.Select style={{ width: "420px" }}>
                        <option>Default select</option>
                      </Form.Select> */}

                      <Dropdown
                        value={cardActiveAccount}
                        onChange={(e) => setCardActiveAccount(e.target.value)}
                        options={linkedAccountRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="cstm-input-text w-100"
                        appendTo="self"
                        //style={{ width: "400px" }}
                        name="country"
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="new-password"
                  >
                    <Form.Label column sm="4" className="add_admin">
                      First name <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0">
                  {" "}
                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="confirm-password"
                  >
                    <Form.Label column sm="4" className="add_admin">
                      Last Name <span className="error">*</span>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        name="keyword"
                         onChange={(e) => setLastname(e.target.value)}
                        value={lastname || ""}
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
            style={{ float: "right" }}
            className="closeAdminButton "
          >
            <i className="fa fa-times"></i> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(UsernameModal);
