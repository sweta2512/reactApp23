import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import MergeRowTableComponent from "../../../table/mergeRowTable";
import { performancePurchaseDetail } from "../../../../store/reducer/Performance/performanceSlice";

export function TicketsFirstPurchaseModal({ handleClose, show  }) {
  const dispatch = useDispatch();
  const { id, eventName } = useSelector(
    (state) => state.showHideModal?.performance_ticket_firstPurchase_data
  );
  const { purchaseDetail } = useSelector((state) => state?.performance);
  const [data, setData] = useState([]);
  console.log(purchaseDetail, "performance_amount_firstPurchase_data" ,eventName
  );
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
      setData(purchaseDetail?.data)
    }
  }, [purchaseDetail]);


  const columns = [
    {
      title: "Plugin User ",
      dataIndex: "pluginUser",
      key: "pluginUser",
      width: "fit-content",
      onCell: (record, rowIndex) => {
        //const rowSpan = data.filter((item, idx) => idx < index && item.name === text).length + 1;
        const rowSpan = calculateRowSpan(data, rowIndex, "pluginUser");
        return {
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
      title: "Event Name",
      dataIndex: "marketPlace",
      key: "marketPlace",
      width: "fit-content",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "marketPlace");
        return {
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
      title: "Purchase Date",
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
      title: "Amount",
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
            <span>{_}</span>
          </>
        );
      },
    },
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
      title: "Comment",
      dataIndex: "amount",
      key: "Comment",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(data, rowIndex, "amount");
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
        className="cstm-purchased-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span>
              First purchase for
              <br /> Plugin User:
              <span className="warning">{purchaseDetail?.title?.user}</span>
              <br />
              <span>
                Event: <span className="warning">{eventName}</span>
              </span>
            </span>
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
    </>
  );
}