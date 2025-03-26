import React, { useState , useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UploadIcon from "@mui/icons-material/Upload";
import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import Testing from "../../utilities/seperator";
import { DatePicker } from "antd";
import moment from "moment";
import { useSelector , useDispatch } from "react-redux";
import { setFilters } from "../../../store/reducer/OverLimitAccount/overLimitAccountSlice";

const Over_limit_accounts_form = () => {
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const dateFormat = "MM/DD/YYYY";
  const {form_data, filters} =  useSelector((state)=>state.overLimitAccount);

  //SET default date
  const [dateRangeValue, setDateRangeValue] = useState(
    filters.fromDate === "" && filters.toDate === ""
      ? null
      : [
          moment(filters.fromDate, dateFormat),
          moment(filters.toDate, dateFormat),
        ]
  );




  useEffect(() => {
    if (Object.keys(form_data).length > 0) {
      setDateRangeValue((prevValues) => {
        return form_data?.to === "" && form_data?.from === ""
          ? null
          : [
              moment(form_data?.from, dateFormat),
              moment(form_data?.to, dateFormat),
            ];
      });
      dispatch(
        setFilters({
          ...filters,
          fromDate: form_data?.from,
          toDate: form_data?.to,
        })
      );
    }
  }, [form_data, dispatch]);


  const resetHandler = () => {
    dispatch(
      setFilters({
        ...filters,
        fromDate: "",
        toDate: "",
      })
    );
    setDateRangeValue(null);
  };

  return (
    <Container>
      <Row>
        {" "}
        <Col>
          <Row style={{ marginTop: "12px", marginLeft: "-390px" }}>
            <Col
              sm={4}
              style={{ textAlign: "right" }}
              //   className="multiselect_data"
            >
              <span>Account added date</span>
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
                      fromDate: dateEventFrom,
                      toDate: dateEventTo,
                    })
                  );
                  setDateRangeValue(values);
                }}
                value={dateRangeValue}
                separator={<Testing />}
                style={{ width: "400px" }}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "12px", marginLeft: "-84px" }}>
            <Col sm={6} style={{ textAlign: "right" }} className='mt-3'>
              <ResetAndRefreshComponent  resetHandler={resetHandler}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Over_limit_accounts_form;
