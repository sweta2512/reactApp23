import { useState, useEffect, useRef , useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "react-bootstrap/Stack";
import ArchiveBuyingAccountForm from "../../form/Archive/archive_buying_account_form";
import Table from "../../table/tablewithoutcheckbox";
import Button from "react-bootstrap/Button";
import {
  archiveBuyingAccountFormdata,
  archiveBuyingAccountMainTable,
  archiveBuyingAccountRestore,
  archiveBuyingAccountDelete,
  showModal
} from "../../../store/reducer/Archives/archiveBuyingAccountSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  showError,
  showInfo,
  showSuccess,
} from "../../utilities/toast_message";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import { getExpiryFromCardName } from "../../../services/helper";
import moment from "moment";
import { formatDate } from "../../../services/helper";

const Archive_Buying_account = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [users, setUsers] = useState(null);
  const table_data = useSelector((state) => state?.archiveBuyingAccount?.table_data?.data);

  const { filter } = useSelector((state) => state?.archiveBuyingAccount);

  useEffect(() => {
    setUsers(table_data);
  }, [table_data]); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    dispatch(archiveBuyingAccountFormdata());
  }, [dispatch]);

  useEffect(() => {
    dispatch(archiveBuyingAccountMainTable({ ...filter }));
  }, [dispatch, filter]);

  
 


  const handleRestore = useCallback((rowData) => {
    let ID = rowData?.id;
    dispatch(archiveBuyingAccountRestore({ ID })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload?.message, toast);
        dispatch(archiveBuyingAccountMainTable({ filter }));
      }
      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload, toast);
      }
    });
  },[dispatch]);

 
  

  const deleteUser = useCallback((rowData) => {
    Swal.fire({
      //title: "Warning!",
      //text: "Do you realy want to remove event: <b>"+`${rowData.event_name}` +"</b>",
      html: `Do you really want to remove user: <b>${rowData.email}</b>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(archiveBuyingAccountDelete({ id: rowData.id })).then(
          (response) => {
            if (response.meta.requestStatus === "rejected") {
              showError(response.payload, toast);
            }
            if (response.meta.requestStatus === "fulfilled") {
              showSuccess(response.payload, toast);
              dispatch(archiveBuyingAccountMainTable());
            }
          }
        );
      }
    });
  },[dispatch]);

  const columns = useMemo(
    () => [
      { field: "mp", header: "Market Place" },
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
                    //userEmailModalHandle(rowData);
                    dispatch(showModal({ modal: "user_name", data: rowData }));
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
      },
      {
        field: "password",
        header: "Password",
        body: (rowData, column) => {
          return <div>{rowData[column.field]}</div>;
        },
      },
      {
        field: "card",
        header: "Credit Card",
        body: (rowData) => {
          return (
            <>
              {rowData !== undefined && rowData !== null && rowData.card ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    // creditCardModalHandle(rowData);
                    dispatch(
                      showModal({ modal: "credit_card", data: rowData })
                    );
                  }}
                >                  
                  {rowData?.card.split('[')?.[0]}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "card_expiring",
        header: "Card Expiring",
        body: (rowData) => {
          let expiry = getExpiryFromCardName(rowData?.card || "");
          return (
            <>
              <div>
                {rowData !== null && rowData !== undefined && rowData?.card ? (
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
        field: "purchase",
        header: "Number of Purchases",
        body: (rowData) => {
          return (
            <>
              {" "}
              {rowData !== undefined &&
              rowData !== null &&
              rowData?.purchase ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    // creditCardModalHandle(rowData);
                    dispatch(
                      showModal({ modal: "purchase", data: rowData?.id })
                    );
                  }}
                >
                  {rowData?.purchase}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "total",
        header: "Amount spent",
        body: (rowData) => {
          return (
            <>
              {" "}
              {rowData !== undefined && rowData !== null && rowData?.total ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    // creditCardModalHandle(rowData);
                    dispatch(showModal({ modal: "total", data: rowData?.id }));
                  }}
                >
                  {"$"+ rowData?.total}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "used",
        header: "Last used",
        body: (rowData) => {
          return (
            <>
              {" "}
              {rowData !== undefined && rowData !== null && rowData?.email ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    // creditCardModalHandle(rowData);
                    dispatch(
                      showModal({ modal: "last_used", data: rowData?.id })
                    );
                  }}
                >
                  {rowData?.email}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "modify",
        header: "User Modified",
        body: (rowData) => {
          let date = formatDate(rowData?.modify);
          return (
            <>
              {rowData !== undefined && rowData !== null && rowData?.modify ? (
                <Button
                  type="button"
                  className="btn link"
                  id="forgetButton"
                  onClick={() => {
                    dispatch(
                      showModal({ modal: "user_modified", data: rowData })
                    );
                  }}
                >
                  {date}
                </Button>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        field: "deleted",
        header: "Deleted at",
        body: (rowData) => {
          let date = formatDate(rowData?.deleted);
          return (
            <>
              {rowData !== undefined && rowData !== null && rowData?.deleted
                ?  date 
                : "_"}
            </>
          );
        },
      },
      {
        field: "restore",
        header: "Restore",
        body: (rowData) => {
          return (
            <>
              <span onClick={() => handleRestore(rowData)}>
                <i className="fa fa-undo restore-button restore-buying_account success"></i>
              </span>
            </>
          );
        },
      },
      {
        field: "Remove",
        header: "Action",
        body: (rowData) => {
          return (
            <>
              <div>
                <span className="error" onClick={() => deleteUser(rowData)}>
                  <CloseIcon />
                </span>
              </div>
            </>
          );
        },
      },
    ],
    [deleteUser, handleRestore]
  );
  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <ArchiveBuyingAccountForm />
      </div>
      <div className="p-2">
        <Table
          data={users}
          columns={columns}
          page={'buying_account'}
        />
      </div>
    </Stack>
  );
};

export default Archive_Buying_account;
