import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Stack from "react-bootstrap/Stack";
import { useDispatch, useSelector } from "react-redux";
import QueueJobsResetpasswordFormComponent from "../../form/QueueJobs/queuejobs_resetpassword";
import Table from "../../table/table";
import Swal from "sweetalert2";
import {
  getQueueJobsResetPasswordTableData,
  updateStatus,
  getQueueJobsResetPasswordFormData,
  deleteResetPasswordUser
} from "../../../store/reducer/QueueJobs/resetpasswordSlice";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import Button from "react-bootstrap/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Toast } from "primereact/toast";
import { showSuccess, showError } from "../../utilities/toast_message";
import { marketPlaceFromID } from "../../../services/helper";

function Queuejobs_resetpasswordComponent() {
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const toast = useRef(null);
  let resetTabledata = useSelector(
    (state) => state.queuejobsresetpassword.resetTableData?.data
  );
  let filter = useSelector(
    (state) => state?.queuejobsresetpassword?.filters
  );

  useEffect(() => {
    dispatch(getQueueJobsResetPasswordFormData());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getQueueJobsResetPasswordTableData(filter));
  }, [dispatch,filter ]);


  useEffect(() => {
    if (resetTabledata && resetTabledata?.length > 0) {
      setData(resetTabledata);
    }else{
      setData([]);
    }
  }, [resetTabledata]);

 

 
  //handle switch
  const handleChange = useCallback((rowData, e) => {
    let active = e.target.checked;
    let id = rowData.id;
    setData((prevList) => {
      const updatedUsers = prevList.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: active === true ? "1" : "0",
            resetStatus: active === true ? "0" : "4",
          };
        }
        return user;
      });
      return updatedUsers;
    });
    dispatch(updateStatus({ userID:id })).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);
     }
    });
  },[dispatch,setData]);

 

  const deleteUser = useCallback((rowData) => {
    let id = rowData?.id;
    Swal.fire({
      //title: "Warning!",
      //text: "Do you realy want to remove event: <b>"+`${rowData.event_name}` +"</b>",
      html: `Do you really want to remove user: <b>${rowData?.userQuery?.email}</b> `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      customClass: {
        confirmButton: 'confirm-button-class',
        title: 'title-class',
        icon: 'icon-class',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevList) => {
          const newList = prevList.filter((r) => r.id !== id);
          return newList;
        });

        dispatch(deleteResetPasswordUser({ userID: id })).then((response) => {
          if (response.meta.requestStatus === "rejected") {
            showError(response.payload?.message, toast);
          }
          if (response.meta.requestStatus === "fulfilled") {
            showSuccess(response.payload?.message, toast);
          }
        });
      } else {
        console.error("Dispatch function is not defined.");
      }
    });

   
  },[dispatch , setData]);

  const columns = useMemo(()=>[
    { field: "sn", header: "SN", body: (rowData,rowIndex) => rowIndex.rowIndex + 1 },
    {
      field: "market_place",
      header: "Market Place",
      body: (rowData) => {
        let MP = marketPlaceFromID(
          rowData?.userQuery?.user_credential?.market_place_id || ""
        );
        return <>{MP}</>;
      },
    },
    {
      field: "user_name",
      header: "User Name",
      body: (rowData) => {
        return (
          <>
            {rowData.userQuery.first_name + " " + rowData.userQuery.last_name}
          </>
        );
      },
    },
    {
      field: "email",
      header: "Email",
      body: (rowData) => {
        return <>{rowData.userQuery.email}</>;
      },
    },
    {
      field: "password",
      header: "Password",
      body: (rowData) => {
        return <>{rowData.userQuery.user_credential.pass}</>;
      },
    },
    {
      field: "status",
      header: "Status",
      body: (rowData) => {
        return (
          <div>           
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(['0', '1', '3'].indexOf(rowData?.resetStatus) !== -1)}
                    onChange={(event) => handleChange(rowData, event)}
                  />
                }
              />
            </FormGroup>
          </div>
        );
      },
    },
    {
      field: "resetStatus",
      header: "Reset Status",
      body: (rowData) => {
        if (rowData?.resetStatus === "0") {
          return <Button variant="info">Pending</Button>;
        } else if (rowData?.resetStatus === "1") {
          return <Button variant="success">Success</Button>;
        } else if (rowData?.resetStatus === "2") {
          return <Button variant="warning">Fail</Button>;
        } else if (rowData?.resetStatus === "3") {
          return <Button variant="primary">In Process</Button>;
        } else {
          return <Button variant="danger">Reject</Button>;
        }
      },
    },
    {
      field: "action",
      header: "Action",
      body: (rowData) => {
        return (
          <span
            className="error"
            onClick={() => {
              deleteUser(rowData);
            }}
          >
            <CloseIcon />
          </span>
        );
      },
    },
  ],[deleteUser , handleChange]);
 

  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <Toast ref={toast} />
        <QueueJobsResetpasswordFormComponent  />
      </div>
      <div className="p-2">
        <Table data={data} columns={columns} show={show} setShow={setShow} />
      </div>
    </Stack>
  );
}
export default Queuejobs_resetpasswordComponent;
