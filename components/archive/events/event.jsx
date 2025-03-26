import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
import ArchiveEventForm from "../../form/Archive/archive_event";
import Button from "react-bootstrap/Button";
import Table from "../../table/tablewithoutcheckbox";
import { purchasedTicketsShowModalAction } from "../../../store/reducer/Home/homemodalSlice";

import {
  showError,
  showInfo,
  showSuccess,
} from "../../utilities/toast_message";
import { Toast } from "primereact/toast";
import {
  archiveEventMainTable,
  archiveEventRestore,
} from "../../../store/reducer/Archives/archiveEventSlice";
import { purchaseDetailAction } from "../../../store/reducer/Purchase/purchaseSlice";
import { ticketLocationModalAction } from "../../../store/reducer/Home/homemodalSlice";

import { getDate } from "../../../services/helper";
import { showModal } from "../../../store/reducer/Modal/showAndHideModal";

import { MarketPlaceUrlParseHelper } from "../../../services/helper";

function Archive_eventComponent() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.archiveEvent?.table_data);
  const filter = useSelector((state) => state?.archiveEvent?.filter);

  useEffect(() => {
    dispatch(archiveEventMainTable(filter));
  }, [dispatch, filter]);

  //Filter keyword
  const filteredTableData = useMemo(() => {
    if (filter.keyword !== null) {
      return data?.eventsData?.filter((item) => {
        return (
          item?.name?.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
          item?.location?.toLowerCase().includes(filter.keyword?.toLowerCase())
        );
      });
    } else {
      return data?.eventsData;
    }
  }, [data, filter.keyword]);

  console.log(filteredTableData, "filteredTableData");

  const handleRestore = (rowData) => {
    let ID = rowData?.id;
    dispatch(archiveEventRestore({ ID })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload?.message, toast);
        dispatch(archiveEventMainTable({ filter }));
      }
      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload, toast);
      }
    });
  };

  const restoreBodyTemplate = (rowData) => {
    return (
      <>
        <span onClick={() => handleRestore(rowData)}>
          <i className="fa fa-undo restore-button restore-buying_account success"></i>
        </span>
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    let mp = MarketPlaceUrlParseHelper(rowData.eventUrl);
    return (
      <div>
        {rowData?.name}
        <a href={mp.event_url} target="_blank" rel="noreferrer noopener ">
          <img className="event_url" src={mp.IMG} alt="market place" />
        </a>
      </div>
    );
  };

  const columns = [
    { field: "name", header: "Event Name", body: nameBodyTemplate },
    { field: "time", header: "Event Date / Time" },
    { field: "location", header: "Venue / Location" },
    {
      field: "totalPurchase",
      header: "Total Tickets Purchased",
      body: (rowData) => {
        return (
          <>
            {" "}
            {rowData.totalPurchase ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  //let date = getDate(rowData?.first);
                  let mp = MarketPlaceUrlParseHelper(rowData.eventUrl);
                  console.log(mp, 'mp')
                  dispatch(
                    purchasedTicketsShowModalAction({ ID: rowData?.id })
                  ).then((response) => {
                    if (response?.meta?.requestStatus === "fulfilled") {
                      // if (response?.payload?.data?.ticketHistory?.length > 0) {
                      dispatch(
                        showModal({
                          modal: "archive/event/total_ticket_purchased",
                          data: rowData,
                        })
                      );
                      // }else{
                      //   showError('There is no ticket available for event '+ response?.payload?.data?.event?.event_name, toast);
                      // }
                    }

                    if (response?.meta?.requestStatus === "rejected") {
                      showError(
                        "Errror " + response?.payload?.data?.event?.event_name,
                        toast
                      );
                    }
                  });
                }}
              >
                {rowData.totalPurchase}
              </Button>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "ticketLocation",
      header: "Ticket Location",
      body: (rowData) => {
        return (
          <>
            {" "}
            {rowData.deleted ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(ticketLocationModalAction({ ID: rowData.id })).then(
                    (response) => {
                      console.log(response, "response");
                      dispatch(
                        showModal({
                          modal: "archive/event/ticket_location",
                          data: rowData,
                        })
                      );
                    }
                  );
                }}
              >
                <i className="fa fa-map"></i>
              </Button>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "amount",
      header: "Total spent",
      body: (rowData) => {
        return (
          <>
            {" "}
            {rowData.amount ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(
                    purchasedTicketsShowModalAction({ ID: rowData?.id })
                  ).then(() => {
                    dispatch(
                      showModal({
                        modal: "archive/event/total_spent",
                        data: rowData,
                      })
                    );
                  });
                }}
              >
                {"$" + parseInt(rowData.amount)}
              </Button>
            ) : (
              "-"
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
            {" "}
            {rowData.first ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  let date = getDate(rowData?.first ?? "");
                  dispatch(
                    purchaseDetailAction({ eventID: rowData?.id, date: date })
                   // purchaseDetailAction({ eventID: rowData?.id, date: date })
                  ).then((response) => {
                    console.log(response, "response");
                    // if (response?.payload?.data?.length > 0) {
                    dispatch(
                      showModal({
                        modal: "archive/event/first",
                        data: rowData,
                      })
                    );
                    // }else{
                    //   showError('There is no ticket available for event '+ response?.payload?.data?.event?.event_name, toast);
                    // }
                  });
                }}
              >
                {rowData.first}
              </Button>
            ) : (
              "-"
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
            {" "}
            {rowData.last ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  let date = getDate(rowData?.last ?? "");
                  dispatch(
                    purchaseDetailAction({
                      eventID: rowData?.id,
                      date: date,
                      dataType: "last",
                    })
                  ).then((response) => {
                    dispatch(
                      showModal({
                        modal: "archive/event/last",
                        data: rowData,
                      })
                    );
                  });
                }}
              >
                {rowData.last}
              </Button>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "deleted",
      header: "Deleted at",
      body: (rowData) => {
        return <> {rowData.deleted ? <>{rowData.deleted}</> : "-"}</>;
      },
    },
    { field: "Capacity", header: "Restore", body: restoreBodyTemplate },
  ];

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <ArchiveEventForm />
      </div>
      <div className="p-2">
        <Table
          data={filteredTableData}
          columns={columns}
          page={"archive_event"}
        />
      </div>
    </Stack>
  );
}
export default Archive_eventComponent;
