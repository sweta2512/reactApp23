import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";


const LastPurchasedModal = ({ handleClose, show  }) => {
  const [tableData, setTableData] = useState([]);
  let {name} = useSelector((state) => state.showHideModal.failed_order_last_purchase_modal_data);
  let { purchase_data } = useSelector((state) => state.purchase);
 

  useEffect(()=>{
    setTableData(purchase_data)
  },[purchase_data])
  

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
            <span className="modalTitle">
              Last purchase for <span className="warning">{name}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={tableData} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="closeAdminButton"
          >
            <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LastPurchasedModal