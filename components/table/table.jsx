import React, { useState, useRef,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { MultiSelect } from "primereact/multiselect";
// import Button from 'react-bootstrap/Button';
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

//modals home page
import TicketsPurchasedModal  from "../modal/home/ticketsPurchasedModal";
import TicketPurchaseLimitModal from "../modal/home/ticketPurchaseLimitModal";
import TicketLimitPerUserModal from "../modal/home/ticketLimitPerUserModal";
import { TotalSpentModal } from "../modal/home/totalSpentModal";
import FirstPurchaseModal from "../modal/home/firstPurchaseModal";
import LastPurchaseModal from "../modal/home/lastPurchaseModal";
import { ResetAdminPasswordModal } from "../modal/settings/admin/resetPasswordModal";
import { UpdateAdminEmailModal } from "../modal/settings/admin/updateEmailModal";
import { UpdateAdminNameModal } from "../modal/settings/admin/updateNameModal";
import  UserPurchasedCapacityModal  from "../modal/home/userPurchasedCapacity";
import { TicketLocationModal } from "../modal/home/ticketLocationModal";
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
import UserAccountCreditCardModal from "../modal/userAccount/creditCardModal";
import UpdatePluginUserEmailModal from "../modal/settings/pluginUser/updatePluginUserEmailModal";
import UpdatePluginUserNameModal from "../modal/settings/pluginUser/updatePluginUserNameModal";
import PluginLastPurchasedModal from "../modal/settings/pluginUser/pluginLastPurchasedModal";
import {
  HideTicketPurchasedModal,
  HideTotalSpentModal,
  HideTicketPurchaseCapacityModal,
  HideTicketLocationModal,
  HideFirstPurchaseModal,
  HideLastPurchaseModal,
  HandleClose
} from "../../store/reducer/Home/homemodalSlice.jsx";

import {
  closeResetPasswordModal,
  closeUpdateEmailAddressModal,
  closeUpdateNameModal,
} from "../../store/reducer/Settings/Admin/adminSlice";
import { closeModal } from "../../store/reducer/Modal/showAndHideModal";
import { showArrow ,setCheckBoxSelectedProduct } from "../../store/reducer/ArrowButton/arrowButtonSlice";

import HomePageArrowComponent from "../arrowcomponent/homearrow";
import BuyingAccountArrowComponent from "../arrowcomponent/buyingAccountArrow";
import SettingsAdminArrow from "../arrowcomponent/settingsAdminArrow";
import SettingsPluginUserArrow from "../arrowcomponent/settingsPluginUserArrow";
import QueueJobsUpdateCardArrow from "../../components/arrowcomponent/queue_jobs_update_card_arrow";
import QueueJobsResetPasswordArrow from "../../components/arrowcomponent/queue_jobs_reset_password_arrow";
import UserAccountArrowComponent from "../arrowcomponent/userAccountArrow";
import { Dropdown } from 'primereact/dropdown';
import "./table.css";

 function CustomersDemo({ columns, data, loading ,page, pageCount}) {
   const [globalFilterValue, setGlobalFilterValue] = useState("");
   const [selectedProducts, setSelectedProducts] = useState(null);
   const [selectedColumns, setSelectedColumns] = useState(columns);
   const [rowsPerPage, setRowsPerPage] = useState(pageCount||10);
   //dispatch action
   const dispatch = useDispatch();
   const showSideArrow = useSelector((state) => state.showsidearrow);
   const selectedProduct = useSelector(
     (state) => state.showsidearrow?.selectedProduct
   );
   const show = useSelector((state) => state.modal);
   const showBuyingAccount = useSelector((state) => state.showHideModal);
   const settingAdmin = useSelector((state) => state.admin);

   const user_account = useSelector((state) => state?.userAccount);
   //datatable filter
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

   //Toggle table column
   const onColumnToggle = (event) => {
     let selectedColumns = event.value;
     let orderedSelectedColumns = columns.filter((col) =>
       selectedColumns.some((sCol) => sCol.field === col.field)
     );
     setSelectedColumns(orderedSelectedColumns);
   };

   // Export file
   const exportColumns = columns.map((col) => ({
     title: col.header,
     dataKey: col.field,
   }));

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

   // table header
   const renderHeader = () => {
     return (
       <div className="cstm-header-top ">
         <div className="d-flex flex-wrap align-items-center justify-content-md-between gap-2">
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
           <div className="d-flex gap-2 flex-wrap align-items-center export-buttons h-auto mb-0">
             <Button
               type="button"
               //icon="pi pi-file-excel"
               icon={<ExcelText />}
               onClick={exportExcel}
               className="p-button-success cstm-excel-btn d-block m-0"
               data-pr-tooltip="Excel"
             />
             <Button
               type="button"
               // icon={<InsertDriveFileIcon />}
               icon={<CsvText />}
               onClick={() => exportCSV(false)}
               className="p-button-success cstm-csv-btn d-block m-0 "
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
         //style={col.style}
       />
     );
   });
   const header = renderHeader();

   //Show side arrow element
   function clickOnCheckBox(e) {
     // setSelectedProducts(e.value);
     dispatch(setCheckBoxSelectedProduct(e.value));
     let url = window.location.pathname;
     let checked = e?.originalEvent?.checked;
     console.log(e, "e.value");
     let selectedId = e.value?.filter((item) =>
       data.some((tableItem) => tableItem?.id === item?.id)
     );
     dispatch(
       showArrow({
         url: url,
         length: selectedId.length,
         users: selectedId,
         checked: checked,
       })
     );
   }

   return (
     <div className="card">
       <Tooltip target=".export-buttons>button" position="bottom" />
       <Toast ref={toast} />
       <DataTable
         className="cstm-datatable custm-tablehead"
         value={data}
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
         rows={rowsPerPage}
         //rows={5}
         //rowsPerPageOptions={[5, 10, 25, 50]}
         paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
         currentPageReportTemplate="{first} to {last} of {totalRecords}"
         filters={filters}
         header={header}
         emptyMessage="No data available in table."
         selectionMode={"checkbox"}
         selection={selectedProduct}
         // selection={selectedProducts}
         onSelectionChange={(e) => {
           clickOnCheckBox(e);
         }}
         ref={dt}
       >
         <Column
           selectionMode="multiple"
           //headerStyle={{ width: "2rem" }}
         ></Column>
         {columnComponents}
       </DataTable>

       {/* Home page Modal */}
       {page && page === "home" && (
         <>
           <TicketsPurchasedModal
             show={show.totalPurchasedTicketModal}
             handleClose={() => {
               dispatch(HideTicketPurchasedModal());
             }}
           />
           <TotalSpentModal
             show={show.totalSpentModal}
             handleClose={() => {
               dispatch(HideTotalSpentModal());
             }}
           />

           <UserPurchasedCapacityModal
             show={show.ticketPurchaseCapacityModal}
             handleClose={() => {
               dispatch(HideTicketPurchaseCapacityModal());
             }}
           />

           <TicketLocationModal
             show={show.ticketLocationModal}
             handleClose={() => {
               dispatch(HideTicketLocationModal());
             }}
           />
           <FirstPurchaseModal
             show={show.firstPurchaseModal}
             handleClose={() => {
               dispatch(HideFirstPurchaseModal());
             }}
           />
           <LastPurchaseModal
             show={show.lastPurchaseModal}
             handleClose={() => {
               dispatch(HideLastPurchaseModal());
             }}
           />
           <TicketPurchaseLimitModal
             show={show.showTicketPurchaseLimitModal}
             handleClose={() => {
               dispatch(HandleClose({ modal: "ticket_purchase_limit" }));
             }}
           />

           <TicketLimitPerUserModal
             show={show.showTicketLimitPerUserModal}
             handleClose={() => {
               dispatch(
                 HandleClose({ modal: "ticket_purchase_limit_per_user" })
               );
             }}
           />
           {/* side arrow for hOME PAGE */}
           {showSideArrow.showHomeArrow && <HomePageArrowComponent />}
         </>
       )}
       {/* BUYING ACCOUNT MODAL */}
       {page && page === "buying_account" && (
         <>
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
             show={showBuyingAccount.showAmountModal}
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
         </>
       )}

       {/* user Account */}

       {page && page === "user_account" && (
         <>
           <UserAccountCreditCardModal
             show={showBuyingAccount.user_account_credit_modal}
             handleClose={() => {
               dispatch(closeModal({ modal: "user_account_credit_card" }));
             }}
           />
         </>
       )}

       {/* PLUGIN USER modal */}

       {page && page === "plugin_user" && (
         <>
           <UpdatePluginUserEmailModal
             show={showBuyingAccount.pluginUserEmailModal}
             handleClose={() => {
               dispatch(closeModal({ modal: "plugin_user_email" }));
             }}
           />
           <UpdatePluginUserNameModal
             show={showBuyingAccount.pluginUserNameModal}
             handleClose={() => {
               dispatch(closeModal({ modal: "plugin_user_name" }));
             }}
           />

           <PluginLastPurchasedModal
             show={showBuyingAccount.pluginLastPurchasedModal}
             handleClose={() => {
               dispatch(closeModal({ modal: "plugin_last_purchase" }));
             }}
           />
         </>
       )}

       {/* side arrow for  buying action */}
       {showSideArrow.showBuyingAccountArrow && <BuyingAccountArrowComponent />}
       {/* side arrow for Setting/Admin user action */}
       {showSideArrow.showSettingsAdminArrow && <SettingsAdminArrow />}
       {showSideArrow.showSettingsPluginUsersArrow && (
         <SettingsPluginUserArrow />
       )}
       {showSideArrow.showQueueJobResetPasswordArrow && (
         <QueueJobsResetPasswordArrow />
       )}
       {showSideArrow.showQueueJobUpdateCardArrow && (
         <QueueJobsUpdateCardArrow />
       )}
       {showSideArrow.showUsersAccountArrow && <UserAccountArrowComponent />}

       {}
       {/* ADMIN/ RESET PASSWORD MODAL */}
       <ResetAdminPasswordModal
         show={settingAdmin.resetPasswordModal}
         handleClose={() => {
           dispatch(closeResetPasswordModal());
         }}
       />
       {/* ADMIN/ update email MODAL */}
       <UpdateAdminEmailModal
         show={settingAdmin.updateEmailAddressModal}
         handleClose={() => {
           dispatch(closeUpdateEmailAddressModal());
         }}
       />
       <UpdateAdminNameModal
         show={settingAdmin.nameUpdateModal}
         handleClose={() => {
           dispatch(closeUpdateNameModal());
         }}
       />
     </div>
   );
 }

export default React.memo(CustomersDemo);