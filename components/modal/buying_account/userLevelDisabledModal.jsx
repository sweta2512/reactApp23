import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";
import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {eventLevelDisabledAction} from '../../../store/reducer/BuyingAccount/ModalActions/userModifiedSlice';



function UserLevelDisabledModal({ handleClose, show }) {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const { id, email } = useSelector((state) => state.showHideModal?.data);
  const data = useSelector(
    (state) => state?.userModified?.eventLevelDisabledData?.data
  );

  useEffect(() => {
    dispatch(eventLevelDisabledAction({ ID: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setHistory(data?.history);
  }, [data]);


  const eventNameBodyTemplate = (rowData) => {
    return (
      <>
        <div>
          {rowData?.event?.event_name && rowData?.event?.event_time ? (
            <span>
              {rowData?.event?.event_name} ({moment(rowData?.event?.event_time,["YYYY-MM-DD"]).format("DD/MM/YY HH:MM")})
            </span>
          ) : (
            <span>-</span>
          )}
        </div>
      </>
    );
  };

  const timeDateBodyTemplate = (rowData)=>{
    return (
      <>
        <div>
          {rowData?.time ? (
            <span>
               {moment(rowData?.time, ["YYYY-MM-DD"]).format("MMM Do, YYYY HH:MM")}
            </span>
          ) : (
            <span>-</span>
          )}
        </div>
      </>
    );
  }
  //define columns here
  const columns = [
    { field: "plugin_user.display_name", header: "Plugin User",},
    { field: "event.event_name", header: "Event Name",  body:eventNameBodyTemplate},
    {field: "time", header: "Time",body:timeDateBodyTemplate},
    { field: "msg", header: "Message",}, 
  ];
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='cstm-credit_card-outer custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{fontSize:'18px'}}>
              Event level disabled history for{" "}
              <span className="warning">{email ?? ""}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={history} />
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
}

export default UserLevelDisabledModal;
