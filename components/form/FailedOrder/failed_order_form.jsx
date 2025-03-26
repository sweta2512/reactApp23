import React, { useEffect, useState, useRef ,useMemo , useCallback} from "react";
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
import { getFailedOrderFormData , setFilters } from "../../../store/reducer/FailedOrder/failedOrderSlice";
import moment from "moment";

function FailedOrderForm() {
  const dispatch = useDispatch();
  const optionsCountryRef = useRef([]);
  const optionsCityRef = useRef([]);
  const optionsStateRef = useRef([]);
  const optionsVenueRef = useRef([]);
  const optionsEventRef = useRef([]);
  const { formData, filters, date } = useSelector((state) => state.failedOrder);
  const { RangePicker } = DatePicker;
  const dateFormat = "MM/DD/YYYY";

  //SET default date
  const [dateRangeValue, setDateRangeValue] = useState(
    filters.dateEventFrom === '' && filters.dateEventTo === ''
      ? null
      : [
          moment(filters.dateEventFrom, dateFormat),
          moment(filters.dateEventTo, dateFormat),
        ]
  );
  const [purchaseDateRangeValue, setPurchaseDateRangeValue] = useState(
    filters.datePurchaseFrom === '' && filters.datePurchaseTo === ''
      ? null
      : [
          moment(filters.datePurchaseFrom, dateFormat),
          moment(filters.datePurchaseTo, dateFormat),
        ]
  );
 
//form data
  useEffect(() => {
    dispatch(getFailedOrderFormData());
  }, [dispatch]);

  useMemo(() => {
    //city
    const city = formData?.city;
    const country = formData?.country;
    const state = formData?.state;
    const venue = formData?.venue;
    const event = formData?.event;

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
  }, [formData]);



  ///
  useEffect(() => {
   
    if (Object.keys(date).length > 0) {
      setDateRangeValue((prevValues) => { console.log(date?.event?.from,'date?.event?.from')
        return date?.event?.to === "" && date?.event?.from === ""
          ? null
          : [
              moment(date?.event?.from, dateFormat),
              moment(date?.event?.to, dateFormat),
            ];
      });

      setPurchaseDateRangeValue((prevValues) => {
        return date.purchase?.to === "" && date.purchase?.from === ""
          ? null
          : [
              moment(date.purchase?.from, dateFormat),
              moment(date.purchase?.to, dateFormat),
            ];
      });
      dispatch(
        setFilters({
          ...filters,
          dateEventFrom: date?.event?.from,
          dateEventTo: date?.event?.to,
          datePurchaseFrom: date.purchase?.from,
          datePurchaseTo: date.purchase?.to,
        })
      );
    }
    console.log(date,'dateee' , purchaseDateRangeValue , moment(date.purchase?.from, dateFormat))
  }, [date, dispatch]);

  //reset Handler
  const resetHandler = useCallback(() => {
    dispatch(setFilters({
      keyword: '',
      orderID: '',
      events: '',
      country: '',
      state: '',
      city: '',
      venue: '',
      dateEventFrom:'',
      dateEventTo: '',
      datePurchaseFrom: '',
      datePurchaseTo: '',
    }));
    setDateRangeValue(null);
    setPurchaseDateRangeValue(null);
  }, [setDateRangeValue, setPurchaseDateRangeValue]);

  return (
    <Container fluid>
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
                    className="cstm-input-text"
                    type="text"
                    name="keyword"
                    onChange={(e) =>
                      dispatch(
                        setFilters({ ...filters, keyword: e.target.value })
                      )
                    }
                    value={filters.keyword || ""}
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
                    className="cstm-input-text"
                    type="text"
                    name="orderid"
                    onChange={(e) =>
                      dispatch(
                        setFilters({ ...filters, orderID: e.target.value })
                      )
                    }
                    value={filters.orderID || ""}
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
                    format={dateFormat}
                    onChange={(values) => {
                      const dateEventFrom = values
                        ? values[0].format("MM/DD/YYYY")
                        : "";
                      const dateEventTo = values
                        ? values[1].format("MM/DD/YYYY")
                        : "";

                      dispatch(
                        setFilters({
                          ...filters,
                          dateEventFrom: dateEventFrom,
                          dateEventTo: dateEventTo,
                        })
                      );
                      setDateRangeValue(values);
                    }}
                    value={dateRangeValue}
                    separator={<Testing />}
                    style={{ width: "100%" }}
                    className="cstm-input-text"
                  />
                </Col>
              </Row>
            </div>
            <div className="p-0">
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px", textAlign: "end" }}>
                    Purchase Date
                  </span>
                </Col>
                <Col xs={8}>
                  {" "}
                  {/* <Form.Group as={Row} className="mb-1" controlId="order_id">
              <Form.Label column sm="2"> */}
                  <RangePicker
                    format={dateFormat}
                    onChange={(values) => {
                      const dateEventFrom = values
                        ? values[0].format("MM/DD/YYYY")
                        : "";
                      const dateEventTo = values
                        ? values[1].format("MM/DD/YYYY")
                        : "";

                      dispatch(
                        setFilters({
                          ...filters,
                          datePurchaseFrom: dateEventFrom,
                          datePurchaseTo: dateEventTo,
                        })
                      );
                      setPurchaseDateRangeValue(values);
                    }}
                    value={purchaseDateRangeValue}
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
                    value={filters.events || ""}
                    options={optionsEventRef.current}
                    onChange={(e) =>
                      dispatch(
                        setFilters({ ...filters, events: e.target.value })
                      )
                    }
                    placeholder={"Nothing selected"}
                    filter
                    //className="w-full md:w-40rem"
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
                className="cstm-input-text"
                value={filters.country || ""}
                options={optionsCountryRef.current}
                onChange={(e) =>
                  dispatch(
                    setFilters({ ...filters, country: e.target.value })
                  )
                }
                placeholder={"Nothing selected"}
                filter
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
                className="cstm-input-text"
                value={filters.state || ""}
                options={optionsStateRef.current}
                onChange={(e) =>
                  dispatch(
                    setFilters({ ...filters, state: e.target.value })
                  )
                }
                placeholder={"Nothing selected"}
                filter
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
                className="cstm-input-text"
                value={filters.city || ""}
                options={optionsCityRef.current}
                onChange={(e) =>
                  dispatch(
                    setFilters({ ...filters, city: e.target.value })
                  )
                }
                placeholder={"Nothing selected"}
                filter
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
                className="cstm-input-text"
                value={filters.venue || ""}
                options={optionsVenueRef.current}
                onChange={(e) =>
                  dispatch(
                    setFilters({ ...filters, venue: e.target.value })
                  )
                }
                placeholder={"Nothing selected"}
                filter
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <ResetAndRefreshComponent  resetHandler={resetHandler} />
        </Col>
      </Row>
    </Container>
  );
}

export default FailedOrderForm;
