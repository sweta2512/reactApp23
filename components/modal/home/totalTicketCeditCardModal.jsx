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
import {
  updateCreditCardAction,
} from "../../../store/reducer/BuyingAccount/ModalActions/creditCardSlice";
import moment from "moment";
import { formatExpiryDate } from "../../../services/helper";
import { showError, showSuccess } from "../../utilities/toast_message";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreditCardModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [nameOnCreditCard, setNameOnCreditCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cardActiveAccount, setCardActiveAccount] = useState("");
  const [cardAccountPriority, setCardAccountPriority] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const countryRef = useRef("");
  const activeRef = useRef("");
  const linkedAccountRef = useRef("");

  let toast = useRef(null);
  let { id, creditCard } = useSelector(
    (state) => state?.showHideModal?.creditCardData
  );

  const { ReadCreditCard } = useSelector((state) => state?.creditCard);

  const {
    cardName,
    nameOnCard,
    userID,
    phone,
    nameNumber,
    cvv,
    zip,
    expiry,
    address_line_1,
    address_line_2,
    user_credential,
    location,
    activeAccount,
    allLinkedAccount,
  } = ReadCreditCard || {};

  //set field values
  useEffect(() => {
    setNameOnCreditCard(nameOnCard);
    setCardNumber(nameNumber);
    setCardCvv(cvv);
    let expirydate = formatExpiryDate(expiry);

    setCardExpiry(expirydate || "");
    setAddressOne(address_line_1 || "");
    setAddressTwo(address_line_2 || "");
    setZipcode(zip || "");
    setPhoneNo(phone || "");
    let country = location?.country?.selected?.[0]?.split(", ");
    let state = location?.state?.selected?.[0]?.split(", ");
    let city = location?.city?.selected?.[0]?.split(", ");
    let linkeduser = allLinkedAccount?.[0]?.split(", ");
    let activeuser = activeAccount?.[0]?.split(", ");

    setCardAccountPriority(
      {
        code: linkeduser?.[0],
        name: linkeduser?.[1],
      } || []
    );
    setCardActiveAccount(
      {
        code: activeuser?.[0],
        name: activeuser?.[1],
      } || []
    );

    setSelectedCountry(
      {
        code: country?.[0],
        name: country?.[1],
      } || []
    );
    setSelectedState(
      {
        code: state?.[0],
        name: state?.[1],
      } || []
    );
    setSelectedCity(
      {
        code: city?.[0],
        name: city?.[1],
      } || []
    );
  }, [
    nameOnCard,
    nameNumber,
    cvv,
    expiry,
    address_line_1,
    address_line_2,
    zip,
    user_credential,
    location,
    activeAccount,
    allLinkedAccount,
    phone,
  ]);

  useMemo(() => {
    let city = location?.city?.options;
    let state = location?.state?.options;
    let country = location?.country?.options;

    activeRef.current = activeAccount?.map((value, index) => {
      let arr = value?.split(", ");
      return {
        name: arr[1],
        code: arr[0],
      };
    });

    linkedAccountRef.current = allLinkedAccount?.map((value, index) => {
      let arr = value?.split(", ");
      return {
        name: arr[1],
        code: arr[0],
      };
    });

    cityRef.current = city?.map((value, index) => {
      let arr = value?.split(", ");
      return {
        name: arr[1],
        code: arr[0],
      };
    });

    stateRef.current = state?.map((value, index) => {
      let arr = value?.split(", ");
      return {
        name: arr[1],
        code: arr[0],
      };
    });
    countryRef.current = country?.map((value, index) => {
      let arr = value?.split(", ");
      return {
        name: arr[1],
        code: arr[0],
      };
    });
  }, [location, activeAccount, allLinkedAccount]);

  const handleUpdate = () => {
    if (!cardExpiry) {
      return false;
    }
    let month = moment(cardExpiry, ["YYYY-MM-DD"]).format("MM");
    let year = moment(cardExpiry, ["YYYY-MM-DD"]).format("yy");
    let expiry;
    if (cardExpiry?.length === 5) {
      expiry = cardExpiry;
    } else {
      expiry = month + "/" + year?.slice(-2);
    }



    
   
    dispatch(
      updateCreditCardAction({
        ucID: id,
        //ucID: ReadCreditCard?.id,
        newUcID: cardActiveAccount?.code || "",
        oldUcID: cardAccountPriority?.code || "",
        emailPriority: cardAccountPriority?.name || "",
        city: selectedCity?.code || "",
        state: selectedState?.code || "",
        country: selectedCountry?.code || "",
        cardNo: cardNumber || "",
        nameONCard: nameOnCard || "",
        cvv: cardCvv || "",
        expiry: expiry || "",
        address1: addressOne || "",
        address2: addressTwo || "",
        zip: zipcode || "",
        phone: phoneNo || "",
        userID: userID,
      })
    ).then((response) => {
      console.log(response, "response");
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        if (response?.payload?.status === 400) {
          showError(response.payload.message, toast);
        } else if (response?.payload?.status === 200) {
          showSuccess(response?.payload?.message, toast);
        } else if (response?.payload?.status === 403) {
          showSuccess(response?.payload?.message, toast);
        }
      }
    });
  };

  //handle reset here
  const handleReset = () => {
    setNameOnCreditCard("");
    setCardNumber("");
    setCardCvv("");
    setCardExpiry("");
    setAddressOne("");
    setAddressTwo("");
    setZipcode("");
    setCardActiveAccount("");
    setCardAccountPriority("");
    setPhoneNo("");
    setSelectedCity("");
    setSelectedState("");
    setSelectedCountry("");
  };

  //SHOW CALender tooltip
  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  };
  return (
    <>
      <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='cstm-credit_card-outer custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>
              Edit credit card: <span className="warning">{cardName}</span>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className="p-0">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      Name on card <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={(e) => setNameOnCreditCard(e.target.value)}
                        value={nameOnCreditCard || ""}
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
                        onChange={(e) => setCardNumber(e.target.value)}
                        value={cardNumber || ""}
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
                        onChange={(e) => setCardCvv(e.target.value)}
                        value={cardCvv || ""}
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
                      {/* <Form.Control
                        type="text"
                        name="expiry_date"
                        onChange={(e) => setCardExpiry(e.target.value)}
                        value={cardExpiry || ""}
                        placeholder={<MonthYearPicker />}
                      /> */}

                      <DatePicker
                        name="expiry_date"
                        selected={cardExpiry || ""}
                        value={cardExpiry || ""}
                        renderMonthContent={renderMonthContent}
                        showMonthYearPicker
                        dateFormat="MM/yy"
                        onChange={(date) => {
                          //let dateFormat = moment(date, ["YYYY-MM-DD"]).format("MM/yy")
                          let dateFormat = moment(date).format("MM/yy");
                          console.log(date, "date");
                          if (cardExpiry !== dateFormat) {
                            setCardExpiry(date);
                          }
                        }}
                        style={{width: "421px"}}
                        className="expiry-cstm-class"
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
                        value={cardActiveAccount}
                        onChange={(e) => setCardActiveAccount(e.target.value)}
                        options={activeRef.current||[]}
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
                        value={cardAccountPriority || []}
                        disabled
                        onChange={(e) => setCardAccountPriority(e.target.value)}
                        options={linkedAccountRef.current||[]}
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
                        onChange={(e) => setAddressOne(e.target.value)}
                        value={addressOne || ""}
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
                        onChange={(e) => setAddressTwo(e.target.value)}
                        value={addressTwo || ""}
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
                        value={selectedCity || []}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        options={cityRef.current||[]}
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
                        value={selectedState || []}
                        onChange={(e) => setSelectedState(e.target.value)}
                        options={stateRef.current||[]}
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
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                        }}
                        options={countryRef.current||[]}
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
                        onChange={(e) => setZipcode(e.target.value)}
                        value={zipcode || ""}
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
                        onChange={(e) => setPhoneNo(e.target.value)}
                        value={phoneNo || ""}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <div className="p-0 mt-3">
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
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(CreditCardModal);
