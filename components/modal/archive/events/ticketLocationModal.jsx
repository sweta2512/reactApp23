import React ,{useEffect, useState}from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "../../../table/homeModalTable/rowSpanDynamicTable";
import { ticketLocationModalAction } from "../../../../store/reducer/Home/homemodalSlice";
import CloseIcon from "@mui/icons-material/Close";

export function ArchiveEventTicketLocationModal({ handleClose, show, creditcard }) {
  const [eventName ,setEventName] = useState('');
  const [history, setHistory] = useState([]);
  const location_data = useSelector((state) => state?.modal?.loaction_modal_data);
  const {event, histories} = location_data ||[];


  useEffect(()=>{
    setHistory(histories)
    setEventName(event?.event_name||'')
    
  },[histories, event])

  const columns = [
    {
      title: "Zone",
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
      title: "Section",
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
      title: "Row",
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
      title: "Seat",
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
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{fontSize: '20px'}}> Ticket Location <span style={{ color: " #F80"}}>{eventName}</span></span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable columns={columns} data={history} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="closeAdminButton"
          >
            <i className="fa fa-times"></i> Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}
