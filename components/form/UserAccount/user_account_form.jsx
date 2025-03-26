import React, { useEffect, useState , useCallback} from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Divider } from "antd";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "react-bootstrap/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadIcon from "@mui/icons-material/Upload";
import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import Testing from "../../utilities/seperator";
import { DatePicker } from "antd";
import {setFilters , showBulkUpdateModal , hideBulkUpdateModal} from "../../../store/reducer/UserAccount/userAccountSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { UserAccountBulkUpdateModal } from "../../modal/userAccount/bulkUpdate/bulkUpdateModal";




const User_account_form = () => {
  const dispatch = useDispatch();
  const dateFormat = "MM/DD/YYYY";
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [movedType, setMovedType] = useState('all');
  const [accountStatus, setAccountStatus] = useState('all');
  const { MonthPicker, RangePicker } = DatePicker;
  const [flag, setFlag] = useState(false);
  const { form_data, dateRange , bulkUpdateModal } = useSelector((state) => state?.userAccount);


   //SET default date
    const [dateRangeValue, setDateRangeValue] = useState(
      dateTo === '' && dateFrom === ''
      ? null
      : [
          moment(dateTo, dateFormat),
          moment(dateFrom, dateFormat),
        ]
  );
  
 useEffect(() => {
   if (Object.keys(dateRange).length > 0) {
     setFlag(true);
     setDateTo(dateRange?.to);
     setDateFrom(dateRange?.from);
     setDateRangeValue((prevValues) => {
       return dateRange?.to === "" && dateRange?.from === ""
         ? null
         : [
             moment(dateRange?.from, dateFormat),
             moment(dateRange?.to, dateFormat),
           ];
     });
   }
 }, [dateRange]); 




 useEffect(() => {
   if (flag === true) {
     dispatch(
       setFilters({
         movedType: movedType,
         accStatus: accountStatus,
         dateFrom,
         dateTo,
       })
     );
   }
  
 }, [movedType, accountStatus , flag , dateFrom , dateTo ]);

 
  


  const resetHandler = useCallback(() => {
    setMovedType("");
    setAccountStatus("");
    setDateRangeValue(null);
    setFlag(true);
    setDateFrom("");
    setDateTo('');
  }, []);


  //handle bulk update file
  const handleBulkUpdate = ()=>{
    dispatch(showBulkUpdateModal())
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="cstm-parent-col">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Moved to buying account:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <Row
                  className="user_accont_form_row cstm-width-outer"
                  style={{ flexWrap: "nowrap" }}
                >
                  <Col xs={4}>
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      checked={movedType === "all"}
                      onChange={(e) => {
                        setMovedType(e.target.value);
                      }}
                      name="moved_to_buying_account_type"
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControlLabel
                      value="moved"
                      control={<Radio />}
                      label="Moved"
                      checked={movedType === "moved"}
                      name="moved_to_buying_account_type"
                      onChange={(e) => {
                        setMovedType(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControlLabel
                      value="non"
                      control={<Radio />}
                      checked={movedType === "non"}
                      name="moved_to_buying_account_type"
                      label="Not Moved"
                      onChange={(e) => {
                        setMovedType(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </RadioGroup>
            </FormControl>
            <Divider plain></Divider>
            {/* 2nd row */}
            <FormControl className="cstm-width-outer">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Account status:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <Row className="cstm-width-outer" style={{ flexWrap: "nowrap" }}>
                  <Col xs={4}>
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      checked={accountStatus === "all"}
                      onChange={(e) => {
                        setAccountStatus(e.target.value);
                      }}
                      name="account_status"
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControlLabel
                      value="error"
                      control={<Radio />}
                      label="With Error"
                      checked={accountStatus === "error"}
                      onChange={(e) => {
                        setAccountStatus(e.target.value);
                      }}
                      name="account_status"
                    />
                  </Col>
                  <Col xs={4}>
                    <FormControlLabel
                      value="not_error"
                      control={<Radio />}
                      label="Without error"
                      checked={accountStatus === "not_error"}
                      onChange={(e) => {
                        setAccountStatus(e.target.value);
                      }}
                      name="account_status"
                    />
                  </Col>
                </Row>
              </RadioGroup>
            </FormControl>

            {/* download docs */}

            <Row>
              <Col className="mt-5 mb-3 upload">
                <Button
                  variant="primary"
                  id="button_events_reset"
                  onClick={handleBulkUpdate}
                >
                  <UploadIcon />
                  Update bulk file
                </Button>{" "}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="align-items-center my-2">
              <Col
                sm={4}
                style={{ textAlign: "right" }}
                className="multiselect_data"
              >
                <span>Account added date</span>
              </Col>
              <Col xs={8}>
                {" "}
                {/* <Form.Group as={Row} className="mb-1" controlId="order_id">
              <Form.Label column sm="2"> */}
                <RangePicker
                  value={dateRangeValue}
                  format={dateFormat}
                  onChange={(values) => {
                    // setToDate(
                    //   values?.map((item) => {
                    //     return moment(item).format("MM/DD/YYYY");
                    //   })
                    // );

                    const fromDate = values
                      ? values[0].format("MM/DD/YYYY")
                      : "";
                    const toDate = values ? values[1].format("MM/DD/YYYY") : "";
                    setDateTo(toDate);
                    setDateFrom(fromDate);

                    setDateRangeValue(values);
                    setFlag(true);
                  }}
                  separator={<Testing />}
                  className="cstm-input-text"
                  style={{ width: "100%" }} 
                />
              </Col>
            </Row>          
              <ResetAndRefreshComponent resetHandler={resetHandler} />            
          </Col>
        </Row>
      </Container>
      <UserAccountBulkUpdateModal show={bulkUpdateModal} handleClose={()=>{dispatch(hideBulkUpdateModal())}}/>
    </>
  );
};

export default User_account_form;
