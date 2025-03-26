import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "../../../table/homeModalTable/rowSpanDynamicTable";

import moment from "moment";










const NumberOfPurchaseModal = ({ handleClose, show }) => {
  const [tableData, setTableData] = useState([]);

  let tableData1 = [
    {
      id: 1000,
      name: "James Butt",
      country: {
        name: "Algeria",
        code: "dz",
      },
      company: "Benton, John B Jr",
      date: "2015-09-13",
      card: "unqualified",
      verified: true,
      activity: 17,
      representative: {
        name: "Ioni Bowcher",
        image: "ionibowcher.png",
      },
      balance: 70663,
    },
  ];


const columns = [
  {
    title: "User Name",
    dataIndex: "pluginUser",
    key: "pluginUser",
    width: "fit-content",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "pluginUser");
      return {
        rowSpan: rowSpan,
      };
    },
    render: (_, record) => {
      return (
        <>
          <span>{record?.pluginUser ? record?.pluginUser : "NA"}</span>
        </>
      );
    },
  },
  {
    title: "User Email",
    dataIndex: "userEmail",
    key: "userEmail",
    width: "fit-content",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "userEmail");
      return {
        rowSpan: rowSpan,
      };
    },
    render: (_, record) => {
      return (
        <>
          <span>{record?.userEmail ? record?.userEmail : "NA"}</span>
        </>
      );
    },
  },
  {
    title: "Credit Card",
    dataIndex: "card",
    key: "card",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "card");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
    },
    render: (_, record) => {
      return (
        <>
          {record?.card ? (
            <>
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                // onClick={() => {
                //   let mp = getMarketPlace(record?.mp)
                //   console.log(mp ,'mpmpmpmpmpmpmpmp' , {mpID: mp, tcID: record.transaction_id})
                //   dispatch(readCreditCardAction({mpID: mp, tcID: record.transaction_id})).then((response) => {
                //     console.log(response, "response");
                //     dispatch(
                //       showEventCreditModal({
                //         modal: "total_spent",
                //       })
                //     );
                //   });
                // }}
              >
                {record?.card}
              </Button>
            </>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    title: "Total Price",
    dataIndex: "price",
    key: "price",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "price");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
    },
  },
  {
    title: "Number of Tickets",
    dataIndex: "tickets",
    key: "tickets",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "tickets");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
    },
  },
  {
    title: "Market Place",
    dataIndex: "mp",
    key: "mp",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "mp");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
    },
  },
  {
    title: "Order ID",
    dataIndex: "transaction_id",
    key: "transaction_id",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "transaction_id");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
    },
  },
  {
    title: "Purchase Date",
    dataIndex: "time",
    key: "time",
    onCell: (record, rowIndex) => {
      const rowSpan = calculateRowSpan(tableData, rowIndex, "time");
      return {
        //children: text,
        rowSpan: rowSpan,
      };
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
}




   
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
              Last purchase for User Account:{" "}
              <span className="warning">
                {" "}
                davidHogan@eagertraining.com [ ticketmaster ]
              </span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable columns={columns} data={tableData} />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(NumberOfPurchaseModal);
