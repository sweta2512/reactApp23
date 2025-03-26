import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";



const LastUsedModal = ({handleClose, show}) => {
  const [data, setData] = useState([]);
  const  {id, email} = useSelector((state) => state?.showHideModal?.lastUsedData||[]);
  let { purchase_data } = useSelector((state) => state.purchase);
  

  useEffect(() => {
    setData(purchase_data);
  }, [purchase_data]);



  //define columns here
  const columns = [
    { field: "pluginUser", header: "Plugin user" },
    { field: "eventName", header: "Event Name" },
    { field: "purchaseDate", header: "Purchase Date" },
    {
      field: "amount",
      header: "Amount",
      body: (rowData) => {
        return <>${parseInt(rowData?.amount)}</>;
      },
    },
    { field: "creditCard", header: "Credit Card" },
    { field: "email", header: "Email" },
    { field: "tickets", header: "Tickets" },
    { field: "comment", header: "Comment" },
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
          <span style={{fontSize:'18px'}}> Last purchase for User Account: <span className="warning">{email??''}</span></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={data}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="closeAdminButton ">
          <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(LastUsedModal);
