import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomepageForm from "../form/Home/homepageform";
import Stack from "react-bootstrap/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Table from "../table/table";
import Button from "react-bootstrap/Button";
import { InputText } from "primereact/inputtext";
import "./home.css";

import { MarketPlaceUrlParseHelper , getDate} from "../../services/helper";
import {purchaseDetailAction} from "../../store/reducer/Purchase/purchaseSlice";

import { showError, showInfo ,showSuccess} from "../utilities/toast_message";
//reducers
import {
  SetShow,
  ShowTicketPurchasedModal,
  ShowTotalSpentModal,
  ShowTicketPurchaseCapacityModal,
  ShowTicketLocationModal,
  showLastPurchaseModal,
  showFirstPurchaseModal,
  showTicketLimitPerUserModal,
} from "../../store/reducer/Home/homemodalSlice";
import {
  getHomeMainTable,
  getHomeFormData,
  removeHomeData,
} from "../../store/reducer/Home/homeSlice";
import { Toast } from "primereact/toast";
import moment from "moment";

export default function Home() {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const filters = useSelector((state) => state.home.filters);

  useEffect(() => {
    dispatch(getHomeFormData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomeMainTable(filters));
  }, [dispatch, filters]);

  const refreshHandler = () => {
    //alert('refresh')
    dispatch(getHomeMainTable(filters));
  };
  const tableData = useSelector((state) => state.home.tableData);

  //Filter keyword
  const filteredTableData = useMemo(() => {
    return tableData?.encodedEvent?.filter(
      (item) =>
        item?.name?.toLowerCase().includes(filters.keyword?.toLowerCase()) ||
        (item?.location
          ?.toLowerCase()
          .includes(filters.keyword?.toLowerCase()) ??
          false)
    );
  }, [tableData, filters.keyword]);





 


 


 


  

 

 

  


  //Event remove handler 
  const removeEvent = (rowData) => {
    let mp = MarketPlaceUrlParseHelper(rowData.eventUrl);
    Swal.fire({
      // title: "Warning!",
      //text: "Do you realy want to remove event: <b>"+`${rowData.event_name}` +"</b>",
      html: `Do you really want to remove event: <b>${rowData.name}</b> <img src= ${mp.IMG} className="event_url" style="height:30px; border-radius: 50%; border: 2px solid #000;"  alt="market place">`,
      // icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeHomeData({ eventID: rowData.id })).then((response)=>{
          console.log(response,'home dele')
          if (response.meta.requestStatus === "rejected") {
            showError(response.payload, toast);
          }
          if (response.meta.requestStatus === "fulfilled") {
            showSuccess(response.payload?.message, toast);
            dispatch(getHomeMainTable(filters));
          }
        });
      } else {
        console.error("Dispatch function is not defined.");
      }
    });
  };


  //Total ticket purchased modal handler
  const totalTicketPurchasedModalHandler = (rowData) => {
    dispatch(ShowTicketPurchasedModal(rowData));
  };



  const totalSpentModalHandler = (rowData) => {
    dispatch(ShowTotalSpentModal(rowData));
  };

  

  const ticketLocationModalHandler = (rowData) => {
    dispatch(ShowTicketLocationModal(rowData));
  };

 

  const capacityModalHandler = (rowData) => {
    dispatch(ShowTicketPurchaseCapacityModal(rowData));
  };

  
  const firstPurchaseModalHandler = (rowData) => {
    let date = getDate(rowData?.first);
    dispatch(purchaseDetailAction({ eventID: rowData?.id, date: date })).then(
      (response) => {
        dispatch(showFirstPurchaseModal(rowData));
      }
    );
  };

 

  const lastPurchaseModalHandler = (rowData) => {
    let date = getDate(rowData?.last);
    dispatch(
      purchaseDetailAction({
        eventID: rowData?.id,
        date: date,
        dataType: "last",
      })
    ).then((response) => {
      dispatch(showLastPurchaseModal(rowData));
    });
  };

  //Table columns
  const columns = [
    {
      field: "name",
      header: "Event Name",
      body: (rowData, column) => {
        let mp = MarketPlaceUrlParseHelper(rowData.eventUrl||'');
        return (
          <div>
            {rowData[column.field]}
            {mp.event_url && (
              <>
                <a
                  href={mp.event_url}
                  target="_blank"
                  rel="noreferrer noopener "
                >
                  <img className="event_url" src={mp.IMG} alt="market place" />
                </a>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "time",
      header: "Event Date / Time",
      body: (rowData, column) => {
        return <div>{rowData?.time ? rowData.time : "-"}</div>;
      },
    },
    {
      field: "location",
      header: "Venue / Location",
      body: (rowData, column) => {
        return (
          <div onClick={() => dispatch(SetShow())}>{rowData.location}</div>
        );
      },
    },
    {
      field: "purchaseLimit",
      header: "Tickets Purchase Limit",
      body: (rowData, column) => {
        return (
          <>
            <Button
              type="button"
              className="btn link"
              id="forgetButton"
              onClick={() => {
                dispatch(
                  SetShow({ data: rowData, modal: "ticket_purchase_limit" })
                );
              }}
            >
              {rowData?.purchaseLimit}
            </Button>
          </>
        );
      },
    },
    {
      field: "totalPurchase",
      header: "Total Tickets Purchased",
      body: (rowData, column) => {
        return (
          <>
            {rowData.totalPurchase ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  totalTicketPurchasedModalHandler(rowData);
                }}
              >
                {rowData.totalPurchase}
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
      header: "Total spent",      
      body: (rowData, column) => {
        return (
          <>
            {rowData.amount ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  totalSpentModalHandler(rowData);
                }}
              >
                {"$" + rowData.amount}
              </Button>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "ticket_location",
      header: "Ticket Location",      
      body: (rowData, column) => {
        return (
          <>
            {rowData.location ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  ticketLocationModalHandler(rowData);
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
      field: "capacity",
      header: "Capacity",    
      body: (rowData, column) => {
        return (
          <>
            <Button
              type="button"
              className="btn link"
              id="forgetButton"
              onClick={() => {
                capacityModalHandler(rowData);
              }}
            >
              <i className="fa fa-balance-scale"></i>
            </Button>
          </>
        );
      },
    },
    {
      field: "first",
      header: "First Purchase",     
      body: (rowData, column) => {
        return (
          <>
            {rowData.first ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  firstPurchaseModalHandler(rowData);
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
      body: (rowData, column) => {
        return (
          <>
            {rowData.last ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  lastPurchaseModalHandler(rowData);
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
      field: "ticketLimit",
      header: "Ticket Limit / User",
      body: (rowData, column) => {
        return (
          <>
            <Button
              type="button"
              className="btn link"
              id="forgetButton"
              onClick={() => {
                dispatch(
                  SetShow({
                    data: rowData,
                    modal: "ticket_purchase_limit_per_user",
                  })
                );
              }}
            >
              {rowData[column.field]}
            </Button>
          </>
        );
      },
    },
    {
      field: "Remove",
      header: "Remove",
      body: (rowData, column) => {
        return (
          <span
            className="error"
            onClick={() => {
              removeEvent(rowData);
            }}
          >
            <CloseIcon />
          </span>
        );
      },
    },
  ];

 

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <HomepageForm refreshHandler={refreshHandler} />
      </div>
      <div className="p-2">
        <Table data={filteredTableData} columns={columns} page={'home'}/>
      </div>
    </Stack>
  );
}
