import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MergeRowTableComponent from "../../table/mergeRowTable";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";

export function SuccessfulOderOverLimitModal({ handleClose, show }) {
const [history1, setHistory]= useState([]);
const {successHistoryData} =  useSelector((state)=>state.overLimitAccount);
const history = [
  { key: "1", zone: "John Doe", age: 32, phone: 123456 },
  { key: "2", zone: "Jane Smith", age: 32, phone: 123456 },
  { key: "3", zone: "John Doe", age: 32, phone: 123456 },
  { key: "4", zone: "John Doe", age: 28, phone: 123456 },
  { key: "4", zone: "John Doe", age: 28, phone: 123456 },
  { key: "5", zone: "Alice Johnson", age: 46, phone: 123456 },
  { key: "6", zone: "Alice Johnson", age: 47, phone: 123456 },
  { key: "7", zone: "Alice Johnson", age: 45, phone: 123456 },
];
useEffect(() => {
  if (successHistoryData?.length > 0) {
    setHistory(successHistoryData);
  }
}, [successHistoryData]);


    const columns = [
        {
          title: "Plugin User",
          dataIndex: "zone",
          key: "zone",
          width: "fit-content",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "zone");
            return {
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Market Place",
          dataIndex: "section",
          key: "section",
          width: "fit-content",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "section");
            return {
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Event Name",
          dataIndex: "row",
          key: "row",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "row");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Event Date/Time",
          dataIndex: "seat",
          key: "seat",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "seat");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Payment date",
          dataIndex: "seat",
          key: "seat",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "seat");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Amount",
          dataIndex: "seat",
          key: "seat",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "seat");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Tickets",
          dataIndex: "seat",
          key: "seat",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "seat");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
          },
        },
        {
          title: "Comment",
          dataIndex: "seat",
          key: "seat",
          onCell: (record, rowIndex) => {
            const rowSpan = calculateRowSpan(history, rowIndex, "seat");
            return {
              //children: text,
              rowSpan: rowSpan,
            };
          },
          render: (_, record) => {
            return<><span>{_}</span></>
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
            <span>Successful order history between limit error date for</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MergeRowTableComponent columns={columns} data={history} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="closeAdminButton"
            onClick={handleClose}
            style={{ marginRight: "0px" }}
          >
            <CloseIcon />
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
