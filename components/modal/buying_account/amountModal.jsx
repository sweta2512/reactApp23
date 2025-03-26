import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MergeRowTableComponent from "../../table/mergeRowTable";

import { purchaseBuyingAccountAction } from "../../../store/reducer/BuyingAccount/ModalActions/updatePasswordSlice";
import { useSelector, useDispatch } from "react-redux";

const AmountModal = ({ handleClose, show }) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const { id } = useSelector((state) => state.showHideModal?.amountData);
  const [email, setEmail] = useState(null);
  const data = useSelector(
    (state) => state.buyingaccountUpdatePassword?.purchase_data?.data
  );

  const { filters } = useSelector((state) => state?.buyingaccount);
  

  useEffect(() => {
    if (show === true) {
      dispatch(
        purchaseBuyingAccountAction({
          ID: id,
          purchaseBy: filters?.purchasesBy,
        })
      );
    }
  }, [id, show,dispatch, filters?.purchasesBy]);

  useEffect(() => {
    setEmail(data?.userName);
    if (data?.data.length > 0) {
      setTableData(data?.data);
    }
  }, [data]);

  const columns = [
    {
      title: "Plugin User ",
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
            <span>{_}</span>
          </>
        );
      },
    },
    {
      title: "Market Place",
      dataIndex: "marketPlace",
      key: "marketPlace",
      width: "fit-content",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "marketPlace");
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
      dataIndex: "eventName",
      key: "eventName",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "eventName");
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
      title: "Event Date/Time",
      dataIndex: "eventDate",
      key: "eventDate",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "eventDate");
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
      title: "Payment date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "paymentDate");
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
        const rowSpan = calculateRowSpan(tableData, rowIndex, "amount");
        return {
          //children: text,
          rowSpan: rowSpan,
        };
      },
      render: (_, record) => {
        return (
          <>
             <span>${parseInt(_)}</span>
          </>
        );
      },
    },
    {
      title: "Tickets",
      dataIndex: "tickets",
      key: "tickets",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "tickets");
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
      dataIndex: "comment",
      key: "comment",
      onCell: (record, rowIndex) => {
        const rowSpan = calculateRowSpan(tableData, rowIndex, "comment");
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
            <span style={{ fontSize: "18px" }}>
              User payment history for <span className="warning">{email}</span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MergeRowTableComponent columns={columns} data={tableData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  className="closeAdminButton ">
          <i className="fa fa-times"></i>Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(AmountModal);
