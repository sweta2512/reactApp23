import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { MultiSelect } from "primereact/multiselect";
// import Button from 'react-bootstrap/Button';
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";
import { Toast } from "primereact/toast";

import {
    setSelectedProduct,
  buyingAccountFormdata,
  buyingAccountMainTable,
} from "../../store/reducer/BuyingAccount/buyingAccountSlice";
import {
  SetShowUserModifiedByModal,
  SetShowAmountModal,
  showModal,
} from "../../store/reducer/BuyingAccount/buyingAccountModalSlice";
import { closeModal } from "../../store/reducer/BuyingAccount/buyingAccountModalSlice";
import { showArrow } from "../../store/reducer/ArrowButton/arrowButtonSlice";
import { activeDeactiveUserAction } from "../../store/reducer/BuyingAccount/ModalActions/actionSlice";
import { getExpiryFromCardName } from "../../services/helper";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
//modal
import UsernameModal from "../modal/buying_account/usernameModal";
import PasswordModal from "../modal/buying_account/passwordModal";
import TicketPasswordModal from "../modal/buying_account/ticketPasswordModal";
import CreditCardModal from "../modal/buying_account/creditCardModal";
import CardPerformedByModal from "../modal/buying_account/cardPerformedBy";
import UserModifiedModal from "../modal/buying_account/usermodifiedModal";
import AmountModal from "../modal/buying_account/amountModal";
import PurchaseModal from "../modal/buying_account/purchaseModal";
import LastUsedModal from "../modal/buying_account/lastUsedModal";
import UserLevelDisabledModal from "../modal/buying_account/userLevelDisabledModal";

import BuyingAccountArrowComponent from "../arrowcomponent/buyingAccountArrow";

const Table = ({data}) => {
    //define columns here
   
  //dispatch action
  const dispatch = useDispatch();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);
  
  const showSideArrow = useSelector((state) => state.showsidearrow);
  const show = useSelector((state) => state.modal);
  const showBuyingAccount = useSelector((state) => state.buyingaccountmodal);
  const settingAdmin = useSelector((state) => state.admin);
  const { loading } = useSelector((state) => state.buyingaccount);
//   const data = useSelector((state) => state.buyingaccount.selectedProduct);
//   console.log(data,'data2')
 // const data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;
  const filter = useSelector((state) => state.buyingaccount.filters);
  const [tabledata, setTabledata] = useState(data);
  console.log(tabledata, "datadatadata table2");
  useEffect(() => {
    setTabledata(data);
  }, [data]);

