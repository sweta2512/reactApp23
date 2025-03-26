import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { MultiSelect } from "primereact/multiselect";

import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


// import "./table.css";

//import { CustomerService } from "./service/CustomerService";

export default function CommonTable({ columns, data }) {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [showdata, setShowdata] = useState(false);
  const [showactionbuttonelement, setShowactionbuttonelement] =
    useState("none");
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(columns);

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

  // header
  const renderHeader = () => {
    return (//d-flex justify-content-between
      <div className="">
        <div
          className="flex align-items-center export-buttons"
          style={{ textAlign: "right", marginBottom: "40px" }}
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
            data-pr-tooltip="CSV"
            placeholder="CSV"           
            className="p-button-success cstm-csv-btn mr-2"
           
          />
        </div>

        <div className="cstm-search-outer" style={{marginTop:"-58px"}}>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search"
              style={{height: "39px"}}
              className='cstm-search-input'
            />
          </span>
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

  

  
  return (
    <div className="card">
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        value={data}
        size={"normal"}
        stripedRows
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
    </div>
  );
}

      