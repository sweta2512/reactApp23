import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
//import { CustomerService } from "../../../services/dataforrowspan";
import { getData } from "../../../services/dataforrowspan";
import "../stylerow.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class ShowCellRenderer {
  init(params) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement("div");
    this.ui.innerHTML =
      '<div className="show-name">' + params.value.name + +"" + "</div>";
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}
const rowSpan = (params) => {
  if (params.data) {
    return 4;
  } else {
    return 1;
  }
};

const rowSpanmp = (params) => {
  if (params.data.marketplace) {
    return 20;
  } else {
    return 1;
  }
};
const TotalTicketPurchased = () => {
  const gridRef = useRef();
  const [customers, setCustomers] = useState([]);

  const [rowData, setRowData] = useState(getData());
  // useEffect(() => {
  //   CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  // }, []);

  // const getCustomers = (data) => {
  //   return [...(data || [])].map((d) => {
  //     d.date = new Date(d.date);

  //     return d;
  //   });
  // };

  const [colDefs, setColDefs] = useState([
    {
      field: "show.name",
      headerName: "User Name",
      rowSpan: rowSpan,
      cellRenderer: ShowCellRenderer,
      cellClassRules: {
        "show-cell": "value !== undefined",
      },
      width: 200,
      cellDataType: false,
    },
    { field: "id", headerName: "User Email" },
    { field: "a", headerName: "Credit Card" },
    { field: "b", headerName: "Total Price" },
    { field: "c", headerName: "Number of Tickets" },
    {
      field: "marketplace",
      headerName: "Market Place",
      rowSpan: rowSpanmp,
      cellClassRules: {
        "show-cell": "value !== undefined",
      },
    },
    { field: "electric", headerName: "Order Id" },
    { field: "electric", headerName: "Purchase Date" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      sortable: false,
    };
  }, []);

  //filter
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const quickFilterMatcher = useCallback(
    (quickFilterParts, rowQuickFilterAggregateText) => {
      return quickFilterParts.every((part) =>
        rowQuickFilterAggregateText.match(part)
      );
    },
    []
  );

  // const quickFilterParser = useCallback((quickFilter) => {
  //   let quickFilterParts = [];
  //   let lastSpaceIndex = -1;
  //   const isQuote = (index) => quickFilter[index] === '"';
  //   const getQuickFilterPart = (lastSpaceIndex, currentIndex) => {
  //     const startsWithQuote = isQuote(lastSpaceIndex + 1);
  //     const endsWithQuote = isQuote(currentIndex - 1);
  //     const startIndex =
  //       startsWithQuote && endsWithQuote
  //         ? lastSpaceIndex + 2
  //         : lastSpaceIndex + 1;
  //     const endIndex =
  //       startsWithQuote && endsWithQuote ? currentIndex - 1 : currentIndex;
  //     return quickFilter.slice(startIndex, endIndex);
  //   };
  //   for (let i = 0; i < quickFilter.length; i++) {
  //     const char = quickFilter[i];
  //     if (char === " ") {
  //       if (!isQuote(lastSpaceIndex + 1) || isQuote(i - 1)) {
  //         quickFilterParts.push(getQuickFilterPart(lastSpaceIndex, i));
  //         lastSpaceIndex = i;
  //       }
  //     }
  //   }
  //   if (lastSpaceIndex !== quickFilter.length - 1) {
  //     quickFilterParts.push(
  //       getQuickFilterPart(lastSpaceIndex, quickFilter.length)
  //     );
  //   }
  //   return quickFilterParts;
  // }, []);

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 400 }} // the grid will fill the size of the parent container
    >
      {/* <div className="example-header">
        <span>Quick Filter:</span>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
      </div> */}
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={6}
        paginationPageSizeSelector={[6, 12, 20]}
        suppressRowTransform={true}
        // quickFilterMatcher={quickFilterMatcher}
        //quickFilterParser={quickFilterParser}
      />
    </div>
  );
};

export default TotalTicketPurchased;
