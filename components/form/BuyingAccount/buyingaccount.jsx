import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Divider } from "antd";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MultiSelect } from "primereact/multiselect";
import Button from "react-bootstrap/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadIcon from "@mui/icons-material/Upload";
import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilters,
  showBulkUpdateModal,
  hideBulkUpdateModal,
} from "../../../store/reducer/BuyingAccount/buyingAccountSlice";
import { BulkUpdateModal } from "../../modal/buying_account/bulkUpdate/bulkUpdateModal";
import "../../style/buyingaccount.css";

import {UploadComponent} from "../../../components/utilities/reset_refresh";

export function BuyingAccountForm() {
  const dispatch = useDispatch();
  const optionsMarketPlaceRef = useRef([]);
  const optionsCardgroupRef = useRef([]);
  let formdata = useSelector((state) => state.buyingaccount.formdata);
  let filters = useSelector((state) => state.buyingaccount.filters);
  let bulkUpdateModal = useSelector(
    (state) => state.buyingaccount.bulkUpdateModal
  );

  const resetHandler = useCallback(() => {
    dispatch(
      setFilters({
        userType: "",
        marketPlace: "",
        userEnableState: "",
        purchasesBy: "",
        cardGroup: "",
        adminId: "",
      })
    );
  }, [dispatch]);

  //options data
  useMemo(() => {
    const marketplace = formdata?.data?.event;
    const cardGroup = formdata?.data?.cardGroup;
    optionsMarketPlaceRef.current = marketplace?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    optionsCardgroupRef.current = cardGroup?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });
  }, [formdata]);

  //handle filter input field;
  const onOptionChange = (e) => {
    dispatch(setFilters({ ...filters, [e.target.name]: e.target.value }));
  };

  //show bulk update modal
  const handleBulkUpdate = useCallback(() => {
    dispatch(showBulkUpdateModal());
  }, [dispatch]);


    //show bulk update modal
    const handleFileFormat = useCallback(() => {
      console.log('file format handle')
    },[]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg={6}>
            <Stack gap={1} className="buying_account_form m-0">
              <div className="p-0">
                <FormControl>
                  <Row className="align-items-center">
                    <Col lg={3}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    User type:
                  </FormLabel>
                  </Col>
                  <Col>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <Row>
                      <Col sm>
                        <FormControlLabel
                          value="all"
                          control={<Radio />}
                          label="All users"
                          name="userType"
                          checked={filters.userType === "all"}
                          onChange={onOptionChange}
                        />
                      </Col>
                      {/* <span>&nbsp;</span> */}
                      <Col md>
                        <FormControlLabel
                          value="engaged"
                          control={<Radio />}
                          label="Engaged users"
                          name="userType"
                          checked={filters.userType === "engaged"}
                          onChange={onOptionChange}
                        />
                      </Col>
                      <Col sm>
                        <FormControlLabel
                          value="free"
                          control={<Radio />}
                          label="Free users"
                          name="userType"
                          checked={filters.userType === "free"}
                          onChange={onOptionChange}
                        />
                      </Col>
                    </Row>
                  </RadioGroup>
                  </Col>
                  </Row>
                </FormControl>
                <Divider plain className="mt-0 mb-1"></Divider>
                {/* 2nd row */}
                <FormControl className="mt-0">
                <Row className="align-items-center">
                <Col lg={3}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    User enabled state:
                  </FormLabel>
                  </Col>
                  <Col>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <Row>
                      <Col md>
                        <FormControlLabel
                          value="all"
                          control={<Radio />}
                          label="All users"
                          name="userEnableState"
                          checked={filters.userEnableState === "all"}
                          onChange={onOptionChange}
                        />
                      </Col>
                      <Col md>
                        <FormControlLabel
                          value="enabled"
                          control={<Radio />}
                          label="Enabled users"
                          name="userEnableState"
                          checked={filters.userEnableState === "enabled"}
                          onChange={onOptionChange}
                        />
                      </Col>
                      <Col md>
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          label="Disabled users"
                          name="userEnableState"
                          checked={filters.userEnableState === "disabled"}
                          onChange={onOptionChange}
                        />
                      </Col>
                    </Row>
                  </RadioGroup>
                  </Col>
                  </Row>
                </FormControl>
                <Divider plain className="mt-0 mb-1"></Divider>
                {/* 3rd row */}
                <FormControl>
                <Row className="align-items-center">
                <Col lg={3}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Purchases by:
                  </FormLabel>
                  </Col>
                  <Col>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <Row>
                      <Col md={4}>
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label="Card"
                          name="purchasesBy"
                          checked={filters.purchasesBy === "card"}
                          onChange={onOptionChange}
                        />
                      </Col>
                      <Col md={4}>
                        <FormControlLabel
                          value="user"
                          control={<Radio />}
                          label="User Email"
                          name="purchasesBy"
                          checked={filters.purchasesBy === "user"}
                          onChange={onOptionChange}
                        />
                      </Col>
                    </Row>
                  </RadioGroup>
                  </Col>
                  </Row>
                </FormControl>

                {/* download docs */}
                {/* 
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
                  <Col className="mt-5 mb-3 upload">
                    <Button variant="primary" id="button_events_reset">
                      <FileDownloadIcon />
                      Bulk upload Format
                    </Button>{" "}
                  </Col>
                </Row> */}
              </div>
            </Stack>
          </Col>
          <Col lg={6} className="rightForm me-0">
            <Stack>
              <Row className="align-items-center my-1">
                <Col
                className="text-lg-end"
                  lg={3}
                  // style={{ textAlign: "right" }}
                  // className="multiselect_data"
                >
                  <span>Market Place</span>
                </Col>
                <Col lg={9}>
                  <MultiSelect
                    value={filters.marketPlace || []}
                    options={optionsMarketPlaceRef.current}
                    name="marketPlace"
                    onChange={onOptionChange}
                    placeholder={
                      filters.marketPlace.length === 1
                        ? optionsMarketPlaceRef?.current?.[1]?.label
                        : "Nothing selected"
                    }
                    //placeholder={"Nothing selected"}
                    filter
                    className="cstm-input-text home-page-form"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>

              <Row className="align-items-center my-1">
                <Col
                  lg={3}
                  style={{ textAlign: "right" }}
                  className="multiselect_data mt-12"
                >
                  <span>Card group</span>
                </Col>
                <Col lg={9}>
                  <MultiSelect
                    value={filters.cardGroup || []}
                    options={optionsCardgroupRef.current}
                    name="cardGroup"
                    onChange={onOptionChange}
                    placeholder={"Nothing selected"}
                    filter
                    className="cstm-input-text home-page-form"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </Stack>
            {/* <ResetAndRefreshComponent resetHandler={resetHandler} /> */}

            <UploadComponent resetHandler={resetHandler} handleBulkUpdate={handleBulkUpdate} handleFileFormat={handleFileFormat}/>
            {/* <Row className="mb-2 mt-2">
              <Col xs={4}></Col>

              <Col xs={8} className="cstm-row-btn-btm upload">
                <Button
                  variant="primary"
                  id="button_events_reset"
                  onClick={handleBulkUpdate}
                >
                  <UploadIcon />
                  Update bulk file
                </Button>{" "}
                <Button
                  variant="primary"
                  id="button_events_get"
                  //onClick={handleBulkUpdate}
                >
                  <FileDownloadIcon />
                  Bulk upload Format
                </Button>{" "}
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
      <BulkUpdateModal
        show={bulkUpdateModal}
        handleClose={() => {
          dispatch(hideBulkUpdateModal());
        }}
      />
    </div>
  );
}
