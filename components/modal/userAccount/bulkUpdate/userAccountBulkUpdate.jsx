import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Radio from "@mui/material/Radio";
import Form from "react-bootstrap/Form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "react-bootstrap/Button";
import {
  showError,
  showInfo,
  showSuccess,
} from "../../../utilities/toast_message";

import {
  createAccountAction,
  updateProgress,
} from "../../../../store/reducer/Upload/uploadFileSlice";

import { setBulkUpdateMarketPlace } from "../../../../store/reducer/BuyingAccount/buyingAccountSlice";

const UserAccountBulkUpdateModalBody = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [fileUpload, setFileUpload] = useState("Choose CSV File....");
  const fileRef = useRef(null);
  const MP = useSelector(
    (state) => state?.buyingaccount?.bulkUpdateMarketPlace
  );


  const progress = useSelector((state) => state.bulkUpload?.progress);
  console.log(progress, "progressprogressprogress");


  const onOptionChange = (e) => {
    dispatch(
      setBulkUpdateMarketPlace({
        ...MP,
        MP: e.target.value,
      })
    );
  };

  const FileUploadHandler = () => { 
    fileRef.current.click();
  };

  const uploadFile = () => {
    fileRef.current.click();
    const inputText = fileRef.current?.files[0]?.name
      ? fileRef.current?.files[0]?.name
      : "Choose CSV File....";

    setFileUpload(inputText);


    setTimeout(()=>{
        completeFileUpload();
    },1000)
   
  };



  const completeFileUpload = () =>{

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

    dispatch(createAccountAction({ formData, dispatch: dispatch })).then(
      (res) => {
        console.log(res);
        if (res?.meta?.requestStatus === "fulfilled") {
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

  }


  return (
    <>
      <Toast ref={toast} />
      <div>
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

        <Row style={{ width: "70%" }}>
          <Col>
            <Form
              encType="multipart/form-data"
              onSubmit={() => FileUploadHandler()}
            >
              <Form.Group className="mb-1" controlId="file">
                <Form.Label column md="9">
                  <span>Bulk upload users</span>
                </Form.Label>
                <Col sm="10" className="d-flex">
                  <div
                    style={style.inputDiv}
                    onClick={() => FileUploadHandler()}
                  >
                    {fileUpload}
                    <Form.Control
                      type="file"
                      name="file"
                      ref={fileRef}
                      onChange={(e) => {
                        uploadFile();
                      }}
                      // value={inputValues.keyword}
                      hidden
                    />
                  </div>

                  <Button style={{ borderRadius: "0px", display:"flex", alignItems:"center", height:"35px" }}>
                    <UploadIcon onClick={() => FileUploadHandler()} />
                  </Button>
                </Col>
                <Col
                  style={{ marginTop: "10px" }}
                  className="d-flex justify-content-between"
                >
                  {progress == 0 && (
                    <Box
                      sx={{ width: "100%" }}
                      className="progress_block"                      
                    >
                      <LinearProgress
                        color="secondary"
                        variant="determinate"
                        value={progress}
                        className="pro_input"
                      />
                      <span className="pro_label">{progress}%</span>
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
    maxHeight: "60px",
    width: "200px",
    border: "1px grey solid",
    display: "flex",
    alignItems: "center",
    paddingLeft: "5px",
  },
  // progressSpan: {
  //   float: "right",
  //   marginTop: "-13px",
  //   marginRight: "-89px",
  // },
};
export default UserAccountBulkUpdateModalBody;
