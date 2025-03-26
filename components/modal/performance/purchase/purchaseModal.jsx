import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import MergeRowTableComponent from "../../../table/mergeRowTable";
import { performancePurchaseDetail ,showCreditModal ,hideCreditModal} from "../../../../store/reducer/Performance/performanceSlice";
import { PurchaseCreditModal } from "./creditModal";

export function PurchasesPurchaseModal({ handleClose, show  }) {
  const dispatch = useDispatch();
  const { id, eventName } = useSelector(
    (state) => state.showHideModal?.performance_purchase_data
  );
  const { purchaseDetail, showPurchaseCreditModal } = useSelector((state) => state?.performance);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    if (show === true) {
      dispatch(performancePurchaseDetail({ ID: id })).then((response) => {
        console.log(response, "response");
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log(purchaseDetail, "purchaseDetail");
    if (purchaseDetail?.data?.length > 0) {
      setData(purchaseDetail?.data);
    }
  }, [purchaseDetail]);


  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "email");
        return {
          //children: text,
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
            <span>{_}</span>
          </>
        );
      },
    },
    {
      title: "Credit Card",
      dataIndex: "cardName",
      key: "cardName",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "cardName");
        return {
          //children: text,
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
            {record !== undefined &&
            record !== null &&
            record?.cardName !== 0 ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showCreditModal({ modal: "purchase", data: record }));
                }}
              >
                {record?.cardName}
              </Button>
            ) : (
              <div>
                <span style={{ marginLeft: "16px" }}>_</span>
              </div>
            )}
          </>
        );
      },
    },

    {
      title: "Tickets",
      dataIndex: "tickets",
      key: "tickets",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "tickets");
        return {
          //children: text,
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
            <span>{_}</span>
          </>
        );
      },
    },
  
    {
      title: "Purchase Time",
      dataIndex: "time",
      key: "time",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "time");
        return {
          //children: text,
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
            <span>{_}</span>
          </>
        );
      },
    },
    {
      title: "Total amount",
      dataIndex: "amount",
      key: "amount",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "eventDate");
        return {
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
            <span>${_}</span>
          </>
        );
      },
    },

  ];
  const calculateRowSpan = (data, index, key) => {
    const currentValue = data[index][key];
    let rowSpan = 1;

    for (let i = index + 1; i < data.length; i++) {
      if (data[i][key] === currentValue) {
        rowSpan++;
      } else {
        break;
      }
    }

    for (let i = index - 1; i >= 0; i--) {
      // if the index is not first occurance , set rowspan to 0
      if (data[i][key] === currentValue) {
        return 0;
      } else {
        break;
      }
    }
    return rowSpan;
  };

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
          <Modal.Title>
            {" "}
            <span>
              Purchases made by: <span className="warning">{}</span>
            </span>
            <br />
            <span>
              For Event: <span className="warning">{eventName}</span>
            </span>
            <br />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MergeRowTableComponent columns={columns} data={data} />
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

      {/*  */}
      <PurchaseCreditModal
        show={showPurchaseCreditModal}
        handleClose={() => {
          dispatch(hideCreditModal({ modal: "purchase" }));
        }}
      />
    </>
  );
}