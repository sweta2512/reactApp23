import React, { useState, useEffect , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
import Table from "../table/tablewithoutcheckbox";
import { showModal } from "../../store/reducer/Modal/showAndHideModal";
import FailedOrderForm from "../form/FailedOrder/failed_order_form";
import { getFailedOrderMainTable } from "../../store/reducer/FailedOrder/failedOrderSlice";
import {purchasedTicketsShowModalAction, ticketLocationModalAction} from "../../store/reducer/Home/homemodalSlice";
import { purchaseDetailAction } from "../../store/reducer/Purchase/purchaseSlice";

import Button from "react-bootstrap/Button";
import { showError } from "../utilities/toast_message";
import { Toast } from "primereact/toast";
import { getDate } from "../../services/helper";

const Failed_orders = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [users, setUsers] = useState(null);
  const { tableData, loading, filters } = useSelector((state) => state.failedOrder);

  useEffect(() => {
    let filteredData = tableData?.encodedEvent?.filter(
      (item) =>
        item?.name?.toLowerCase().includes(filters.keyword?.toLowerCase()) ||
        (item?.location
          ?.toLowerCase()
          .includes(filters.keyword?.toLowerCase()) ??
          false)
    );
    setUsers(filteredData);
  }, [tableData, filters.keyword]); 

  
  useEffect(() => {
    dispatch(getFailedOrderMainTable(filters));
  }, [dispatch, filters]);



  //   Define columns here

  const columns = [
    { field: "time", header: "Event Date/Time" },
    { field: "location", header: "Venu/Location" },
    {
      field: "totalPurchase",
      header: "Total Tickets Purchased",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData?.totalPurchase ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(purchasedTicketsShowModalAction({ ID: rowData.id })).then(
                    (response) => {
                      if (response.meta.requestStatus === "fulfilled") {
                        if (
                          response?.payload?.data?.ticketHistory?.length > 0
                        ) {
                          dispatch(
                            showModal({
                              modal: "failedOrder/totalTicketPurchased",
                              data: rowData,
                            })
                          );
                        } else {
                          showError(
                            "There is no ticket available for event " +
                              response?.payload?.data?.event?.event_name,
                            toast
                          );
                        }
                      }
                    }
                  );
                }}
              >
                {rowData?.totalPurchase}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "Ticket Location",
      header: "Ticket Location",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.location ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(ticketLocationModalAction({ ID: rowData.id })).then(
                    (response) => { 
                      if (response.meta.requestStatus === "fulfilled") {
                        if (response?.payload?.data?.histories?.length > 0) {
                          dispatch(
                            showModal({
                              modal: "failedOrder/ticketLocation",
                              data: rowData,
                            })
                          );
                        }else{
                          showError('There is no ticket available for event '+ response?.payload?.data?.event?.event_name, toast);
                        }
                      } 
                    }
                  );
                }}
              >
                <i className="fa fa-map"></i>
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "amount",
      header: "Total Spent",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData?.amount !== parseFloat(0.0).toFixed(2) ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(
                    purchasedTicketsShowModalAction({ ID: rowData.id })
                  ).then((response) => {
                    if (response.meta.requestStatus === "fulfilled") {
                      if (response?.payload?.data?.ticketHistory?.length > 0) {
                        dispatch(
                          showModal({
                            modal: "failedOrder/totalSpent",
                            data: rowData,
                          })
                        );
                      } else {
                        showError(
                          "There is no ticket available for event " +
                            response?.payload?.data?.event?.event_name,
                          toast
                        );
                      }
                    }
                  });
                }}
              >
                ${parseFloat(rowData?.amount)}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "first",
      header: "First Purchase",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.first ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  let date = getDate(rowData.first || "");
                  dispatch(
                    purchaseDetailAction({ eventID: rowData.id, date: date })
                  ).then((response) => {
                    if (response.meta.requestStatus === "fulfilled") {
                      if (response?.payload?.data?.length > 0) {
                        dispatch(
                          showModal({
                            modal: "failedOrder/firstPurchase",
                            data: rowData,
                          })
                        );
                      } else {
                        showError(
                          "There is no ticket available for event " +
                            response?.payload?.data?.event?.event_name,
                          toast
                        );
                      }
                    }
                  });
                }}
              >
                {rowData?.first}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "last",
      header: "Last Purchase",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.last ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  let date = getDate(rowData.last || "");
                  dispatch(
                    purchaseDetailAction({
                      eventID: rowData.id,
                      date: date,
                      dataType: "last",
                    })
                  ).then((response) => {
                    if (response.meta.requestStatus === "fulfilled") {
                      if (response?.payload?.data?.length > 0) {
                        dispatch(
                          showModal({
                            modal: "failedOrder/lastPurchase",
                            data: rowData,
                          })
                        );
                      } else {
                        showError(
                          "There is no ticket available for event " +
                            response?.payload?.data?.event?.event_name,
                          toast
                        );
                      }
                    }
                  });
                 
                }}
              >
                {rowData?.last}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
  ];

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <FailedOrderForm />
      </div>
      <div className="p-2">
        <Table data={users} columns={columns} loading={loading} page={'failed_order'}/>
      </div>
    </Stack>
  );
};

export default Failed_orders;
