import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../table/buying_account/commonTable";
import {performancePluginUserPurchase} from "../../../store/reducer/Performance/performanceSlice";
import { showModal } from "../../../store/reducer/Modal/showAndHideModal";



export function PerformanceAmountModal({ handleClose, show }) {
  const dispatch = useDispatch();
  const {id, name,performance_amount_firstPurchase} = useSelector(
    (state) => state.showHideModal.performanceAmountData
  );

  const {pluginUserDetail} = useSelector(
    (state) => state.performance
  );
  console.log(id, "purchase",pluginUserDetail);

  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    if (show === true) {
      dispatch(performancePluginUserPurchase({userID:id}));
    }
  }, [id]);

  useEffect(()=>{
    if(pluginUserDetail?.data?.length>0){
      setTableData(pluginUserDetail?.data)
    }

  },[pluginUserDetail])

  const columns = [
    { header: "Event Name", field: "eventName" },
    {
      header: "Number of tickets purchased",
      field: "tickets",
      field: "tickets",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData?.tickets !== 0 ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showModal({ modal: "performance/amount/purchase", data: rowData }));
                }}
              >
                {rowData?.tickets}
              </Button>
            ) : (
              <div>
                <span style={{ marginLeft: "16px" }}>{rowData?.tickets}</span>
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "First Purchase",
      field: "minTime",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData?.minTime !== 0 ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showModal({ modal: "performance/amount/firstPurchase", data: rowData }));
                }}
              >
                {rowData?.minTime}
              </Button>
            ) : (
              <div>
                <span style={{ marginLeft: "16px" }}>{rowData?.minTime}</span>
              </div>
            )}
          </>
        );
      },
    }, //body: userEmailBodyTemplate
    {
      header: "Last Purchase",
      field: "maxTime",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData?.maxTime !== 0 ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showModal({ modal: "performance/amount/lastPurchase", data: rowData }));
                }}
              >
                {rowData?.maxTime}
              </Button>
            ) : (
              <div>
                <span style={{ marginLeft: "16px" }}>{rowData?.maxTime}</span>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='cstm-purchased-outer custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title><span>Purchases made by:<span className="warning">{name}</span></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={tableData}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="closeAdminButton">
          <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>


     
    </>
  );
}
