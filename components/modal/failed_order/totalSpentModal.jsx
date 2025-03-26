import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "../../table/homeModalTable/rowSpanDynamicTable";
import CloseIcon from "@mui/icons-material/Close";
import { purchasedTicketsShowModalAction } from "../../../store/reducer/Home/homemodalSlice";
import { getMarketPlace } from "../../../services/helper";
import { readCreditCardAction } from "../../../store/reducer/BuyingAccount/ModalActions/creditCardSlice";
import CreditCardModal from "../../modal/failed_order/totalSpentCreditCardModal";
import { showCreditModal, hideCreditModal } from "../../../store/reducer/FailedOrder/failedOrderSlice";

const TotalSpentModal = ({ handleClose, show}) => {

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  let { id, name } = useSelector((state) => state.showHideModal.failed_order_total_spent_modal_data);
  const { ticket_purchase_table_data } = useSelector((state) => state?.modal);
  const { showTotalSpentCreditModal } = useSelector((state) => state.failedOrder);

  useEffect(() => {
    if (ticket_purchase_table_data?.ticketHistory?.length > 0) {
      setTableData(ticket_purchase_table_data?.ticketHistory);
    } else {
      setTableData([]);
    }
  }, [ticket_purchase_table_data]);

  // useEffect(() => {
  //   if (show === true) {
  //     dispatch(purchasedTicketsShowModalAction({ ID: id })).then((response) => {
  //       console.log(response, "response");
  //       if (response.meta.requestStatus === "fulfilled") {
  //         console.log(response, "response");
  //       }
  //     });
  //   }
  // }, [dispatch, id, show]);



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
                      let mp = getMarketPlace(record?.mp);
                      dispatch(
                        readCreditCardAction({
                          mpID: mp,
                          tcID: record.transaction_id,
                        })
                      ).then((response) => {
                        dispatch(
                          showCreditModal({
                            modal: "total_spent_credit_card",
                          })
                        );
                      });
                    }}
                  >
                    {record?.card.split("[")?.[0]}
                  </Button>
                </>
              ) : (
                "NA"
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
          return (
            <>
              <span>{record?.price ? "$" + record?.price : "NA"}</span>
            </>
          );
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
              Purchased Ticket Summary{" "}
              <span className="warning">{name || ""}</span>
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
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>

      <CreditCardModal
        show={showTotalSpentCreditModal}
        handleClose={() => {
          dispatch(hideCreditModal({ modal: "total_spent_credit_card" }));
        }}
      />
    </>
  );
}

export default TotalSpentModal