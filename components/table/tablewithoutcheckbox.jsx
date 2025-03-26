import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { MultiSelect } from "primereact/multiselect";

import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {closeArchiveModal} from "../../store/reducer/Archives/archiveBuyingAccountSlice";
import { closeModal } from "../../store/reducer/Modal/showAndHideModal";
import ArchiveCreditCardModal from "../modal/archive/buying_account/creditCardModal";
import UsernameModal from "../modal/archive/buying_account/userNameModal";
import UserModifiedModal from "../modal/archive/buying_account/userModifiedModal";
import LastUsedModal from "../modal/archive/buying_account/lastUsedModal";
import { ArchiveEventTotalTicketPurchasedModal } from "../modal/archive/events/totalTicketPurchasedModal";
import { ArchiveEventFirstPurchaseModal } from "../modal/archive/events/firstPurchasedModal";
import { ArchiveEventLastPurchaseModal } from "../modal/archive/events/lastPurchasedModal";
import { ArchiveEventTotalSpentModal } from "../modal/archive/events/totalSpentModal";
import { ArchiveEventTicketLocationModal } from "../modal/archive/events/ticketLocationModal";



import { PerformanceTicketsModal } from "../modal/performance/ticketsModal";
import { PerformanceAmountModal } from "../modal/performance/amountModal";
import PerformancePurchaseModal  from "../modal/performance/purchaseModal";

import { AmountPurchaseModal } from "../modal/performance/amount/purchaseModal";
import { AmountLastPurchaseModal } from "../modal/performance/amount/lastPurchaseModal";
import { AmountFirstPurchaseModal } from "../modal/performance/amount/firstPurchasedModal";
import { TicketsPurchaseModal } from "../modal/performance/tickets/purchaseModal";
import { TicketsLastPurchaseModal } from "../modal/performance/tickets/lastPurchaseModal";
import { TicketsFirstPurchaseModal } from "../modal/performance/tickets/firstPurchasedModal";
import { PurchasesPurchaseModal } from "../modal/performance/purchase/purchaseModal";
import { PurchaseLastPurchaseModal } from "../modal/performance/purchase/lastPurchaseModal";
import { PurchaseFirstPurchaseModal } from "../modal/performance/purchase/firstPurchasedModal";

import FailedOrderTotalTicketPurchaseModal from "../modal/failed_order/totalTicketPurchasedModal";
import FailedOrderTotalSpentModal from "../modal/failed_order/totalSpentModal";
import FailedOrderTicketLocationModal from "../modal/failed_order/ticketLocationModal";
import FailedOrderFirstPurchaseModal from "../modal/failed_order/firstPurchasedModal";
import FailedOrderLastPurchaseModal from "../modal/failed_order/lastPurchasedModal";
import { NoOfOverLimitModal } from "../modal/overLimitAccounts/noOfOverLimitModal";
import { SuccessfulOderOverLimitModal } from "../modal/overLimitAccounts/successfulOderOverLimitModal";
import { Dropdown } from 'primereact/dropdown';
import "./table.css";





