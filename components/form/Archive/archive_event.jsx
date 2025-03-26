import React, { useState,useCallback, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import Testing from "../../utilities/seperator";
import { MultiSelect } from "primereact/multiselect";

import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import {
  archiveEventFormdata,
  setFilter,
} from "../../../store/reducer/Archives/archiveEventSlice";

import moment from "moment";

function AutoLayoutExample() {
  const dispatch = useDispatch();
  const dateFormat = "MM/DD/YYYY";
  const optionsCountryRef = useRef([]);
  const optionsCityRef = useRef([]);
  const optionsStateRef = useRef([]);
  const optionsVenueRef = useRef([]);
  const optionsEventRef = useRef([]);
  const {form_data, date} = useSelector((state) => state.archiveEvent);
  const filter = useSelector((state) => state.archiveEvent?.filter);
  console.log(form_data, "form_data archive event", filter, 'date', date);
  const { RangePicker } = DatePicker;
  const [flag, setFlag] = useState(false);

  const [inputValues, setInputValues] = useState({
    keyword: "",
    orderID: "",
    events: "",
    country: "",
    state: "",
    city: "",
    venue: "",
    dateEventFrom: moment(new Date()).format("MM/DD/YYYY"),
    dateEventTo: moment(new Date()).format("MM/DD/YYYY"),
    dateDeletedFrom: moment(new Date()).format("MM/DD/YYYY"),
    dateDeletedTo: moment(new Date()).format("MM/DD/YYYY"),
  });

  //SET default date
  const [dateRangeValue, setDateRangeValue] = useState(
    filter.dateEventFrom === "" && filter.dateEventTo === ""
      ? null
      : [
          moment(filter.dateEventFrom, dateFormat),
          moment(filter.dateEventTo, dateFormat),
        ]
  );
  const [deletedDateRangeValue, setDeletedDateRangeValue] = useState(
    filter.dateDeletedFrom === "" && filter.dateDeletedTo === ""
      ? null
      : [
          moment(filter.dateDeletedFrom, dateFormat),
          moment(filter.dateDeletedTo, dateFormat),
        ]
  );

  //get form data
  useEffect(() => {
    dispatch(archiveEventFormdata());
  }, [dispatch]);

  // set data

  useMemo(() => {
    //city
    const city = form_data?.city;
    const country = form_data?.country;
    const state = form_data?.state;
    const venue = form_data?.venue;
    const event = form_data?.event;

    optionsCityRef.current = city?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    //country
    optionsCountryRef.current = country?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });
    //state
    optionsStateRef.current = state?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });
    //venue
    optionsVenueRef.current = venue?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    //event
    optionsEventRef.current = event?.map((value, index) => {
      let arr = Object.entries(value);
      return {
        label: arr[0][1],
        value: arr[0][0],
      };
    });

    console.log( optionsEventRef.current,' optionsEventRef.current')
  }, [form_data]);



  useEffect(() => {
    console.log(date,'date?.event?.from' , date.length , Object.keys(date).length)
    if (Object.keys(date).length > 0) {
      setDateRangeValue((prevValues) => { console.log(date?.event?.from,'date?.event?.fromv')
        return date?.event?.to === "" && date?.event?.from === ""
          ? null
          : [
              moment(date?.event?.from, dateFormat),
              moment(date?.event?.to, dateFormat),
            ];
      });

      setDeletedDateRangeValue((prevValues) => {
        return date.deleted?.to === "" && date.deleted
        ?.from === ""
          ? null
          : [
              moment(date.deleted?.from, dateFormat),
              moment(date.deleted?.to, dateFormat),
            ];
      });
      dispatch(
        setFilter({
          ...filter,
          dateEventFrom: date?.event?.from,
          dateEventTo: date?.event?.to,
          dateDeletedFrom: date.deleted?.from,
          dateDeletedTo: date.deleted?.to,
        })
      );
    }
    console.log(date,'dateee' ,   moment(date.deleted
      ?.from, dateFormat))
  }, [date, dispatch]);

  // handle filter
  useEffect(() => {
    if (flag === true) {
      handleFilter(inputValues);
    }
  }, [
    inputValues.keyword,
    inputValues.dateEventFrom,
    inputValues.dateEventTo,
    inputValues.dateDeletedFrom,
    inputValues.dateDeletedTo,
    inputValues.orderID,
    inputValues.events,
    inputValues.country,
    inputValues.state,
    inputValues.venue,
    inputValues.city,
    flag
  ]);

  const handleFilter = (inputValues) => {
    dispatch(
      setFilter({
        keyword: inputValues.keyword,
        orderID: inputValues.orderID,
        events: inputValues.events,
        country: inputValues.country,
        state: inputValues.state,
        city: inputValues.city,
        venue: inputValues.venue,
        dateEventFrom: inputValues.dateEventFrom,
        dateEventTo: inputValues.dateEventTo,
        dateDeletedFrom: inputValues.dateDeletedFrom,
        dateDeletedTo: inputValues.dateDeletedTo,
      })
    );
  };



   //reset Handler
   const resetHandler = useCallback(() => {console.log('reset')
   setInputValues((prevValues) => ({
     keyword: "",
     orderID: "",
     events: "",
     country: "",
     state: "",
     city: "",
     venue: "",
     dateEventFrom: "",
     dateEventTo: "",
     datePurchaseFrom: "",
     datePurchaseTo: "",
   }));
   setDateRangeValue(null);
   setDeletedDateRangeValue(null);
   setFlag(true);
 }, [setDateRangeValue, setDeletedDateRangeValue]);



  return (
    <Container>
      <Row>
        <Col>
          {" "}
          <Stack gap={1}>
            <div className="p-0">
              {" "}
              <Form.Group as={Row} className="mb-1" controlId="keywords">
                <Form.Label column sm="4">
                  Keywords
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="keyword"
                    onChange={(e) => {
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        keyword: e.target.value,
                      }));
                      setFlag(true);
                    }}
                    value={inputValues.keyword}
                  />
                </Col>
              </Form.Group>
            </div>
            <div className="p-0">
              {" "}
              <Form.Group as={Row} className="mb-1" controlId="order_id">
                <Form.Label column sm="4">
                  Order id
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    name="orderid"
                    onChange={(e) => {
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        orderID: e.target.value,
                      }));
                      setFlag(true);
                    }}
                    value={inputValues.orderID}
                  />
                </Col>
              </Form.Group>
            </div>
            <div className="p-0">
              {" "}
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Event Date</span>
                </Col>
                <Col xs={8}>
                  {" "}
                  <RangePicker
                    // defaultValue={[
                    //   moment(eventstartDate, dateFormat),
                    //   moment(eventstartDate, dateFormat),
                    // ]}
                    value={dateRangeValue}
                    format={dateFormat}
                    onChange={(values) => {
                      const dateEventFrom = values
                        ? values[0].format("MM/DD/YYYY")
                        : "";
                      const dateEventTo = values
                        ? values[1].format("MM/DD/YYYY")
                        : "";

                      setInputValues((prevValues) => ({
                        ...prevValues,
                        dateEventFrom,
                        dateEventTo,
                      }));
                      setDateRangeValue(values);
                      setFlag(true);
                    }}
                    separator={<Testing />}
                    className="cstm-input-text"
                    style={{ width: "100%" }} 
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0">
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px", textAlign: "end" }}>
                    Deleted date
                  </span>
                </Col>
                <Col xs={8}>
                  {" "}
                  {/* <Form.Group as={Row} className="mb-1" controlId="order_id">
              <Form.Label column sm="2"> */}
                  <RangePicker
                    // defaultValue={[
                    //   moment(eventstartDate, dateFormat),
                    //   moment(eventstartDate, dateFormat),
                    // ]}
                    value={deletedDateRangeValue}
                    format={dateFormat}
                    onChange={(values) => {
                      const dateDeletedFrom = values
                        ? values[0].format("MM/DD/YYYY")
                        : "";
                      const dateDeletedTo = values
                        ? values[1].format("MM/DD/YYYY")
                        : "";

                      // setPurchaseDate(startDate);
                      // setTopurchaseDate(endDate);
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        dateDeletedFrom,
                        dateDeletedTo,
                      }));
                      setDeletedDateRangeValue(values);
                      setFlag(true);
                    }}
                    separator={<Testing />}
                    className="cstm-input-text"
                    style={{ width: "100%" }} 
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0">
              {" "}
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Events</span>
                </Col>
                <Col sm={8}>
                  {" "}
                  <MultiSelect
                    value={inputValues.events}
                    options={optionsEventRef.current}
                    onChange={(e) => {console.log( e.target.value,' e.target.value')
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        events: e.target.value,
                      }));
                      setFlag(true);
                    }}
                    placeholder={"Nothing selected"}
                    filter
                    className="cstm-input-text"
                    style={{ width: "100%" }} 
                  />
                </Col>
              </Row>
            </div>
          </Stack>
        </Col>
        <Col>
          <Row style={{ marginBottom: "12px" }}>
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event Country</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                value={inputValues.country}
                options={optionsCountryRef.current}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    country: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
                className="cstm-input-text"
                style={{ width: "100%" }} 
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event State</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                value={inputValues.state}
                options={optionsStateRef.current}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    state: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
                className="cstm-input-text"
                style={{ width: "100%" }} 
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event City</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                value={inputValues.city}
                options={optionsCityRef.current}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    city: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
                className="cstm-input-text"
                style={{ width: "100%" }} 
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "12px" }}>
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event Venue</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                value={inputValues.venue}
                options={optionsVenueRef.current}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    venue: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
                className="cstm-input-text"
                style={{ width: "100%" }} 
              />
            </Col>
          </Row>
          <ResetAndRefreshComponent   resetHandler={resetHandler}/>
        </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
