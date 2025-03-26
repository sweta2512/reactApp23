import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "../../../table/homeModalTable/rowSpanDynamicTable";
import CloseIcon from "@mui/icons-material/Close";
import { purchasedTicketsShowModalAction } from "../../../../store/reducer/Home/homemodalSlice";
import {showEventCreditModal , hideEventCreditModal} from "../../../../store/reducer/Archives/archiveEventSlice";
import { readCreditCardAction } from "../../../../store/reducer/BuyingAccount/ModalActions/creditCardSlice";

import CreditCardModalForTotalSpentEvent from "../../../modal/archive/events/creditCardTotalSpentModal";

import { getMarketPlace } from "../../../../services/helper";

export function ArchiveEventTotalSpentModal({ handleClose, show, creditcard }) {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [eventName ,setEventName] = useState('');
  let { id, name } = useSelector((state) => state.modal.eventDetali);
  const { ticket_purchase_table_data } = useSelector((state) => state?.modal);
console.log(ticket_purchase_table_data,'ticket_purchase_table_data')

const { showTotalSpentModal } = useSelector((state) => state?.archiveEvent);


// let tableData1 = [
//   {
//     id: 1000,
//     name: "James Butt",
//     country: {
//       name: "Algeria",
//       code: "dz",
//     },
//     company: "Benton, John B Jr",
//     date: "2015-09-13",
//     card: "unqualified",
//     verified: true,
//     activity: 17,
//     representative: {
//       name: "Ioni Bowcher",
//       image: "ionibowcher.png",
//     },
//     balance: 70663,
//   },
// ];

  useEffect(() => {
    setEventName(ticket_purchase_table_data?.event?.event_name)
    if (ticket_purchase_table_data?.ticketHistory?.length > 0) {
      setTableData(ticket_purchase_table_data?.ticketHistory);
    } else {
      setTableData([]);
    }
  }, [ticket_purchase_table_data]);

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
                   // console.log(mp ,'mpmpmpmpmpmpmpmp' , {mpID: mp, tcID: record.transaction_id})
                    dispatch(readCreditCardAction({mpID: mp, tcID: record.transaction_id})).then((response) => {
                      console.log(response, "response");
                      dispatch(
                        showEventCreditModal({
                          modal: "total_spent",
                        })
                      );
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
          <Modal.Title> <span style={{fontSize: '20px'}}> Purchased Ticket Summary <span style={{ color: " #F80"}}>{eventName}</span></span></Modal.Title>
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


      <CreditCardModalForTotalSpentEvent
        show={showTotalSpentModal}
        handleClose={() => {
          dispatch(hideEventCreditModal({modal:'total_spent'}));
        }}
      />
    </>
  );
}
