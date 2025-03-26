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
import {readCardAction , updateCardAction} from "../../../store/reducer/UserAccount/userAccountSlice";
import moment from "moment";
import {formatExpiryDate} from '../../../services/helper'
import { showError, showSuccess } from "../../utilities/toast_message";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserAccountCreditCardModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [mpID, setMpID] = useState(null);
  let toast = useRef(null);
  let { id, creditCard, market_place } = useSelector(
    (state) => state?.showHideModal?.user_account_credit_data
  )||[];
  const { creditCardData } = useSelector((state) => state?.userAccount);
 

  const {
    card_holder_name,
    card_no,
    card_type,
    locationData,
    phone,
    cvv,
    zip_code,
    expiration_date,
    address,
    user_credential,    
  } = creditCardData ||{};

  useMemo(() => {
    switch (market_place) {
      case "Tickets":
        setMpID(1);
        break;
      case "AXs":
        setMpID(1);
        break;
      case "TI":
        setMpID(1);
        break;
      case "WF":
        setMpID(1);
        break;
      default:
    }
  }, [market_place]);

  useEffect(() => {
    if (show === true) {
      dispatch(readCardAction({ mpID: mpID, ID: id })).then(
        (response) => {
          if (response.meta.requestStatus === "rejected") {
            showError(response?.payload, toast);
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
        }
      );
    }
  }, [dispatch, show, id, mpID]);

  

 
  

  const [nameOnCreditCard, setNameOnCreditCard] = useState(card_holder_name || "");
  const [cardNumber, setCardNumber] = useState(card_no || "");
  const [cardCvv, setCardCvv] = useState(cvv || "");
  const [cardType, setCardType] = useState(card_type || "");
  const [cardExpiry, setCardExpiry] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const countryRef = useRef("");


  //set field values
  useEffect(() => {
    setNameOnCreditCard(card_holder_name);
    setCardNumber(card_no);
    setCardCvv(cvv);
    setCardType(card_type);
    let expirydate = formatExpiryDate(expiration_date);

    setCardExpiry(expirydate || "");
    setAddressOne(address || "");
   
    setZipcode(zip_code || "");
    setPhoneNo(phone || "");
    let country = locationData?.country?.selected?.[0];
    let state = locationData?.state?.selected?.[0];
    let city = locationData?.city?.selected?.[0];
   
    setSelectedCountry(
      {
        code: country?.id,
        name: country?.name,
      } || []
    );
    setSelectedState(
      {
        code: state?.id,
        name: state?.name,
      } || []
    );
    setSelectedCity(
      {
        code: city?.id,
        name: city?.name,
      } || []
    );
  }, [
    card_holder_name,
    card_no,
    cvv,
    expiration_date,
    address,
    card_type,
    zip_code,
    user_credential,
    locationData,
    phone
  ]);

  useMemo(() => {
    let city = locationData?.city?.options;
    let state = locationData?.state?.options;
    let country = locationData?.country?.options;

    
    cityRef.current = city?.map((value, index) => {     
      return {
        name: value?.name,
        code: value?.id,
      };
    });

    stateRef.current = state?.map((value, index) => {     
      return {
        name: value?.name,
        code: value?.id,
      };
    });
    countryRef.current = country?.map((value, index) => {
      return {
        name: value?.name,
        code: value?.id,
      };
    });
  }, [locationData]);

  //handle update here
  const handleUpdate = () => {

    if(!cardExpiry){
      return false;
    }
    let month = moment(cardExpiry, ["YYYY-MM-DD"]).format("MM")
    let year = moment(cardExpiry, ["YYYY-MM-DD"]).format("yy")
    let expiry;
    if (cardExpiry?.length === 5) {
      expiry = cardExpiry;
    } else {
      expiry = month + "/" + year?.slice(-2);
    }
     
   
    //return;
    dispatch(
      updateCardAction({
        userID: id,      
        city: selectedCity?.code||"",
        state: selectedState?.code||"",
        country: selectedCountry?.code||"",
        cardNumber: cardNumber||"",
        nameOnCard: nameOnCreditCard||"",
        cvv: cardCvv||"",
        expiry: expiry||"",
        addressLine: addressOne||"",
        zip: zipcode||"",
        phone: phoneNo||"",
        cardType:cardType,        
      })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {       
          showSuccess(response?.payload?.message, toast);     
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
    setZipcode("");
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
              Edit credit card: <span className="warning">{creditCard}</span>
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
                      Card type <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="card_type"
                        onChange={(e) => setCardType(e.target.value)}
                        value={cardType || ""}
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
                          let dateFormat = moment(date, ["YYYY-MM-DD"]).format("MM/yy")                                                 
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
              
                <div className="p-0  mt-3">
                  <Form.Group as={Row} className="mb-1" controlId="admin_name">
                    <Form.Label column sm="3" className="add_admin">
                      City <span className="error">*</span>
                    </Form.Label>
                    <Col sm="9">
                      <Dropdown
                        value={selectedCity || []}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        options={cityRef.current}
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
                        options={stateRef.current}
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
                        options={countryRef.current}
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

export default React.memo(UserAccountCreditCardModal);
