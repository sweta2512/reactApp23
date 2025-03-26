import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreditCardModalForEvent({ handleClose, show, info }) {
  const { ReadCreditCard } = useSelector((state) => state?.creditCard);
  const { totalTicketPurchasedModalData } = useSelector((state) => state?.archiveEvent);

  console.log(totalTicketPurchasedModalData, "infooooo", ReadCreditCard);

//   useMemo(() => {
//     switch (mp) {
//       case "TM":
//         setMpID(1);
//         break;
//       case "AX":
//         setMpID(1);
//         break;
//       case "TI":
//         setMpID(1);
//         break;
//       case "WF":
//         setMpID(1);
//         break;
//       default:
//     }
//   }, [mp]);



  //SHOW CALender tooltip
  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  }; 

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="cstm-credit_card-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h5>
              Edit credit card: <span className="warning">{"card"}</span>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                {" "}
                <div className="p-0">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Name on card <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="name"
                        // onChange={(e) => setNameOnCreditCard(e.target.value)}
                        // value={nameOnCreditCard || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Card number <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="card_number"
                        // onChange={(e) => setCardNumber(e.target.value)}
                        // value={cardNumber || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Card CVV <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="card_cvv"
                        // onChange={(e) => setCardCvv(e.target.value)}
                        // value={cardCvv || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Expiry Date <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <DatePicker
                        name="expiry_date"
                        // selected={cardExpiry || ""}
                        // value={cardExpiry || ""}
                        renderMonthContent={renderMonthContent}
                        showMonthYearPicker
                        dateFormat="MM/yy"
                        className="expiry-cstm-class"
                        // onChange={(date) => {
                        //   let dateFormat = moment(date, ["YYYY-MM-DD"]).format(
                        //     "MM/yy"
                        //   );
                        //   if (cardExpiry !== dateFormat) {
                        //     setCardExpiry(date);
                        //   }
                        // }}
                        style={{ width: "421px" }}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Active account <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        //  value={cardActiveAccount}
                        // onChange={(e) => setCardActiveAccount(e.target.value)}
                        // options={activeRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="w-full md:w-14rem"
                        appendTo="self"
                        style={{ width: "400px" }}
                        name="country"
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Account priority <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        //value={cardAccountPriority || []}
                        disabled
                        // onChange={(e) => setCardAccountPriority(e.target.value)}
                        // options={linkedAccountRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="w-full md:w-14rem"
                        appendTo="self"
                        style={{ width: "400px" }}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Address line 1 <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="address1"
                        // onChange={(e) => setAddressOne(e.target.value)}
                        // value={addressOne || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Address line 2
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="address2"
                        // onChange={(e) => setAddressTwo(e.target.value)}
                        // value={addressTwo || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0  mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      City <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        // value={selectedCity || []}
                        // onChange={(e) => setSelectedCity(e.target.value)}
                        // options={cityRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="w-full md:w-14rem"
                        appendTo="self"
                        style={{ width: "400px" }}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0  mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      State <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        // value={selectedState || []}
                        // onChange={(e) => setSelectedState(e.target.value)}
                        // options={stateRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="w-full md:w-14rem"
                        appendTo="self"
                        style={{ width: "400px" }}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0  mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Country <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        // value={selectedCountry}
                        // onChange={(e) => {
                        //   setSelectedCountry(e.target.value);
                        // }}
                        // options={countryRef.current}
                        optionLabel="name"
                        placeholder="Nothing Selected"
                        filter
                        className="w-full md:w-14rem"
                        appendTo="self"
                        style={{ width: "400px" }}
                        // placeholder={
                        //   selectedCountry?.name
                        //     ? selectedCountry?.name
                        //     : "Nothing selected"
                        // }
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      ZIP <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="zip"
                        // onChange={(e) => setZipcode(e.target.value)}
                        // value={zipcode || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Phone Number <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="phone"
                        // onChange={(e) => setPhoneNo(e.target.value)}
                        // value={phoneNo || ""}
                      />
                    </Col>
                  </Form.Group>
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
}

export default CreditCardModalForEvent;
