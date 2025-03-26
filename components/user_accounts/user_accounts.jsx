import React, { useState, useEffect, useCallback , useMemo ,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "react-bootstrap/Stack";
import Table from "../table/table";
import UserAccountForm from "../form/UserAccount/user_account_form";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { userAccountMainTable,userAccountFormData , activeDeactiveUserAccount , readCardAction } from "../../store/reducer/UserAccount/userAccountSlice";

import{ showModal} from "../../store/reducer/Modal/showAndHideModal";
import { showError, showSuccess } from "../utilities/toast_message";

const User_accounts = () => {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const [data, setData] = useState([]);
  const { tableData, filters ,form_data} = useSelector((state) => state?.userAccount);
  
  console.log(filters, "datatta" ,form_data);

  //FORM DATA
  useEffect(() => {
    dispatch(userAccountFormData());
  }, [dispatch]);

//TABLE DATA
  useEffect(() => {
    dispatch(userAccountMainTable(filters)); 
  }, [dispatch, filters]); 

  
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setData(tableData);
    } else {
      setData([]);
    }
  }, [tableData]);


  // const handleCrditCardModal = useCallback((rowData)=>{

  //   dispatch(readCardAction({ mpID: 1, ucID: rowData?.id })).then(
  //     (response) => {
  //       if (response.meta.requestStatus === "rejected") {
  //         showError(response?.payload, toast);
  //       }
  //       if (response.meta.requestStatus === "fulfilled") {
  //         if (response?.payload?.status === 400) {
  //           showError(response.payload.message, toast);
  //         } else if (response?.payload?.status === 200) {
  //           dispatch(showModal({modal:'user_account_credit_card',data:rowData}))
  //         }
  //       }
  //     }
  //   );

  // },[])
 

const onToggleSwitch = useCallback(
  (rowData, e) => {
    const ID = rowData?.id;
    let check = e.target.checked === true ? 1 : 0 ;
    setData((prevValues) => {
      const updatedUsers = prevValues.map((user) => {
        if (user.id === rowData.id) {
          return { ...user, active: check };
        }
        return user;
      });
      return updatedUsers;
    });

    dispatch(activeDeactiveUserAccount({ checked: check, ID })).then(
      (response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          showSuccess(response?.payload, toast);
        }
        if (response?.meta?.requestStatus === "rejected") {
          showError(response?.payload, toast);
        }
      }
    );
  },
  [setData , dispatch]
);

  //   Define columns here
  const columns = useMemo(
    () => [
      {
        field: "sn",
        header: "SN",
        body: (rowData, rowIndex) => rowIndex.rowIndex + 1,
      },
      { field: "market_place", header: "Market Place" },
      { field: "user_name", header: "User Name" },
      { field: "password", header: "Password" },
      {
        field: "card",
        header: "Credit Card",
        body: (rowData) => {
          return (
            <>
              {rowData !== undefined && rowData !== null && rowData?.card ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={(e) => {
                    //handleCrditCardModal(rowData,e )
                    dispatch(
                      showModal({
                        modal: "user_account_credit_card",
                        data: rowData,
                      })
                    );
                  }}
                >
                  {rowData?.card}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "created_at",
        header: "Account Added",
        body: (rowData) => {
          if (rowData.card_status === "") return "-";
          else if (rowData.card_status === "Card Added") {
            return <span>Fresh Account</span>;
          } else return <span>Fresh Account</span>;
        },
      },
      {
        field: "account_created_date",
        header: "Account Creation",
        body: (rowData) => {
          if (rowData.card_status === "") return "-";
          else if (rowData.card_status === "created") {
            return <span>Fresh Account</span>;
          } else return <span>Fresh Account</span>;
        },
      },
      {
        field: "credit_card_added_date",
        header: "Card added date",
        body: (rowData) => {
          if (rowData.card_status === "") return "-";
          else if (rowData.card_status === "Card Added") {
            return <span>Fresh Account</span>;
          } else return <span>Fresh Account</span>;
        },
      },
      {
        field: "moved_to_buying_accounts",
        header: "Moved date",
        body: (rowData) => {
          if (rowData.moved_to_buying_accounts === "") {
            return "-";
          } else return <span>{rowData.moved_to_buying_accounts}</span>;
        },
      },
      {
        field: "user_account_status",
        header: "Account Status",
        body: (rowData) => {
          if (
            rowData?.user_account_status === "" &&
            rowData?.account_status === ""
          ) {
            return <span>Fresh Account</span>;
          } else if (rowData?.user_account_status === "Account created") {
            return <span>{rowData?.user_account_status}</span>;
          } else {
            return <span>{rowData?.user_account_status}</span>;
          }
        },
      },
      {
        field: "active",
        header: "Active",
        body: (rowData) => {
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
      },
    ],
    [onToggleSwitch, dispatch]
  );

  return (
    <Stack gap={3} id="content" style={{ padding: "1% 0%" }}>
      <Toast ref={toast} />
      <div className="p-1">
        <UserAccountForm />
      </div>
      <div className="p-2">
        <Table
          data={data}
          columns={columns}
          page='user_account'
          pageCount= {5}
        />
      </div>
    </Stack>
  );
};

export default User_accounts;
