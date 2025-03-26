import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "../../../table/buying_account/commonTable";
import { userModifiedAction } from "../../../../store/reducer/BuyingAccount/ModalActions/userModifiedSlice";
import { MarketPlaceUrlParseHelper } from "../../../../services/helper";
import moment from "moment";

const UserModifiedModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [userHistory, setUserHistory] = useState([]);
  const [userName, setUserName] = useState('');
  
  const { id } = useSelector(
    (state) => state?.archiveBuyingAccount?.user_modified_data
  );
  const { data } = useSelector((state) => state?.userModified);

  useEffect(() => {
    if (show === true) {
      dispatch(userModifiedAction({ ID: id }));
    }
  }, [dispatch, id, show]);

  useEffect(() => {
    setUserName(data?.data?.userName)
    setUserHistory(data?.data?.userHistory?.historyUserEnabled);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        field: "enabled",
        header: "Action",
        body: (rowData) => {
          return (
            <>
              {rowData ? (
                <div
                  style={{ width: "100%" }}
                  className={
                    Boolean(rowData?.enabled) === true ? "success" : "warning"
                  }
                >
                  <b>
                    {Boolean(rowData?.enabled) === true
                      ? "Enabled"
                      : "Disabled"}
                  </b>
                </div>
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        field: "time",
        header: "Date",
        body: (rowData) => {
          return (
            <>
              {rowData?.time ? (
                <div style={{ width: "100%" }}>
                  {moment(rowData?.time).format("lll")}
                </div>
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        field: "message",
        header: "Comment",
        body: (rowData) => {
          const theObj = { __html: rowData?.message };
          return (
            <>
              {rowData?.message ? (
                <div
                  style={{ width: "100%" }}
                  dangerouslySetInnerHTML={theObj}
                />
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        field: "event_url",
        header: "Event URL",
        body: (rowData) => {
          let mp = MarketPlaceUrlParseHelper(rowData?.event_url||'');
          return (
            <>
              {rowData?.event_url ? (
                <a href={mp.event_url} target="_blank" rel="noreferrer">
                  <img className="event_url" src={mp.IMG} alt="market place" />
                </a>
              ) : (
                "-"
              )}
            </>
          );
        },
      }, 
    ],
    []
  );
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
          <Modal.Title><span style={{fontSize:'18px'}}>User modified history for <span className="warning">{userName||""}</span></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={userHistory} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"           
            style={{ float: "right" }}
            className="closeAdminButton"
            onClick={handleClose}
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
