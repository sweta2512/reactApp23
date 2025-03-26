import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import Testing from "../../utilities/seperator";
import { MultiSelect } from "primereact/multiselect";

import { ResetAndRefreshComponentPerformance } from "../../utilities/reset_refresh";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import moment from "moment";
import {
  performanceFormDataAction,
  setFiltersPerformance,
} from "../../../store/reducer/Performance/performanceSlice";

const PerformanceForm = () => {
  const dispatch = useDispatch();
  const dateFormat = "MM/DD/YYYY";
  const { formData, filters } = useSelector((state) => state.performance);
  

  const marketPlaceRef = useRef([]);
  const usersRef = useRef([]);
  const eventsRef = useRef([]);
  const cardsRef = useRef([]);

  const [marketplace, setMarketplace] = useState('');
  const [users, setUsers] = useState('');
  const [events, setEvents] = useState('');
  const [cards, setCards] = useState('');
  const [date, setDate] = useState({
    dateTo:  moment(new Date()).format("MM/DD/YYYY"),
    dateFrom:  moment(new Date()).format("MM/DD/YYYY"),
  });
  const [dataType, setDataType] = useState("ticket");
  const [flag, setFlag] = useState(false);
  const { RangePicker } = DatePicker;

  //SET default date
  const [dateRangeValue, setDateRangeValue] = useState(
    filters.dateFrom === '' && filters.dateTo === ''
      ? null
      : [
          moment(filters.dateFrom, dateFormat),
          moment(filters.dateTo, dateFormat),
        ]
  );

  useEffect(() => {
    dispatch(performanceFormDataAction());
  }, [dispatch]);

  useMemo(() => {
    let marketplace = formData?.marketPlace;
    let users = formData?.pluginUsers;
    let events = formData?.events;
    let cards = formData?.cards;

    marketPlaceRef.current = marketplace?.map((value, index) => {
    let data =  Object.entries(value);
      return {
        label: data[0][1],
        value: data[0][0],
      };
    });
    usersRef.current = users?.map((value, index) => {
      let data =  Object.entries(value);
      return {
        label: data[0][1],
        value: data[0][0],
      };
    });

    eventsRef.current = events?.map((value, index) => {
      let arr = Object.entries(value);
      return {
        label: arr[0][1],
        value: arr[0][0],
      };
    });
    cardsRef.current = cards?.map((value, index) => {
      let data =  Object.entries(value);
      return {
        label: data[0][1],
        value: data[0][0],
      };
    });
  }, [formData]);

  useEffect(() => {
    if (flag === true) {
      handlleFilter();
    }
  }, [marketplace, users, events, cards, dataType, date.dateFrom , date.dateTo]);
  const handlleFilter = (e) => {
    dispatch(
      setFiltersPerformance({
        mpID: marketplace,
        users: users,
        events: events,
        cards: cards,
        dataType: dataType,
        dateFrom: date.dateFrom,
        dateTo: date.dateTo,
      })
    );
  };


  const resetHandler = ()=>{
    setMarketplace('')
    setUsers('')
    setEvents('')
    setCards('')
    // setDataType('')
    setDate((prevValues)=>({
      dateFrom:'',
      dateTo:'',
    }))
    setDateRangeValue('')
    setFlag(true);
  }
  return (
    <Container>
      <Row className="mb-4">
        <Col className="me-4">
          {" "}
          <Row className="my-2">
            <Col sm={3}>
              <span style={{ fontSize: "13px" }}>Market Place</span>
            </Col>
            <Col sm={9}>
              {" "}
              <MultiSelect
                className="cstm-select-form"
                value={marketplace || []}
                options={marketPlaceRef.current}
                onChange={(e) => {
                  setMarketplace(e.value);
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
                //className="w-full md:w-40rem"
              />
            </Col>
          </Row>
          <Row className="my-2">
            <Col sm={3}>
              <span style={{ fontSize: "13px" }}>Users</span>
            </Col>
            <Col sm={9}>
              <MultiSelect
                className="cstm-select-form"
                value={users || []}
                options={usersRef.current}
                onChange={(e) => {
                  setUsers(e.target.value);
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <Row className="my-2">
            <Col sm={3}>
              <span style={{ fontSize: "13px" }}>Events</span>
            </Col>
            <Col sm={9}>
              <MultiSelect
                className="cstm-select-form"
                value={events || []}
                options={eventsRef.current}
                onChange={(e) => {
                  setEvents(e.target.value);
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
          <Row className="my-2">
            <Col sm={3}>
              <span style={{ fontSize: "13px" }}>Cards</span>
            </Col>
            <Col sm={9}>
              <MultiSelect
                className="cstm-select-form"
                value={cards || []}
                options={cardsRef.current}
                onChange={(e) => {
                  setCards(e.target.value);
                  setFlag(true);
                }}
                placeholder={"Nothing selected"}
                filter
              />
            </Col>
          </Row>
        </Col>
        <Col className="ms-4">
          <FormControl className="my-2 ms-5">
            <div className="input-flex-d">
            <FormLabel id="demo-radio-buttons-group-label">Data Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              //defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="number"
                control={<Radio />}
                label="Total number of purchases"
                name="dataTypes"
                checked={dataType === "number"}
                onChange={(e) => {
                  setDataType(e.target.value);
                  setFlag(true);
                }}
                className="custom_input"
              />
              <FormControlLabel
                value="amount"
                control={<Radio />}
                label="Total amount of purchases"
                name="dataTypes"
                checked={dataType === "amount"}
                onChange={(e) => {
                  setDataType(e.target.value);
                  setFlag(true);
                }}
                className="custom_input"
              />
              <FormControlLabel
                value="ticket"
                control={<Radio />}
                label="Total number of ticket purchases"
                name="dataTypes"
                checked={dataType === "ticket"}
                onChange={(e) => {
                  setDataType(e.target.value);
                  setFlag(true);
                }}
                className="custom_input"
              />
            </RadioGroup>
            </div>
          </FormControl>
          <Row className="align-items-center my-2 ms-5">
         
            <Col xs={12}>
              {" "}   
              <div className="date-range range_box">
              <span className="range_label" style={{ fontSize: "13px" }}>Date</span> 
              <div className="range_pik">         
              <RangePicker
                // defaultValue={[
                //   moment(date, dateFormat),
                //   moment(date, dateFormat),
                // ]}
                value={dateRangeValue}
                format={dateFormat}
                onChange={(values) => {
                  const dateFrom = values ? values[0].format("MM/DD/YYYY") : "";
                  const dateTo = values ? values[1].format("MM/DD/YYYY") : "";

                  setDate((prevValues) => ({
                    dateFrom,
                    dateTo,
                  }));
                  setDateRangeValue(values);
                  setFlag(true);
                }}
                separator={<Testing />}
                className="cstm-input-text"
                style={{ width: "100%" }} 
              />
                <ResetAndRefreshComponentPerformance resetHandler={resetHandler}/>
              </div> 
              </div>
            </Col>
          </Row>

        
        </Col>
      </Row>
    </Container>
  );
};

export default PerformanceForm;
