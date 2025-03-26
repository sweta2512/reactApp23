import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";
import CloseIcon from "@mui/icons-material/Close";

const LastPurchaseModal = ({ handleClose, show }) => {
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
          <Modal.Title>
            Last purchase for Event:
            <span style={{ color: " #F80" }}>{name}</span>
          </Modal.Title>
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
            <CloseIcon /> Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(LastPurchaseModal);
