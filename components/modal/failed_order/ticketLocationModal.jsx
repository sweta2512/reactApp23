import React ,{useEffect, useState}from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "../../table/homeModalTable/rowSpanDynamicTable";
import { ticketLocationModalAction } from "../../../store/reducer/Home/homemodalSlice";

const TicketLocationModal = ({ handleClose, show }) => {

  const dispatch = useDispatch();
  const [eventName ,setEventName] = useState('');
  const [history, setHistory] = useState([]);
  const { id, name } = useSelector((state) => state.showHideModal.failed_order_ticket_location_modal_data);
  const location_data = useSelector((state) => state?.modal?.loaction_modal_data);
  const {event, histories} = location_data ||[];

  // useEffect(()=>{
   
  //   if (show === true) {
  //     dispatch(ticketLocationModalAction({ ID: id })).then((response) => {
  //       if (response.meta.requestStatus === "fulfilled") {
  //        // console.log(response,'response')
  //       }
  //     });
  //   }
  // },[dispatch,id,show])


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
        className="cstm-purchased-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="modalTitle">
              Ticket Location <span className="warning">{"Monster Jam"}</span>
            </span>
          </Modal.Title>
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
            <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TicketLocationModal