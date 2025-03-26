import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../../table/buying_account/commonTable";
import CloseIcon from "@mui/icons-material/Close";



export function ArchiveEventLastPurchaseModal({ handleClose, show, creditcard }) {


  const [data, setData] = useState([]);
  let { name } = useSelector((state) => state.modal.eventDetali);
  let { purchase_data } = useSelector((state) => state.purchase);

  useEffect(() => {
    setData(purchase_data);
  }, [purchase_data]);

  const columns = [
    { header: "Plugin user", field: "pluginUser" },
    { header: "Event Name", field: "eventName" },
    { header: "Purchase Date", field: "purchaseDate" },
    { header: "Amount", field: "amount" }, //body: userEmailBodyTemplate
    { header: "Credit Card", field: "creditCard" },
    { header: "Email", field: "email" },
    { header: "Tickets", field: "tickets" },
    { header: "Comment", field: "comment" },
  ];
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="cstm-purchased-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title><span style={{fontSize: '20px'}}> Last purchase for Event : <span style={{ color: " #F80"}}>{'eventName'}</span></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="closeAdminButton"
          >
            <i className="fa fa-times"></i>Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
