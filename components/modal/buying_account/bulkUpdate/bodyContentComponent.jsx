import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Radio from "@mui/material/Radio";
import Form from "react-bootstrap/Form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { setBulkUpdateMarketPlace } from "../../../../store/reducer/BuyingAccount/buyingAccountSlice";
import {
  uploadUserAction,
  createAccountAction,
  updateEmailAction,
  updateCardAction,
  updateProgress,
} from "../../../../store/reducer/Upload/uploadFileSlice";
import {
  showError,
  showInfo,
  showSuccess,
} from "../../../utilities/toast_message";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "react-bootstrap/Button";

import UploadFile from "../../../../services/uploadFile";
import { UPLOAD } from "../../../../constant/constant";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const BodyContentComponent = () => {
  // const {FileUpload} = UploadFile();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [text, setText] = useState("");
  const [fileUpload, setFileUpload] = useState("Choose CSV File....");
  const fileRef = useRef(null);

  const MP = useSelector(
    (state) => state?.buyingaccount?.bulkUpdateMarketPlace
  );
  const uploadType = useSelector(
    (state) => state.buyingaccount?.bulkUpdateType
  );
 
  const progress = useSelector((state) => state.bulkUpload?.progress);
 

  useMemo(() => {
    switch (uploadType?.type) {
      case "bulk_upload_users":
        setText("Bulk upload users");
        break;
      case "bulk_update_email":
        setText("Bulk update Emails");
        break;
      case "bulk_update_cards":
        setText("Bulk update Cards");
        break;
      case "bulk_create_account":
        setText("Bulk upload users");
        break;
      default:
    }
  }, [uploadType]);

  const onOptionChange = (e) => {
    dispatch(
      setBulkUpdateMarketPlace({
        ...MP,
        MP: e.target.value,
      })
    );
  };

  const FileUploadHandler = (e) => {
    fileRef.current.click();
  };

  const uploadFile = () => {
    const inputText = fileRef.current?.files[0]?.name
      ? fileRef.current?.files[0]?.name
      : "Choose CSV File....";

    setFileUpload(inputText);

    setTimeout(() => {
      completeFileUpload();
    }, 1000);
  };

  const completeFileUpload = () => {
    let type = fileRef?.current?.files[0]?.type;
    let marketPlace = MP?.MP;

    if (marketPlace === "") {
      showError("choose marketplace", toast);
      return false;
    }
    if (type !== "text/csv") {
      showError("choose correct file type", toast);
      return false;
    }

    let formData = new FormData();
    formData.append("csvFile", fileRef.current.files[0]);
    formData.append("id", marketPlace);
    formData.append("uploadType", type);

    switch (uploadType?.type) {
      case "bulk_upload_users":
        //FileUpload(UPLOAD.UPLAOD_USER,formData);
        dispatch(uploadUserAction({ formData, dispatch: dispatch })).then(
          (res) => {
            console.log(res);

            if (res?.meta?.requestStatus === "fulfilled") {
              //showSuccess(res?.payload?.message, toast);
              if (res?.payload?.success?.length > 1) {
                showError(res?.payload?.success, toast);
              }
    
              if (res?.payload?.success?.length === 1) {
                showSuccess(res?.payload?.success, toast);
              }
    
              if (res?.payload?.error?.length > 1) {
                showError(res?.payload?.success, toast);
              }
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
            if (res?.meta?.requestStatus === "rejected") {
              showError(res?.payload, toast);
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
          }
        );
        break;
      case "bulk_update_email":
        console.log("email");
        dispatch(updateEmailAction({ formData, dispatch: dispatch })).then(
          (res) => {
            console.log(res);
            if (res?.meta?.requestStatus === "fulfilled") {
              //showSuccess(res?.payload?.message, toast);
              if (res?.payload?.success?.length > 1) {
                showError(res?.payload?.success, toast);
              }
    
              if (res?.payload?.success?.length === 1) {
                showSuccess(res?.payload?.success, toast);
              }
    
              if (res?.payload?.error?.length > 1) {
                showError(res?.payload?.success, toast);
              }

              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
            if (res?.meta?.requestStatus === "rejected") {
              showError(res?.payload, toast);
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
          }
        );
        break;
      case "bulk_update_cards":
        dispatch(updateCardAction({ formData, dispatch: dispatch })).then(
          (res) => {
            console.log(res);
            if (res?.meta?.requestStatus === "fulfilled") {
              //showSuccess(res?.payload?.message, toast);

              if (res?.payload?.success?.length > 1) {
                showError(res?.payload?.success, toast);
              }
    
              if (res?.payload?.success?.length === 1) {
                showSuccess(res?.payload?.success, toast);
              }
    
              if (res?.payload?.error?.length > 1) {
                showError(res?.payload?.success, toast);
              }

              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
            if (res?.meta?.requestStatus === "rejected") {
              showError(res?.payload, toast);
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
          }
        );
        break;
      case "bulk_create_account":
        dispatch(createAccountAction({ formData, dispatch: dispatch })).then(
          (res) => {
            console.log(res);
            if (res?.meta?.requestStatus === "fulfilled") {
              // showSuccess(res?.payload?.message, toast);

              if (res?.payload?.success?.length > 1) {
                showError(res?.payload?.success, toast);
              }

              if (res?.payload?.success?.length === 1) {
                showSuccess(res?.payload?.success, toast);
              }

              if (res?.payload?.error?.length > 1) {
                showError(res?.payload?.success, toast);
              }
              
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
            if (res?.meta?.requestStatus === "rejected") {
              showError(res?.payload, toast);
              setTimeout(() => {
                dispatch(updateProgress(0));
              }, 1000);
            }
          }
        );
        break;
      default:
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="px-4">
        <Row>
          <Col>
            <FormControlLabel
              value="GqhoyoCo"
              control={<Radio />}
              label="AXs [ AX ]"
              name="form_market_places"
              checked={MP.MP === "GqhoyoCo"}
              onChange={(e) => onOptionChange(e)}
            />
            <span>&nbsp; &nbsp;</span>
            <FormControlLabel
              value="GqhocoCo"
              control={<Radio />}
              label="ticketmaster [ TM ] "
              name="form_market_places"
              checked={MP.MP === "GqhocoCo"}
              onChange={(e) => onOptionChange(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormControlLabel
              value="GqhojoCo"
              control={<Radio />}
              label="Tickets [ TI ]"
              name="form_market_places"
              checked={MP.MP === "GqhojoCo"}
              onChange={(e) => onOptionChange(e)}
            />
            <FormControlLabel
              value="Gqhosqbo"
              control={<Radio />}
              label="WellsFargo [ WF ]"
              name="form_market_places"
              checked={MP.MP === "Gqhosqbo"}
              onChange={(e) => onOptionChange(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form
              encType="multipart/form-data"
              onSubmit={() => FileUploadHandler()}
            >
              <Form.Group className="mb-1" controlId="file">
                <Form.Label column md="9">
                  <span>{text}</span>
                </Form.Label>
                <Col sm="10">
                  <div className="file-upload">
                  <div
                    style={style.inputDiv}
                    onClick={() => FileUploadHandler()}
                    className="file_input"                   
                  >
                    {fileUpload}
                    <Form.Control
                      type="file"
                      name="file"
                      ref={fileRef}
                      onChange={(e) => {
                        uploadFile();
                      }}
                      //   value={inputValues.keyword}
                      hidden
                    />
                  </div>

                  <Button style={{ borderRadius: "0px" }}>
                    <UploadIcon onClick={() => FileUploadHandler()} />
                  </Button>
                  </div>

                </Col>
                <Col
                  style={{ marginTop: "10px" }}
                  className="d-flex justify-content-between"
                >
                  {progress > 0 && (
                    <Box
                      sx={{ width: "40%" }}
                      className=""
                      style={{ display: "inline-block" }}
                    >
                      <LinearProgress
                        color="secondary"
                        variant="determinate"
                        value={progress}
                      />
                      <span style={style.progressSpan}>{progress}%</span>
                    </Box>
                  )}
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

const style = {
  inputDiv: {
    minHeight: "35px",
    height: "35px",
    maxHeight: "60px",
    width: "200px",
    border: "1px grey solid",
  },
  progressSpan: {
    float: "right",
    marginTop: "-13px",
    marginRight: "-89px",
  },
};

export default BodyContentComponent;
