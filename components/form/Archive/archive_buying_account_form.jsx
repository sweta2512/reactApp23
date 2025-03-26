import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import Testing from "../../utilities/seperator";
import { MultiSelect } from "primereact/multiselect";

import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import {archiveBuyingAccountFormdata, setFilter} from "../../../store/reducer/Archives/archiveBuyingAccountSlice";
import moment from "moment";

const Archive_buying_account_form = () => {
  const dispatch = useDispatch();
  const optionsMarketPlaceRef= useRef([]); 
  const optionsUserNameRef= useRef([]); 
  const {form_data, filter} = useSelector((state)=>state?.archiveBuyingAccount);
  console.log(form_data, 'from data archive' , filter)
  const [eventstartDate, setEventstartDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [topurchaseDate, setTopurchaseDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  const [inputValues, setInputValues] = useState({
    MP: "",
    userID: "",
  });
  const [cities, setCities] = useState();


  const { MonthPicker, RangePicker } = DatePicker;
  const dateFormat = "MM/DD/YYYY";

  const [dateRangeValue, setDateRangeValue] = useState(
    filter.dateFrom === "" && filter.dateTo === ""
      ? null
      : [
          moment(filter.dateFrom, dateFormat),
          moment(filter.dateTo, dateFormat),
        ]
  );
  


   //options data
   useMemo(() => {
    const marketplace = form_data?.mpID;
    const users = form_data?.users;
    optionsMarketPlaceRef.current = marketplace?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    optionsUserNameRef.current = users?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });
  }, [form_data]);

  

  // handle filter
  useEffect(() => {  
    if (flag===true) {
      handleFilter(inputValues);
    } 
    console.log(inputValues,'inputValues')
  }, [ 
    inputValues.userID,
    inputValues.MP,
    flag
  ]);

  const handleFilter = (inputValues) => {
    
    dispatch(
      setFilter({    
        marketPlace:inputValues?.MP,
        userID:inputValues?.userID,
        dateTo:'',
        dateFrom:'',
      })
    );
  };


  // const handleFilter = (inputValues) => {

    
  // };
const resetFormHandler = ()=>{ 
  setFilter({
    marketPlace:"",
    userID:"",
    dateTo:'',
    dateFrom:'',
  });
  setDateRangeValue(null);
  setFlag(true);
}
  return (
    <Container fluid>
      <Row>
        <Col>
          {" "}
          <Stack gap={1}>
            <div className="p-0">
              {" "}
              <Row className="align-items-center my-2">
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Market Place</span>
                </Col>
                <Col sm={8}>
                  {" "}
                  <MultiSelect
                    value={ inputValues.MP}
                    options={optionsMarketPlaceRef.current}
                    onChange={(e) =>{
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        MP: e.target.value,
                      }))
                      setFlag(true);
                    }}
                    placeholder={"Nothing selected"}
                    filter
                    className="cstm-input-text"
                    style={{ width: "100%" }} 
                    name={"mp"}
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0">
              {" "}
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>User Name</span>
                </Col>
                <Col sm={8}>
                  {" "}
                  <MultiSelect
                    value={ inputValues.userID}
                    options={optionsUserNameRef.current}
                    onChange={(e) =>{
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        userID: e.target.value,
                      }))
                      setFlag(true);
                    }}
                    placeholder={"Nothing selected"}
                    filter
                    className="cstm-input-text"
                    style={{ width: "100%" }} 
                    name={"user"}
                  />
                </Col>
              </Row>
            </div>
          </Stack>
        </Col>
        <Col>
          <div className="p-0">
            {" "}
            <Row className="align-items-center my-2">
              <Col sm={4}>
                <span style={{ fontSize: "13px" }}>Deleted date</span>
              </Col>
              <Col xs={8}>
                {" "}
                {/* <Form.Group as={Row} className="mb-1" controlId="order_id">
            <Form.Label column sm="2"> */}
                {/* </Form.Label> */}
                <RangePicker
                  // defaultValue={[
                  //   moment(eventstartDate, dateFormat),
                  //   moment(eventstartDate, dateFormat),
                  // ]}
                  value={dateRangeValue}
                  format={dateFormat}
                  onChange={(values) => {
                    setEventstartDate(
                      values?.map((item) => {
                        return moment(item).format("MM/DD/YYYY");
                      })
                    );
                  }}
                  separator={<Testing />}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>
          <ResetAndRefreshComponent resetHandler={resetFormHandler}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Archive_buying_account_form;
