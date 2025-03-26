import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import Testing from "../../utilities/seperator";
import { MultiSelect } from "primereact/multiselect";
import { useSelector, useDispatch } from "react-redux";

import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import { setFilters } from "../../../store/reducer/Home/homeSlice";
import moment from "moment";

function AutoLayoutExample({ onfilter, refreshHandler }) {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const dateFormat = "MM/DD/YYYY";
  const optionsRef = useRef({
    country: [],
    city: [],
    state: [],
    venue: [],
    event: [],
  });

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
    datePurchaseFrom: moment(new Date()).format("MM/DD/YYYY"),
    datePurchaseTo: moment(new Date()).format("MM/DD/YYYY"),
  });
  const data = useSelector((state) => state.home.data);
  const filters = useSelector((state) => state.home.filters);

  //SET default date
  const [dateRangeValue, setDateRangeValue] = useState(
    filters.dateEventFrom === "" && filters.dateEventTo === ""
      ? null
      : [
          moment(filters.dateEventFrom, dateFormat),
          moment(filters.dateEventTo, dateFormat),
        ]
  );
  const [purchaseDateRangeValue, setPurchaseDateRangeValue] = useState(
    filters.datePurchaseFrom === "" && filters.datePurchaseTo === ""
      ? null
      : [
          moment(filters.datePurchaseFrom, dateFormat),
          moment(filters.datePurchaseTo, dateFormat),
        ]
  );

  //reset Handler
  const resetHandler = useCallback(() => {
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
    setPurchaseDateRangeValue(null);
    setFlag(true);
  }, [setDateRangeValue, setPurchaseDateRangeValue]);

  // Memoize options
  useMemo(() => {
    const { city, country, state, venue, event } = data || {};
    optionsRef.current = {
      city: city?.map(({ id, name }) => ({ label: name, value: id })) || [],
      country: country?.map(({ id, name }) => ({ label: name, value: id })) || [],
      state: state?.map(({ id, name }) => ({ label: name, value: id })) || [],
      venue: venue?.map(({ id, name }) => ({ label: name, value: id })) || [],
      event:
        event?.map((value) => {
          let arr = Object.entries(value);
          return {
            label: arr[0][1],
            value: arr[0][0],
          };
        }) || [],
    };
  }, [data]);

  const handleFilter = useCallback(
    (inputValues) => {
      dispatch(
        setFilters({
          keyword: inputValues.keyword,
          orderID: inputValues.orderID,
          events: inputValues.events,
          country: inputValues.country,
          state: inputValues.state,
          city: inputValues.city,
          venue: inputValues.venue,
          dateEventFrom: inputValues.dateEventFrom,
          dateEventTo: inputValues.dateEventTo,
          datePurchaseFrom: inputValues.datePurchaseFrom,
          datePurchaseTo: inputValues.datePurchaseTo,
        })
      );
    },
    [dispatch]
  ); 

  // handle filter

  useEffect(() => {
    if (flag) {
      handleFilter(inputValues);
      setFlag(false); // Reset flag after filtering
    }
  }, [inputValues, handleFilter ,flag]);

  return (
    <Container fluid>
      <Row>
        <Col>
          {" "}
          <Stack gap={1}>
            <div className="p-0">
              {" "}
              <Form.Group
                as={Row}
                className="align-items-center"
                controlId="keywords"
              >
                <Form.Label column sm="4">
                  Keywords
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="cstm-input-text home-page-form"
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
              <Form.Group
                as={Row}
                className=" align-items-center"
                controlId="order_id"
              >
                <Form.Label column sm="4">
                  Order id
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="cstm-input-text home-page-form"
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
              {/* my-1 */}{" "}
              <Row className="align-items-center">
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Event Date</span>
                </Col>
                <Col xs={8}>
                  {" "}
                  <RangePicker
                    className="cstm-input-text home-page-form"
                    allowEmpty={true}
                    format={"MM/DD/YYYY"}
                    // defaultValue={}
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
                    value={dateRangeValue}
                    //onChange={handleDateChange}
                    separator={<Testing />}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0">
              <Row className="align-items-center">
                <Col sm={4}>
                  <span style={{ fontSize: "13px", textAlign: "end" }}>
                    Purchase Date
                  </span>
                </Col>
                <Col xs={8}>
                  {" "}
                  <RangePicker
                    className="cstm-input-text home-page-form"
                    value={purchaseDateRangeValue}
                    format={dateFormat}
                    onChange={(values) => {
                      const datePurchaseFrom = values
                        ? values[0].format("MM/DD/YYYY")
                        : "";
                      const datePurchaseTo = values
                        ? values[1].format("MM/DD/YYYY")
                        : "";

                      // setPurchaseDate(startDate);
                      // setTopurchaseDate(endDate);
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        datePurchaseFrom,
                        datePurchaseTo,
                      }));
                      setPurchaseDateRangeValue(values);
                      setFlag(true);
                    }}
                    separator={<Testing />}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0  event-box">
              {" "}
              <Row className="align-items-center">
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Events</span>
                </Col>
                <Col sm={8}>
                  {" "}
                  <MultiSelect
                    className="cstm-input-text w-100 w-full md:w-100rem home-page-form"
                    value={inputValues.events}
                    //options={optionsEventRef.current}
                    options={optionsRef.current.event}
                    onChange={(e) => {
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        events: e.target.value,
                      }));
                      setFlag(true);
                    }}
                    placeholder={"Nothing selected"}
                    filter
                    name={"events"}
                  />
                </Col>
              </Row>
            </div>
          </Stack>
        </Col>
        <Col className="rightForm">
          <Row className="align-items-center my-0">
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event Country</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                className="cstm-select-form home-page-form"
                value={inputValues.country}
                //options={optionsCountryRef.current}
                options={optionsRef.current.country}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    country: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <Row className="align-items-center ">
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event State</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                className="cstm-select-form home-page-form"
                value={inputValues.state}
                //options={optionsStateRef.current}
                options={optionsRef.current.state}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    state: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <Row className="align-items-center ">
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event City</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                className="cstm-select-form home-page-form"
                value={inputValues.city}
                options={optionsRef.current.city}
                // options={optionsCityRef.current}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    city: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <Row className="align-items-center ">
            <Col sm={4}>
              <span style={{ fontSize: "13px" }}>Event Venue</span>
            </Col>
            <Col sm={8}>
              <MultiSelect
                className="cstm-select-form home-page-form"
                value={inputValues.venue}
                //options={optionsVenueRef.current}
                options={optionsRef.current.venue}
                onChange={(e) => {
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    venue: e.target.value,
                  }));
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <ResetAndRefreshComponent
            refreshHandler={refreshHandler}
            resetHandler={resetHandler}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
