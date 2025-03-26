import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../../table/buying_account/commonTable";
import { useSelector } from "react-redux";

const PluginLastPurchasedModal = ({ handleClose, show }) => {
  const { display_name } = useSelector(
    (state) => state.showHideModal?.pluginLastPurchasedData || []
  );
  let { purchase_data } = useSelector((state) => state.purchase);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(purchase_data);
  }, [purchase_data]);

  const columns = [
    { header: "Plugin user", field: "pluginUser" },
    { header: "Event Name", field: "eventName" },
    { header: "Purchase Date", field: "purchaseDate" },
    {
      header: "Amount",
      field: "amount",
      body: (rowData) => {
        return <> {rowData?.amount && <>{"$" + rowData.amount}</>}</>;
      },
    }, 
    { header: "Credit Card", field: "creditCard" },
    { header: "Email", field: "email" },
    { header: "Tickets", field: "tickets" },
    { header: "Comment", field: "comment" },
  ];

  //data={data}

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
            <span>
              Last purchase for Plugin User:{" "}
              <span className="warning">{display_name}</span>
            </span>
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
            <i className="fa fa-times"></i>Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PluginLastPurchasedModal;