export default function CustomersDemo({ columns, data, page , pageCount }) {
  const dispatch = useDispatch();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const showModal = useSelector((state) => state?.archiveBuyingAccount);
  const showHideModal = useSelector((state) => state?.showHideModal);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [rowsPerPage, setRowsPerPage] = useState(pageCount || 10);

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

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };
  // export file
  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  // export CSV
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  // EXPORT Excel
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

  // csv text component
  const CsvText = () => {
    return <span>CSV</span>;
  };

  // excel text component
  const ExcelText = () => {
    return <span>Excel</span>;
  };

  // Update the rows per page custom per page drop down on table header
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.value);
  };

  // Dropdown options
  const dropdownOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "120", value: 120 },
  ];

  // header
  const renderHeader = () => {
    return (
      <div className="cstm-header-top">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className="customPage">Show</span>
            <Dropdown
              value={rowsPerPage}
              options={dropdownOptions}
              onChange={handleRowsPerPageChange}
            />
          </div>
          <div className="toggleMenu">
            <span className="customPage">Entries</span>
            <MultiSelect
              value={selectedColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              style={{ width: "5em" }}
              className={"cstn-tg"}
            />
          </div>
          <div className="flex align-items-center export-buttons">
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
          </div>
          <div className="cstm-search-outer">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                className="cstm-search-input"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Search"
              />
            </span>
          </div>
        </div>
      </div>
    );
  };

  const columnComponents = selectedColumns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable
        style={{ width: "50px" }}
        footer={col.footer}
      />
    );
  });
  const header = renderHeader();

  const clickableNameTemplate = (rowData, column) => {
    return alert("jjjjjj");
    // <div onClick={() => onTestClick(rowData)}>{rowData[column.field]}</div>
  };

  return (
    <div className="card">
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        value={data}
        size={"normal"}
        stripedRows
        className="cstm-datatable"
        // resizableColumns
        columnResizeMode="fit"
        showGridlines
        responsiveLayout="scroll"
        tableStyle={{ minWidth: "10rem" }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        filters={filters}
        globalFilterFields={[
          "name",
          "country.name",
          "company",
          "Tickets Purchase Limit",
          "Total Tickets Purchased",
          "Event Date",
        ]}
        header={header}
        emptyMessage="No data available in table."
        selectionMode={"checkbox"}
        // selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        ref={dt}
      >
        {columnComponents}
      </DataTable>

      {page && page === "buying_account" && (
        <>
          <ArchiveCreditCardModal
            show={showModal?.archive_credit_card_modal}
            handleClose={() => {
              dispatch(closeArchiveModal({ modal: "credit_card" }));
            }}
          />
          <UsernameModal
            show={showModal.user_name_modal}
            handleClose={() => {
              dispatch(closeArchiveModal({ modal: "user_name" }));
            }}
          />
          <UserModifiedModal
            show={showModal.user_modified_modal}
            handleClose={() => {
              dispatch(closeArchiveModal({ modal: "user_modified" }));
            }}
          />
          <LastUsedModal
            show={showModal.last_used_modal}
            handleClose={() => {
              dispatch(closeArchiveModal({ modal: "last_used" }));
            }}
          />
        </>
      )}

      {page && page === "archive_event" && (
        <>
          <ArchiveEventTotalTicketPurchasedModal
            show={showHideModal?.archiveEventTotalTicketPurchsed}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "archive/event/total_ticket_purchased" })
              );
            }}
          />
          <ArchiveEventTicketLocationModal
            show={showHideModal.archiveEventTicketLocation}
            handleClose={() => {
              dispatch(closeModal({ modal: "archive/event/ticket_location" }));
            }}
          />
          <ArchiveEventTotalSpentModal
            show={showHideModal.archiveEventTotalSpent}
            handleClose={() => {
              dispatch(closeModal({ modal: "archive/event/total_spent" }));
            }}
          />
          <ArchiveEventFirstPurchaseModal
            show={showHideModal.archiveEventFirstPurchase}
            handleClose={() => {
              dispatch(closeModal({ modal: "archive/event/first" }));
            }}
          />
          <ArchiveEventLastPurchaseModal
            show={showHideModal.archiveEventLastPurchase}
            handleClose={() => {
              dispatch(closeModal({ modal: "archive/event/last" }));
            }}
          />
        </>
      )}
      {page && page === "performance" && (
        <>
          <PerformancePurchaseModal
            show={showHideModal.showPerfomancePurchaseModal}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance_purchase" }));
            }}
          />
          <PerformanceAmountModal
            show={showHideModal.showPerformanceAmountModal}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance_amount" }));
            }}
          />
          <PerformanceTicketsModal
            show={showHideModal.showPerformanceTicketsModal}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance_tickets" }));
            }}
          />

          <AmountFirstPurchaseModal
            show={showHideModal.performance_amount_firstPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/amount/firstPurchase" })
              );
            }}
          />
          <AmountLastPurchaseModal
            show={showHideModal.performance_amount_lastPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/amount/lastPurchase" })
              );
            }}
          />
          <AmountPurchaseModal
            show={showHideModal.performance_amount_purchase}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance/amount/purchase" }));
            }}
          />

          <TicketsFirstPurchaseModal
            show={showHideModal.performance_ticket_firstPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/ticket/firstPurchase" })
              );
            }}
          />
          <TicketsLastPurchaseModal
            show={showHideModal.performance_ticket_lastPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/ticket/lastPurchase" })
              );
            }}
          />
          <TicketsPurchaseModal
            show={showHideModal.performance_ticket_purchase}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance/ticket/purchase" }));
            }}
          />
          <PurchasesPurchaseModal
            show={showHideModal.performance_purchases_purchase}
            handleClose={() => {
              dispatch(closeModal({ modal: "performance/purchase/purchase" }));
            }}
          />
          <PurchaseFirstPurchaseModal
            show={showHideModal.performance_purchase_firstPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/purchase/firstPurchase" })
              );
            }}
          />
          <PurchaseLastPurchaseModal
            show={showHideModal.performance_purchase_lastPurchase}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "performance/purchase/lastPurchase" })
              );
            }}
          />
        </>
      )}

      {page && page === "failed_order" && (
        <>
          <FailedOrderTotalTicketPurchaseModal
            show={showHideModal.failed_order_total_ticket_purchase_modal_show}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "failedOrder/totalTicketPurchased" })
              );
            }}
          />
          <FailedOrderTotalSpentModal
            show={showHideModal.failed_order_total_spent_modal_show}
            handleClose={() => {
              dispatch(closeModal({ modal: "failedOrder/totalSpent" }));
            }}
          />
          <FailedOrderTicketLocationModal
            show={showHideModal.failed_order_ticket_location_modal_show}
            handleClose={() => {
              dispatch(closeModal({ modal: "failedOrder/ticketLocation" }));
            }}
          />
          <FailedOrderFirstPurchaseModal
            show={showHideModal.failed_order_first_purchase_modal_show}
            handleClose={() => {
              dispatch(closeModal({ modal: "failedOrder/firstPurchase" }));
            }}
          />
          <FailedOrderLastPurchaseModal
            show={showHideModal.failed_order_last_purchase_modal_show}
            handleClose={() => {
              dispatch(closeModal({ modal: "failedOrder/lastPurchase" }));
            }}
          />
        </>
      )}

      {/* "over_limit_account */}

      {page && page === "over_limit_account" && (
        <>
          <NoOfOverLimitModal
            show={showHideModal.no_of_overlimit_modal_show}
            handleClose={() => {
              dispatch(
                closeModal({ modal: "over_limit_account/noOfOverLimit" })
              );
            }}
          />
          <SuccessfulOderOverLimitModal
            show={showHideModal.no_of_successful_order_modal_show}
            handleClose={() => {
              dispatch(
                closeModal({
                  modal: "over_limit_account/noOfSuccessfulOrderOverLimit",
                })
              );
            }}
          />
        </>
      )}
    </div>
  );
}

      