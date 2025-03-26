import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import UserAccountBulkUpdateModalBody from "./userAccountBulkUpdate";


export function UserAccountBulkUpdateModal({ handleClose, show}) {
    const [uploadType ,setUploadType] = useState('bulk_create_account')

  return (
    <>     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom_header_modal"
      >
        <Modal.Header closeButton>
        <Row>
            <Col>
              {" "}
              <FormControlLabel
                value="bulk_create_account"
                control={<Radio />}
                label="Bulk create account "
                name="upload_type"
                checked={uploadType === "bulk_create_account"}
              />
             
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body className="px-4">
          <UserAccountBulkUpdateModalBody/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
