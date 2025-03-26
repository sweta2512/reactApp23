import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import BodyContentComponent from "./bodyContentComponent";
import { setBulkUpdateType } from "../../../../store/reducer/BuyingAccount/buyingAccountSlice";

export function BulkUpdateModal({ handleClose, show }) {
  const dispatch = useDispatch();

  const uploadType = useSelector(
    (state) => state.buyingaccount?.bulkUpdateType
  );
 

  const onOptionChange = (e) => {
    dispatch(
      setBulkUpdateType({
        ...uploadType,
        type: e.target.value,
      })
    );
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id="bulk_update_modal"
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Row style={{ marginLeft: "11px" }}>
            <Col>
              {" "}
              <FormControlLabel
                value="bulk_upload_users"
                control={<Radio />}
                label="Bulk upload users "
                name="upload_type"
                checked={uploadType.type === "bulk_upload_users"}
                onChange={(e) => onOptionChange(e)}
              />
              <FormControlLabel
                value="bulk_update_email"
                control={<Radio />}
                label="Bulk update emails "
                name="upload_type"
                checked={uploadType.type === "bulk_update_email"}
                onChange={(e) => onOptionChange(e)}
              />
              <FormControlLabel
                value="bulk_update_cards"
                control={<Radio />}
                label="Bulk update cards "
                name="upload_type"
                checked={uploadType.type === "bulk_update_cards"}
                onChange={(e) => onOptionChange(e)}
              />
              <FormControlLabel
                value="bulk_create_account"
                control={<Radio />}
                label="Bulk create account "
                name="upload_type"
                checked={uploadType.type === "bulk_create_account"}
                onChange={(e) => onOptionChange(e)}
              />
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <BodyContentComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ float: "right" }}
            className="closeAdminButton "
          >
            <i className="fa fa-times"></i> Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