//   useEffect(() => {
//     dispatch(buyingAccountFormdata())
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(buyingAccountMainTable(filter))
//   }, [dispatch, filter]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dt = useRef(null);
  const toast = useRef(null);

 
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

 
  // Export file
  //   const exportColumns = columns.map((col) => ({
  //     title: col.header,
  //     dataKey: col.field,
  //   }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const CsvText = () => {
    return <span>CSV</span>;
  };

  const ExcelText = () => {
    return <span>Excel</span>;
  };

  //Export file completed here


  //active toggle
  const activeBodyTemplate = (rowData) => {
    return (
      <>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(rowData?.active)}
                  onChange={(event) => onToggleSwitch(rowData, event)}
                />
              }
            />
          </FormGroup>
        </div>
      </>
    );
  };
  const onToggleSwitch = (rowData, event) => {
    const Checked = event.target.checked;
    const ID = rowData?.id;
    console.log(tabledata, "hndl tabledata");

    //(" status changes", toast);
    const updatedDat = tabledata?.map((item) => {
      if (item.id === ID) {
        return {
          ...item,
          active: !item?.active,
        };
      }
      return item;
    });
    setTabledata(updatedDat);
    if (Checked === true) {
      dispatch(activeDeactiveUserAction({ ID: [ID] || [], checked: 1 })).then(
        (res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            showSuccess(res?.payload, toast);
          }
          if (res?.meta?.requestStatus === '"rejected"') {
            showError(res?.payload, toast);
          }
        }
      );
    } else {
      console.log(Checked, "   ", ID);
      dispatch(activeDeactiveUserAction({ ID: [ID] || [], checked: 0 })).then(
        (res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            showSuccess(res?.payload, toast);
          }
          if (res?.meta?.requestStatus === '"rejected"') {
            showError(res?.payload, toast);
          }
        }
      );
    }
  };

  //Show side arrow element
  function clickOnCheckBox(e) {
    console.log(e, "checkbox clicked");
    setSelectedProducts(e.value);
    let url = window.location.pathname;
    let checked = e?.originalEvent?.checked;
    dispatch(
      showArrow({
        url: url,
        length: e.value.length,
        users: e.value,
        checked: checked,
      })
    );
  }

  //card expiring
  const cardExpiringBodyTemplate = (rowData, rowIndex) => {
    
    let expiry = getExpiryFromCardName(rowData?.creditCard || "");
    return (
      <>
        <div>
          {rowData !== null && rowData !== undefined && rowData?.creditCard ? (
            <>
              <span>{expiry !== undefined ? expiry : "-"}</span>
            </>
          ) : (
            "_"
          )}
        </div>
      </>
    );
  };

  const eventLevelDisabledBodyTemplate = (rowData) => {
    return (
      <>
        {rowData !== undefined &&
        rowData !== null &&
        rowData?.eventLevelDisabled ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              eventLevelDisabledModalHandle(rowData);
            }}
          >
            {rowData?.eventLevelDisabled}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };
  const eventLevelDisabledModalHandle = (rowData) => {
    dispatch(showModal({ modal: "event_level_disabled", data: rowData }));
  };
  //last error log
  const lastErrorLogBodyTemplate = (rowData) => {
    const theObj = { __html: rowData?.lastErrorLog };
    return (
      <>
        {rowData?.lastErrorLog ? <div dangerouslySetInnerHTML={theObj} /> : "-"}
      </>
    );
  };

  //CSV error log
  const csvErrorBodyTemplate = (rowData) => {
    const theObj = { __html: rowData?.error_csv };
    return (
      <>{rowData?.error_csv ? <div dangerouslySetInnerHTML={theObj} /> : "-"}</>
    );
  };
  //user modified date
  const userModifiedBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.userModified ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              userModifiedModalHandle(rowData);
            }}
          >
            {rowData?.userModified}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const userModifiedModalHandle = (rowData) => {
    console.log("user modified toggle", data);
    dispatch(SetShowUserModifiedByModal({ data: rowData }));
  };

  //amount field
  const amountBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.amount ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              amountModalHandle(rowData);
            }}
          >
            ${parseInt(rowData?.amount)}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };
  const amountModalHandle = (rowData) => {
    dispatch(SetShowAmountModal({ data: rowData }));
  };
  //last used field
  const lastUsedBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.lastUsed ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              lastUsedModalHandler(rowData);
            }}
          >
            {rowData?.lastUsed}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };
  const lastUsedModalHandler = (rowData) => {
    dispatch(showModal({ modal: "last_used", data: rowData }));
  };

  //purchase field
  const purchaseBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.purchases ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              purchaseModalHandle(rowData);
            }}
          >
            {rowData?.purchases}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const purchaseModalHandle = (rowData) => {
    dispatch(showModal({ modal: "purchase", data: rowData }));
  };

  const cardPerformedByBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.cardPerformBy ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              cardPerformedByModalHandle(rowData);
            }}
          >
            {rowData?.cardPerformBy}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const cardPerformedByModalHandle = (rowData) => {
    dispatch(showModal({ modal: "card_performed_by", data: rowData }));
  };

  //password last updated
  const passwordUpdatedBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.pwLastUpdat ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              lastPasswordUpdatedModalHandle(rowData);
            }}
          >
            {rowData?.pwLastUpdat}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };
  const lastPasswordUpdatedModalHandle = () => {};
  //credit card field
  const creditCardBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData.creditCard ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              creditCardModalHandle(rowData);
            }}
          >
            {rowData.creditCard}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const creditCardModalHandle = (rowData) => {
    dispatch(showModal({ modal: "credit_card", data: rowData }));
  };
  //card group
  const cardGroupBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.cardGroup ? (
          <div>{rowData?.cardGroup}</div>
        ) : (
          "_"
        )}
      </>
    );
  };

  // password
  const userPasswordBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.PW ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              passwordModalHandle(rowData);
            }}
          >
            {rowData?.PW}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const passwordModalHandle = (rowData) => {
    dispatch(showModal({ modal: "password", data: rowData }));
  };
  //Ticket password
  const ticketPasswordBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.ticketPW ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              ticketPasswordModalHandle(rowData);
            }}
          >
            {rowData?.ticketPW}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const ticketPasswordModalHandle = (rowData) => {
    dispatch(showModal({ modal: "ticket_password", data: rowData }));
  };
  // user name
  const userEmailBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData.email ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              userEmailModalHandle(rowData);
            }}
          >
            {rowData.email}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const userEmailModalHandle = (rowData) => {
    dispatch(showModal({ modal: "email", data: rowData }));
  };

  // serial no.
  function serialNumberBodyTemplate(rowData, rowIndex) {
    return rowIndex.rowIndex + 1;
  }
  const columns = [
    { field: "s_no", header: "SN",
     //body: serialNumberBodyTemplate
     },
    { field: "logged_in", header: "Logged In" },
    { field: "mp", header: "MP" },
    { field: "email", header: "User Name",
     //body: userEmailBodyTemplate
     }, //body: userEmailBodyTemplate
    { field: "PW", header: "PW", 
    //body: userPasswordBodyTemplate
 },
    {
      field: "ticketPW",
      header: "Tickets PW",
      //body: ticketPasswordBodyTemplate,
    },
    {
      field: "pwLastUpdate",
      header: "PW last updated",
     // body: passwordUpdatedBodyTemplate,
    },
    {
      field: "creditCard",
      header: "Credit cards",
     // body: creditCardBodyTemplate,
    },
    { field: "cardGroup", header: "Card group",
     //body: cardGroupBodyTemplate 
    },
    {
      field: "cardPerformBy",
      header: "Card Performed by",
      //body: cardPerformedByBodyTemplate,
    },
    { field: "purchases", header: "Purchases",
     //body: purchaseBodyTemplate
     },
    { field: "amount", header: "Amount",
    // body: amountBodyTemplate
     },
    { field: "lastUsed", header: "Last used",
     //body: lastUsedBodyTemplate 
    },
    {
      field: "userModified",
      header: "User Modified",
     // body: userModifiedBodyTemplate,
    },
    {
      field: "lastErrorLog",
      header: "Last Error Log",
     // body: lastErrorLogBodyTemplate,
    },
    {
      field: "lastPerformedBy",
      header: "Last performed by",
    },
    { field: "error_csv", header: "CSV Error", 
    //body: csvErrorBodyTemplate 
},
    {
      field: "eventLevelDisabled",
      header: "Event Level Disabled",
      //body: eventLevelDisabledBodyTemplate,
    },
    {
      field: "card_expiry_date",
      header: "Card Expiring",
     // body: cardExpiringBodyTemplate,
    },
    {
      field: "active",
      header: "Active",
     // body: activeBodyTemplate,
    },
    
  ];

  const [selectedColumns, setSelectedColumns] = useState(columns);
  //Toggle table column
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };
   //column componenet
   const columnComponents = selectedColumns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        editor={col.editor}
        onCellEditComplete={col.onCellEditComplete}
        sortable
        style={{ width: "auto" }}
      />
    );
  });
  // table header
  const renderHeader = () => {
    return (
      <div>
        <Toast ref={toast} />
        <div className="d-flex justify-content-between ">
          <div style={{ textAlign: "left", display: "inline" }}>
            <MultiSelect
              value={selectedColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              style={{ width: "20em" }}
            />
          </div>
          <div
            className="flex align-items-center export-buttons"
            style={{ textAlign: "right", marginBottom: "9px" }}
          >
            <Button
              type="button"
              //icon="pi pi-file-excel"
              icon={<ExcelText />}
              onClick={exportExcel}
              className="p-button-success cstm-excel-btn mr-2"
              data-pr-tooltip="Excel"
            />
            <Button
              type="button"
              // icon={<InsertDriveFileIcon />}
              icon={<CsvText />}
              onClick={() => exportCSV(false)}
              className="p-button-success cstm-csv-btn mr-2"
              data-pr-tooltip="CSV"
              placeholder="CSV"
              
            />

            <div style={{ float: "right", display: "inline-block" }}>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Search"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const header = renderHeader();

 

  return (
    <>
      <div>
        {" "}
        <DataTable
          value={tabledata}
          editMode="cell"
          size={"normal"}
          rowGroupMode="rowspan"
          loading={loading}
          //  groupRowsBy="name"
          stripedRows
          autolayout={"true"}
          // resizableColumns
          columnResizeMode="fit"
          showGridlines
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "10rem" }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          //paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          filters={filters}
          header={header}
          emptyMessage="No data available in table."
          selectionMode={"checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            clickOnCheckBox(e);
          }}
          ref={dt}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "0.1rem" }}
          ></Column>
          <Column
            field="s_no"
            header="SN"
            body={serialNumberBodyTemplate}
          ></Column>
          <Column field="logged_in" header="Logged In"></Column>
          <Column field="mp" header="MP"></Column>
          <Column
            field="email"
            header="User Name"
            body={userEmailBodyTemplate}
          ></Column>

          <Column
            field="PW"
            header="PW"
            body={userPasswordBodyTemplate}
          ></Column>
          <Column
            field="ticketPW"
            header="Tickets PW"
            body={ticketPasswordBodyTemplate}
          ></Column>
          
          <Column
            field="pwLastUpdate"
            header="PW last updated"
            body={passwordUpdatedBodyTemplate}
          ></Column>

          <Column
            field="creditCard"
            header="Credit cards"
            body={creditCardBodyTemplate}
          ></Column>

          <Column
            field="cardGroup"
            header="Card group"
            body={cardGroupBodyTemplate}
          ></Column>

          <Column
            field="cardPerformBy"
            header="Card Performed by"
            body={cardPerformedByBodyTemplate}
          ></Column>
          <Column
            field="purchases"
            header="Purchases"
            body={purchaseBodyTemplate}
          ></Column>
          <Column
            field="amount"
            header="Amount"
            body={amountBodyTemplate}
          ></Column>

          <Column
            field="lastUsed"
            header="Last used"
            body={lastUsedBodyTemplate}
          ></Column>

          <Column
            field="userModified"
            header="User Modified"
            body={userModifiedBodyTemplate}
          ></Column>
          <Column
            field="lastErrorLog"
            header="Last Error Log"
            body={lastErrorLogBodyTemplate}
          ></Column>
          <Column field="lastPerformedBy" header="Last performed by"></Column>
          <Column
            field="error_csv"
            header="CSV Error"
            body={csvErrorBodyTemplate}
          ></Column>
          <Column
            field="eventLevelDisabled"
            header="Event Level Disabled"
            body={eventLevelDisabledBodyTemplate}
          ></Column>
          <Column
            field="card_expiry_date"
            header="Card Expiring"
            body={cardExpiringBodyTemplate}
          ></Column>
          <Column
            field="active"
            header="Active"
            body={activeBodyTemplate}
          ></Column>

            {/* {columnComponents} */}
        </DataTable>
      </div>
      <UsernameModal
        show={showBuyingAccount.showUserName}
        handleClose={() => {
          dispatch(closeModal({ modal: "email" }));
        }}
      />
      <PasswordModal
        show={showBuyingAccount.showPassword}
        handleClose={() => {
          dispatch(closeModal({ modal: "password" }));
        }}
      />
      <TicketPasswordModal
        show={showBuyingAccount.showTicketPassword}
        handleClose={() => {
          dispatch(closeModal({ modal: "ticket_password" }));
        }}
      />
      <CreditCardModal
        show={showBuyingAccount.showCreditCard}
        handleClose={() => {
          dispatch(closeModal({ modal: "credit_card" }));
        }}
      />
      <CardPerformedByModal
        show={showBuyingAccount.showCardPerformed}
        handleClose={() => {
          dispatch(closeModal({ modal: "card_performed_by" }));
        }}
      />
      <UserModifiedModal
        show={showBuyingAccount.showUserModified}
        handleClose={() => {
          dispatch(closeModal({ modal: "user_modified" }));
        }}
      />
      <AmountModal
        show={showBuyingAccount.showAmount}
        handleClose={() => {
          dispatch(closeModal({ modal: "amount" }));
        }}
      />
      <PurchaseModal
        show={showBuyingAccount.showPurchase}
        handleClose={() => {
          dispatch(closeModal({ modal: "purchase" }));
        }}
      />
      <LastUsedModal
        show={showBuyingAccount.showLastUsed}
        handleClose={() => {
          dispatch(closeModal({ modal: "last_used" }));
        }}
      />
      <UserLevelDisabledModal
        show={showBuyingAccount.showUserLevelDisabled}
        handleClose={() => {
          dispatch(closeModal({ modal: "event_level_disabled" }));
        }}
      />

      {/* side arrow for  buying action */}
      {showSideArrow.showBuyingAccountArrow && <BuyingAccountArrowComponent />}
    </>
  );
};

export default Table;
