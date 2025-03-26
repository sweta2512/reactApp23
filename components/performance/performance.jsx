import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
//import ArchiveEventForm from "../../form/archive_event";
import Button from "react-bootstrap/Button";
import PerformanceFormComponrnt from "../form/Performance/performance";
import Table from "../table/tablewithoutcheckbox";
import Chart from "./performancechart";
import { showModal } from "../../store/reducer/Modal/showAndHideModal";
import { performanceGetChartDataAction } from "../../store/reducer/Performance/performanceSlice";
function PerformanceComponent() {
  const dispatch = useDispatch();
  const { filters, tableData } = useSelector((state) => state.performance);
  const [customers, setCustomers] = useState(null);

  console.log(filters, "filtersfiltersfilters", tableData);
  useEffect(() => {
    dispatch(performanceGetChartDataAction(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    setCustomers(tableData || []);
  }, [tableData, dispatch]);

 

 
  const columns = useMemo(
    () => [
      { field: "name", header: "User Name", footer: "Total / Average" },
      {
        field: "tickets",
        header: "Tickets",
        body: (rowData, column) => {
          return (
            <>
              {rowData !== undefined &&
              rowData !== null &&
              rowData?.tickets !== 0 ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    dispatch(
                      showModal({ modal: "performance_tickets", data: rowData })
                    );
                  }}
                >
                  {rowData?.tickets}
                </Button>
              ) : (
                <div>
                  <span style={{ marginLeft: "16px" }}>{rowData?.tickets}</span>
                </div>
              )}
            </>
          );
        },
        footer: (rowData) => {
          let total = 0;
          let Average = 0;
          if (rowData?.props?.value?.length > 0) {
            rowData?.props?.value?.forEach((item, index) => {
              total = total + item.tickets;
            });
            Average = total / rowData?.props?.value?.length;
          }
          return total + " / " + Average;
        },
      },
      {
        field: "purchase",
        header: "Purchases",
        body: (rowData, column) => {
          return (
            <>
              {rowData !== undefined &&
              rowData !== null &&
              rowData?.tickets !== 0 ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    dispatch(
                      showModal({
                        modal: "performance_purchase",
                        data: rowData,
                      })
                    );
                  }}
                >
                  {rowData?.purchase}
                </Button>
              ) : (
                <div>
                  <span style={{ marginLeft: "16px" }}>
                    {rowData?.purchase}
                  </span>
                </div>
              )}
            </>
          );
        },
        footer: (rowData, column, index, data) => {
          let total = 0;
          let Average = 0;
          if (rowData?.props?.value?.length > 0) {
            rowData?.props?.value?.forEach((item, index) => {
              total = total + item.purchase;
            });
            Average = total / rowData?.props?.value?.length;
          }
          return total + " / " + Average;
        },
      },
      {
        field: "amount",
        header: "Amount",
        body: (rowData, column) => {
          return (
            <>
              {rowData !== undefined &&
              rowData !== null &&
              rowData?.tickets !== 0 ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    dispatch(
                      showModal({ modal: "performance_amount", data: rowData })
                    );
                  }}
                >
                  {rowData?.amount}
                </Button>
              ) : (
                <div>
                  <span style={{ marginLeft: "16px" }}>{rowData?.amount}</span>
                </div>
              )}
            </>
          );
        },
        footer: (rowData) => {
          let total = 0;
          let Average = 0;
          if (rowData?.props?.value?.length > 0) {
            rowData?.props?.value?.forEach((item, index) => {
              total = total + item.amount;
            });
            Average = total / rowData?.props?.value?.length;
          }
          return total + " / " + Average;
        },
      },
    ],
    [dispatch]
  );

  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <PerformanceFormComponrnt />
      </div>
      <div className="p-1">
        <Table data={customers} columns={columns} page='performance'/>
      </div>
      <div className="p-6">
        <div className="card">
          {" "}
          <Chart />
        </div>
      </div>
    </Stack>
  );
}
export default PerformanceComponent;
