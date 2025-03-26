import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../table/buying_account/commonTable";
import { userModifiedAction } from "../../../store/reducer/BuyingAccount/ModalActions/userModifiedSlice";
import { MarketPlaceUrlParseHelper } from "../../../services/helper";
import moment from 'moment';

const UserModifiedModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [userHistory, setUserHistory] = useState("");
  const { id } = useSelector((state) => state?.showHideModal?.userModifiedData)||[];
  const { data } = useSelector((state) => state?.userModified);


  useEffect(() => {
    if (show === true) {
      dispatch(userModifiedAction({ ID: id }));
    }
  }, [dispatch, id, show]);

  useEffect(() => {
    setUserHistory(data?.data?.userHistory?.historyUserEnabled);
  }, [data]);

  const actionBodyTemplate = (rowData) => {
    return (
      <>{rowData?
        <div
          style={{ width: "100%" }}
          className={Boolean(rowData?.enabled) === true ? "success" : "warning"}
        >
          <b>{Boolean(rowData?.enabled) === true ? "Enabled" : "Disabled"}</b>
        </div>:'-'}
      </>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <>
        {rowData?.time ? (
          <div style={{ width: "100%" }}>
            { moment(rowData?.time).format("lll")}
          </div>
        ) : (
          "-"
        )}
      </>
    );
  };

  const commentBodyTemplate = (rowData) => {
    const theObj = { __html: rowData?.message };
    return (
      <>
        {rowData?.message ? (
          <div style={{ width: "100%" }} dangerouslySetInnerHTML={theObj} />
        ) : (
          "-"
        )}
      </>
    );
  };
  const eventUrlBodyTemplate = (rowData) => {
    let mp = MarketPlaceUrlParseHelper(rowData.event_url??'');
     // Check if event_url is not null, undefined, or a blank string
    const isValidUrl = rowData?.event_url && rowData.event_url?.trim() !== '';
    return (
      <>
        {isValidUrl ? (
          <a href={mp.event_url} target="_blank"  rel="noreferrer">
            <img
              className="event_url"
              src={mp.IMG||''}             
              alt="market place"
            />
          </a>
        ) : (
          "-"
        )}
      </>
    );
  };
  //define columns here
  const columns = [
    { field: "enabled", header: "Action", body:actionBodyTemplate },
    { field: "time", header: "Date", body: dateBodyTemplate },
    { field: "message", header: "Comment", body: commentBodyTemplate },
    { field: "event_url", header: "Event URL", body: eventUrlBodyTemplate }, //body: userEmailBodyTemplate
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
          <Modal.Title><span style={{fontSize:'18px'}}>User modified history for <span className="warning">{data?.data?.userName}</span></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={userHistory} />
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

export default React.memo(UserModifiedModal);
