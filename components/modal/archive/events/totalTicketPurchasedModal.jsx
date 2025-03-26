import React, { useEffect, useState , useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "../../../table/homeModalTable/rowSpanDynamicTable";
import { useSelector , useDispatch } from "react-redux";
import CreditCardModalForEvent from "../../../modal/archive/events/creditCardModal";
import {showEventCreditModal , hideEventCreditModal} from "../../../../store/reducer/Archives/archiveEventSlice";
import { readCreditCardAction } from "../../../../store/reducer/BuyingAccount/ModalActions/creditCardSlice";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";
import { getMarketPlace } from "../../../../services/helper";


export function ArchiveEventTotalTicketPurchasedModal({ handleClose, show }) {
  const dispatch = useDispatch()
  let toast = useRef(null);
  const [tableData, setTableData] = useState([]);
  const { ticket_purchase_table_data } = useSelector((state) => state?.modal);
  const { showTotalTicketPurchasedModal ,totalTicketPurchasedModalData } = useSelector((state) => state?.archiveEvent);
  const [eventName, setEventName] = useState('');

  console.log(totalTicketPurchasedModalData, 'totalTicketPurchasedModalData')
 

  useEffect(() => {
    setEventName(ticket_purchase_table_data?.event?.event_name);
    if (ticket_purchase_table_data?.ticketHistory?.length > 0) {
      setTableData(ticket_purchase_table_data?.ticketHistory);
    } else {
      setTableData([]);
    }
  }, [ticket_purchase_table_data]);


  console.log(ticket_purchase_table_data, 'ticket_purchase_table_data')

   //Table columns
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
                  onClick={() => {
                    let mp = getMarketPlace(record?.mp)
                    console.log(mp ,'mpmpmpmpmpmpmpmp' , {mpID: mp, tcID: record.transaction_id})
                    dispatch(readCreditCardAction({mpID: mp, tcID: record.transaction_id})).then((response) => {                    
                      // if (response?.meta?.requestStatus === "rejected") {
                      //   showError(response.payload, toast)
                      // }else{
                        dispatch(showEventCreditModal({modal:'total_ticket_purchased' ,data:record}));
                      //}
                     
                    });
                  }}
                >
                 {record?.card.split('[')?.[0]}
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
      render: (_, record) => {
        return <>{"$" + record.price}</>;
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
      dataIndex: "msg",
      key: "msg",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "msg");
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
  };

  return (
    <>
    <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="cstm-purchased-outer custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: "20px" }}>
              {" "}
              Purchased Ticket Summary{" "}
              <span style={{ color: " #F80" }}>{eventName}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable columns={columns} data={tableData} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="closeAdminButton"
          >
            <i className="fa fa-times"></i>Close
          </Button>
        </Modal.Footer>
      </Modal>

      <CreditCardModalForEvent
        show={showTotalTicketPurchasedModal}
        handleClose={() => {
          dispatch(hideEventCreditModal({modal:'total_ticket_purchased'}));
        }}
      />
    </>
  );
}
