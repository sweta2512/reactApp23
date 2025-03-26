import React from "react";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadIcon from "@mui/icons-material/Upload";
import "../style/utilities.css";

export const ResetAndRefreshComponent = ({ resetHandler, refreshHandler }) => {
  return (
    <Row>
      <Col xs={4}></Col>
      <Col xs={8} className="cstm-row-btn-btm upload">
        <Button
          variant="primary"
          id="button_events_reset"
          onClick={resetHandler}
        >
          <RestartAltIcon />
          Reset
        </Button>{" "}
        <Button
          variant="primary"
          id="button_events_get"
          onClick={refreshHandler}
        >
          <RefreshIcon /> Refresh
        </Button>{" "}
      </Col>
    </Row>
  );
};

export const ResetAndRefreshComponentPerformance = ({
  resetHandler,
  refreshHandler,
}) => {
  return (
    <div className="cstm-row-btn-btm upload mt-3">
      <Button variant="primary" id="button_events_reset" onClick={resetHandler}>
        <RestartAltIcon />
        Reset
      </Button>{" "}
      <Button variant="primary" id="button_events_get" onClick={refreshHandler}>
        <RefreshIcon /> Refresh
      </Button>{" "}
    </div>
  );
};

export const ResetAndChangeComponent = ({
  resetHandle,
  changePasswordHandle,
}) => {
  return (
    <div className="mt-3 upload upload_btn">
      <Button variant="primary" id="button_events_reset" onClick={resetHandle}>
        <RestartAltIcon />
        Reset
      </Button>
      <Button
        variant="primary"
        id="button_events_get"
        onClick={changePasswordHandle}
      >
        <i className="fas fa-random"></i> Change
      </Button>{" "}
    </div>
  );
};

export const UploadComponent = ({ resetHandler, changePasswordHandle , handleBulkUpdate , handleFileFormat}) => {
  return (
   
      <Row className="justify-content-lg-end">
        <Col lg={9}>
        <div className="mt-3 upload upload_btn pe-0 custmGrid4">
        <Button
        className="w-100"
          variant="primary"
          id="button_events_reset"
          onClick={resetHandler}
        >
          <RestartAltIcon />
          Reset
        </Button>
        <Button
         className="w-100"
          variant="primary"
          id="button_events_get"
          onClick={changePasswordHandle}
        >
          <i className="fas fa-refresh"></i> Refresh
        </Button>{" "}
     
      <Button  className="w-100" variant="primary" id="button_events_reset" onClick={handleBulkUpdate}>
        <UploadIcon />
        Upload file
      </Button>
      <Button
       className="w-100"
        variant="primary"
        id="button_events_get"
        onClick={handleFileFormat}
      >
        <FileDownloadIcon /> File Format
      </Button>{" "}
      </div>
        </Col>
      </Row>
    
  );
};
