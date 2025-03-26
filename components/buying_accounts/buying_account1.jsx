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
  import FormGroup from '@mui/material/FormGroup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Switch from '@mui/material/Switch';
  import { showError, showInfo, showSuccess } from "../utilities/toast_message";
  import { Toast } from "primereact/toast";
  
  //import Table from "../table/table";
  import Table from "./table";
  import {
    buyingAccountFormdata,
    buyingAccountMainTable,
  } from "../../store/reducer/BuyingAccount/buyingAccountSlice";
  import {
    SetShowUserModifiedByModal,
    SetShowAmountModal,
    showModal,
  } from "../../store/reducer/BuyingAccount/buyingAccountModalSlice";
  
  import { activeDeactiveUserAction } from "../../store/reducer/BuyingAccount/ModalActions/actionSlice";
  import { getExpiryFromCardName } from "../../services/helper";
  
  export default function BuyingAccount() {
    //const [formValues, setFormValues] = useState({});
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.buyingaccount);
    const data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;
    const filters = useSelector((state) => state.buyingaccount.filters);
    const [tabledata, setTabledata] = useState(data);
  
    const [isChecked, setIsChecked] = useState(false);
    let toast = useRef(null);
    console.log(tabledata, "tabledatatabledata");
    useEffect(() => {
      setTabledata(data);
    }, [data]);
  
    useEffect(() => {
      dispatch(buyingAccountFormdata());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(buyingAccountMainTable(filters));
    }, [dispatch, filters]);
  
    // serial no.
    function serialNumberBodyTemplate(rowData, rowIndex) {
      return rowIndex.rowIndex + 1;
    }
  
    // user name
    // const userEmailBodyTemplate = (rowData, rowIndex) => {
    //   return (
    //     <>
    //       {rowData !== undefined && rowData !== null && rowData.email ? (
    //         <Button
    //           type="button"
    //           className="btn link"
    //           id="forgetButton"
    //           onClick={() => {
    //             userEmailModalHandle(rowData);
    //           }}
    //         >
    //           {rowData.email}
    //         </Button>
    //       ) : (
    //         "_"
    //       )}
    //     </>
    //   );
    // };
  
    // const userEmailModalHandle = (rowData) => {
    //   dispatch(showModal({ modal: "email", data: rowData }));
    // };
  
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
    //card expiring
    const cardExpiringBodyTemplate = (rowData, rowIndex) => {
      //rowData?.creditCard||''
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
  
    //active and deactive
    const activeBodyTemplate = (rowData, rowIndex) => {console.log(tabledata,'dddddddddd')
      return (
        <>
          <div>
            {/* <Switch
              // defaultChecked={
              //   // rowData !== undefined &&
              //   // rowData !== null &&
              //   Boolean(rowData?.active)
              // }
              checked={
                // rowData !== undefined &&
                // rowData !== null &&
                Boolean(rowData?.active)
              }
              // checked ={isChecked}
              value={Boolean(rowData?.active)}
              onChange={(e) => handleToggle(rowData, e)}
            /> */}
  
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={rowData?.active} onChange={(event)=>onToggleSwitch(rowData, event)}/>}
               
              />
             
            </FormGroup>
          </div>
        </>
      );
    };
  
    const onToggleSwitch = (rowData, event) => {
      // setIsChecked(true)
      const Checked = event.target.checked;
      const ID = rowData?.id;
      console.log(data,'hndl tabledata')
      console.log("cllllll");
      //(" status changes", toast);
      
     // let updatedData = tabledata.map
      if (Checked === true) {
        console.log(Checked, "   ", ID);
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
  
    //define columns here
    const columns = [
      // { field: "s_no", header: "SN", body: serialNumberBodyTemplate },
      // { field: "logged_in", header: "Logged In" },
      // { field: "mp", header: "MP" },
      // { field: "email", header: "User Name", body: userEmailBodyTemplate }, //body: userEmailBodyTemplate
      // { field: "PW", header: "PW", body: userPasswordBodyTemplate },
      // {
      //   field: "ticketPW",
      //   header: "Tickets PW",
      //   body: ticketPasswordBodyTemplate,
      // },
      // {
      //   field: "pwLastUpdate",
      //   header: "PW last updated",
      //   body: passwordUpdatedBodyTemplate,
      // },
      // {
      //   field: "creditCard",
      //   header: "Credit cards",
      //   body: creditCardBodyTemplate,
      // },
      // { field: "cardGroup", header: "Card group", body: cardGroupBodyTemplate },
      // {
      //   field: "cardPerformBy",
      //   header: "Card Performed by",
      //   body: cardPerformedByBodyTemplate,
      // },
      // { field: "purchases", header: "Purchases", body: purchaseBodyTemplate },
      // { field: "amount", header: "Amount", body: amountBodyTemplate },
      // { field: "lastUsed", header: "Last used", body: lastUsedBodyTemplate },
      // {
      //   field: "userModified",
      //   header: "User Modified",
      //   body: userModifiedBodyTemplate,
      // },
      // {
      //   field: "lastErrorLog",
      //   header: "Last Error Log",
      //   body: lastErrorLogBodyTemplate,
      // },
      // {
      //   field: "lastPerformedBy",
      //   header: "Last performed by",
      // },
      // { field: "error_csv", header: "CSV Error", body: csvErrorBodyTemplate },
      // {
      //   field: "eventLevelDisabled",
      //   header: "Event Level Disabled",
      //   body: eventLevelDisabledBodyTemplate,
      // },
      // {
      //   field: "card_expiry_date",
      //   header: "Card Expiring",
      //   body: cardExpiringBodyTemplate,
      // },
      {
        field: "active",
        header: "Active",
        body: activeBodyTemplate,
      },
    ];
  
    //filter data
  
    return (
      <Stack gap={3} id="content" style={{ padding: "1% 0%" }}>
        <Toast ref={toast} />
        <div className="p-1">
          <BuyingAccountForm />
        </div>
        <div className="p-2">
          {/* <Table
            data={tabledata}
            columns={columns}
            loading={loading}
            page={"buying_account"}
          /> */}
  
          <Table/>
        </div>
      </Stack>
    );
  }
  