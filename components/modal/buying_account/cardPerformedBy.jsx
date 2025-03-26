import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";
import { useSelector, useDispatch } from "react-redux";
import {creditCardHistory} from '../../../store/reducer/BuyingAccount/ModalActions/creditCardSlice';

const CardPerformedByModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const {id} = useSelector((state)=>state?.showHideModal?.cardHistory);
  const historyData = useSelector((state)=>state?.creditCard?.historyData?.data);
  const {cardUserName, cardHistory} = historyData||{};
  const [user, setUser] = useState('');
  const [history, setHistory] = useState([]);
  

  useEffect(()=>{
    if(show===true){
      dispatch(creditCardHistory({ucID:id}))
    }
    
  },[dispatch, show ,id])

  useEffect(()=>{
    setUser(cardUserName?.email);
    setHistory(cardHistory);
  },[cardUserName])

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <div>
          <span className={rowData?.status === "1" ? "success" : "warning"}>
            <b>{rowData?.status === "1" ? "Success" : "Fail"}</b>
          </span>
        </div>
      </>
    );
  };
  //define columns here
  const columns = [
    { field: "action", header: "Action" },
    { field: "status", header: "Status" ,body:statusBodyTemplate},
    { field: "created", header: "Date" },
    { field: "last_performed_by", header: "Card Performed By" }, //body: userEmailBodyTemplate
    { field: "message", header: "Message" },
   
  ];

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        //className='cstm-credit_card-outer custom-modal'
        className="cstm-purchased-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
          <span style={{fontSize:'18px'}}>Card history <span className='warning'>{user}</span></span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={history}/>
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
};

export default React.memo(CardPerformedByModal);
