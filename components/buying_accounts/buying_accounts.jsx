import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import Stack from "react-bootstrap/Stack";
import { BuyingAccountForm } from "../form/BuyingAccount/buyingaccount";
import Button from "react-bootstrap/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";
import { Toast } from "primereact/toast";

import Table from "../table/table";
import {
  buyingAccountFormdata,
  buyingAccountMainTable,
} from "../../store/reducer/BuyingAccount/buyingAccountSlice";
import {  getDate} from "../../services/helper";
import{ showModal} from "../../store/reducer/Modal/showAndHideModal";

import { activeDeactiveUserAction } from "../../store/reducer/BuyingAccount/ModalActions/actionSlice";
import { getExpiryFromCardName } from "../../services/helper";
import {purchaseDetailAction} from "../../store/reducer/Purchase/purchaseSlice";


export default function BuyingAccount() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.buyingaccount);
  const data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;
  const filters = useSelector((state) => state.buyingaccount.filters);
  const [tabledata, setTabledata] = useState(data);
  let toast = useRef(null);
  
  useEffect(() => {
    if (data) {
      setTabledata(data);
    }
  }, [data]);

  useEffect(() => {
    dispatch(buyingAccountFormdata());
  }, [dispatch]);

  useEffect(() => {
    dispatch(buyingAccountMainTable(filters));
  }, [dispatch, filters]);

 

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
  //password last updated
  const passwordUpdatedBodyTemplate = (rowData, rowIndex) => {
    return (
      <>
        {rowData !== undefined && rowData !== null && rowData?.pwLastUpdate ? (
          <> {rowData?.pwLastUpdate}</>
        ) : (
          "_"
        )}
      </>
    );
  };
 
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
              dispatch(showModal({ modal: "credit_card", data: rowData }));
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
              dispatch(showModal({ data: rowData, modal:'amount' }));
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
              let date = getDate(rowData?.lastUsed);
              dispatch(
                purchaseDetailAction({
                  eventID: rowData?.id,
                  date: date,
                  dataType: "last",
                })
              ).then((response) => {
                dispatch(showModal({ modal: "last_used", data: rowData }));
              });
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
 

  //last error log
  const lastErrorLogBodyTemplate = (rowData) => {
    const theObj = { __html: rowData?.lastErrorLog };
    return (
      <>
        {rowData?.lastErrorLog ? <div dangerouslySetInnerHTML={theObj} /> : "-"}
      </>
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
    dispatch(showModal({ data: rowData, modal:'user_modified' }));
  };

 
  //active and deactive
  const onToggleSwitch = useCallback(
    (rowData, event) => {
      const Checked = event.target.checked;
      const ID = rowData?.id;
      setTabledata((prevValues) => {
        const updatedUsers = prevValues.map((user) => {
          if (user.id === rowData.id) {
            return { ...user, active: event.target.checked === true ? 1 : 0 };
          }
          return user;
        });
        return updatedUsers;
      });

      // const updatedDat = tabledata?.map((item) => {
      //   if (item.id === ID) {
      //     return {
      //       ...item,
      //       active: !item?.active,
      //     };
      //   }
      //   return item;
      // });
      // console.log(updatedDat, "updatedDatupdatedDat");
      // setTabledata(updatedDat);

      // let updatedData = tabledata.map
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
        dispatch(activeDeactiveUserAction({ ID: [ID] || [], checked: 0 })).then(
          (res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              showSuccess(res?.payload, toast);
            }
            if (res?.meta?.requestStatus === "rejected") {
              showError(res?.payload, toast);
            }
          }
        );
      }
    },
    [dispatch, tabledata]
  );



  //define columns here
  const columns = [
    {
      field: "s_no",
      header: "SN",
      body: (rowData, rowIndex) => rowIndex.rowIndex + 1,
    },
    { field: "logged_in", header: "Logged In" },
    { field: "mp", header: "MP" },
    {
      field: "email",
      header: "User Name",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData.email ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showModal({ modal: "email", data: rowData }));
                }}
              >
                {rowData.email}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    }, //body: userEmailBodyTemplate //body: userPasswordBodyTemplate ,
    {
      field: "PW",
      header: "PW",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.PW ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(showModal({ modal: "password", data: rowData }));
                }}
              >
                {rowData?.PW}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "ticketPW",
      header: "Tickets PW",
      body: ticketPasswordBodyTemplate,
    },
    {
      field: "pwLastUpdate",
      header: "PW last updated",
      body: passwordUpdatedBodyTemplate,
    },
    {
      field: "creditCard",
      header: "Credit cards",
      body: creditCardBodyTemplate,
    },
    { field: "cardGroup", header: "Card group", body: cardGroupBodyTemplate },
    {
      field: "cardPerformBy",
      header: "Card Performed by",
      body: cardPerformedByBodyTemplate,
    },
    { field: "purchases", header: "Purchases", body: purchaseBodyTemplate },
    { field: "amount", header: "Amount", body: amountBodyTemplate },
    { field: "lastUsed", header: "Last used", body: lastUsedBodyTemplate },
    {
      field: "userModified",
      header: "User Modified",
      body: userModifiedBodyTemplate,
    },
    {
      field: "lastErrorLog",
      header: "Last Error Log",
      body: lastErrorLogBodyTemplate,
    },
    {
      field: "lastPerformedBy",
      header: "Last performed by",
    },
    {
      field: "error_csv",
      header: "CSV Error",
      //body: csvErrorBodyTemplate,
      body: (rowData) => {
        const theObj = { __html: rowData?.error_csv };
        return (
          <>
            {rowData?.error_csv ? (
              <div dangerouslySetInnerHTML={theObj} />
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "eventLevelDisabled",
      header: "Event Level Disabled",
      //body: eventLevelDisabledBodyTemplate,
      body: (rowData) => {
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
                  //eventLevelDisabledModalHandle(rowData);
                  dispatch(
                    showModal({ modal: "event_level_disabled", data: rowData })
                  );
                }}
              >
                {rowData?.eventLevelDisabled}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "card_expiry_date",
      header: "Card Expiring",
      //body: cardExpiringBodyTemplate,
      body: (rowData) => {
        let expiry = getExpiryFromCardName(rowData?.creditCard || "");
        return (
          <>
            <div>
              {rowData !== null &&
              rowData !== undefined &&
              rowData?.creditCard ? (
                <>
                  <span>{expiry !== undefined ? expiry : "-"}</span>
                </>
              ) : (
                "_"
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "active",
      header: "Active",
      body: (rowData, rowIndex) => {
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
      },
      //body: activeBodyTemplate,
    },
  ];

  

  return (
    <Stack gap={3} id="content" style={{ padding: "1% 0%" }}>
      <Toast ref={toast} />
      <div className="p-1">
        <BuyingAccountForm />
      </div>
      <div className="p-2">
        <Table
          data={tabledata}
          columns={columns}
          loading={loading}
          page={"buying_account"}
        />

      </div>
    </Stack>
  );
}
