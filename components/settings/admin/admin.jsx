import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
import Adminform from "../../form/Settings/Admin/adminform";
import Table from "../../table/table";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import Button from "react-bootstrap/Button";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import {
  showWarn,
  showError,
  showSuccess,
} from "../../utilities/toast_message";
import {
  adminMainTable,
  showUpdateEmailAddressModal,
  showResetPasswordModal,
  deleteAdminAction,
  activeAdmin,
  showUpdateNameModal
} from "../../../store/reducer/Settings/Admin/adminSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tableData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminMainTable());
  }, [dispatch]);

  useEffect(() => {
    setAdmin(tableData.data);
  }, [tableData]);

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        {rowData?.name ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              UpdateName(rowData);
            }}
          >
            {rowData?.name}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };

  const UpdateName = (rowData) =>{
    let { id, email, name } = rowData;
    dispatch(showUpdateNameModal({ id, email, name }));
  }
  // Update email address
  const emailAddressBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.email ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              UpdateEmail(rowData);
            }}
          >
            {rowData.email}
          </Button>
        ) : (
          "_"
        )}
      </>
    );
  };
  const UpdateEmail = (rowData) => {
    let { id, email, name } = rowData;
    dispatch(showUpdateEmailAddressModal({ id, email, name }));
  };

  // Reset Password
  const resetBodyTemplate = (rowData) => {
    if (rowData.super === 1) {
      return (
        <>
          <Button
            variant="info"
            className="addAdminButton"
            onClick={() =>
              showWarn("You can not change super admin password.", toast)
            }
          >
            Reset Password
          </Button>
        </>
      );
    } else if (rowData.super === 0) {
      return (
        <>
          <Button
            variant="info"
            className="addAdminButton"
            onClick={() => showModal(rowData)}
          >
            Reset Password
          </Button>
        </>
      );
    }
  };
  const showModal = (rowData) => {
    let { id, email, name } = rowData;
    dispatch(showResetPasswordModal({ id, name }));
  };
  // action column
  const activeBodyTemplate = (rowData) => {
    return (
      <>
        <div>
          {rowData.super === 0 ? (
            <Switch
              defaultChecked={Boolean(rowData.active)}
              inputProps={{ "aria-label": "controlled" }}
              onChange={(e) => handleToggle(rowData, e)}
            />
          ) : (
            <Switch
              defaultChecked={Boolean(rowData.active)}
              inputProps={{ "aria-label": "controlled" }}
              onChange={(e) => handleToggle(rowData, e)}
              disabled
            />
          )}
        </div>
      </>
    );
  };

  const handleToggle = (rowData, e) => {
    let id = rowData.id;
    let active = e.target.checked === true ? 1 : 0;
    dispatch(activeAdmin({ id, active })).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload, toast);
        //dispatch(adminMainTable());
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    if (rowData?.super === 0) {
      return (
        <>
          <span className="error" onClick={() => deleteAdmin(rowData)}>
            <CloseIcon />
          </span>
        </>
      );
    }
  };

  const deleteAdmin = (rowData) => {
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
        //const action = { type: 'DELETE_ADMIN', payload: { id: rowData.id } };
       
        dispatch(deleteAdminAction({ ID: rowData.id })).then((response) => {
          if (response.meta.requestStatus === "rejected") {
            showError(response.payload, toast);
          }
          if (response.meta.requestStatus === "fulfilled") {
            showSuccess(response.payload, toast);
            setAdmin((preValue) => {
              let updatedData = preValue?.filter(
                (item) => !rowData.id?.includes(item.id)
              );              
              return updatedData;
            });
          }
        });
      }
    });
  };

  // DEFINE YOUR COLUMNS HERES
  const columns = [
    { field: "name", header: "User Name", body: nameBodyTemplate },
    {
      field: "email",
      header: "Email Address",
      body: emailAddressBodyTemplate,
    },
    { field: "last_modified", header: "Last Modified" },
    {
      field: "Tickets Purchase Limit",
      header: "Reset Password",
      body: resetBodyTemplate,
    },
    {
      field: "Total Tickets Purchased",
      header: "Active",
      body: activeBodyTemplate,
    },
    { field: "Total spent", header: "Action", body: actionBodyTemplate },
  ];

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <Adminform />
      </div>
      <div className="p-1" style={{ marginTop: "50px" }}>
        <Table columns={columns} data={admin} />
      </div>
    </Stack>
  );
};

export default Admin;
