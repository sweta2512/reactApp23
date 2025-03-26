import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
//import ArchiveEventForm from "../../form/archive_event";
import QueueJobsUpdatecardsComponent from "../../form/QueueJobs/queuejobs_updatecard";
import Table from "../../table/table";
import Swal from "sweetalert2";
import { getQueueJobsResetPasswordFormData } from "../../../store/reducer/QueueJobs/resetpasswordSlice";
import {
  getUpdateCardsTableData,
  deleteUpdateCardData,
  updateCardStatus,
} from "../../../store/reducer/QueueJobs/updatecardsSlice";
import Switch from "@mui/material/Switch";
import { Toast } from "primereact/toast";
import CloseIcon from "@mui/icons-material/Close";
import { showError, showSuccess } from "../../utilities/toast_message";
import { marketPlaceFromID } from "../../../services/helper";

function Queuejobs_updatecardComponent() {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const [users, setUsers] = useState([]);

  let { update_cards_data } = useSelector(
    (state) => state.queueJobsUpdateCards
  );

  let filter = useSelector(
    (state) => state.queueJobsUpdateCards?.filters
  );

  useEffect(() => {
    dispatch(getQueueJobsResetPasswordFormData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUpdateCardsTableData(filter));
  }, [dispatch , filter]);

  useEffect(() => {
    console.log(update_cards_data, "updateCardData");
    if (update_cards_data && update_cards_data.length > 0) {
      setUsers(update_cards_data);
    }else{
      setUsers([]);
    }
  }, [update_cards_data]);

 

  const handleChange = useCallback(
    (rowData, e) => {
      let id = rowData?.id;
      setUsers((prevList) => {
        const updatedUsers = prevList.map((user) => {
          if (user.id === rowData.id) {
            return { ...user, status: e.target.checked === true ? 0 : 4 };
          }
          return user;
        });
        console.log(updatedUsers, "updatedUsers");
        return updatedUsers;
      });

      dispatch(updateCardStatus({ userID: id })).then((response) => {
        if (response.meta.requestStatus === "rejected") {
          showError(response?.payload?.message, toast);
        }

        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(response?.payload?.message, toast);
        }
      });
    },
    [dispatch,  setUsers]
  );

  const deleteUser = useCallback((rowData) => {
    let id = rowData?.id;
    Swal.fire({
      //title: "Warning!",
      //text: "Do you realy want to remove event: <b>"+`${rowData.event_name}` +"</b>",
      html: `Do you really want to remove user: <b>${rowData?.userName}</b> `,
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
        setUsers((prevList) => {
          const newList = prevList.filter((r) => r.id !== id);
          return newList;
        });
        dispatch(deleteUpdateCardData({ userID: id })).then((response) => {
          if (response.meta.requestStatus === "rejected") {
            showError(response?.payload?.message, toast);
          }

          if (response.meta.requestStatus === "fulfilled") {
            showSuccess(response?.payload?.message, toast);
          }
        });
      } else {
        console.error("Dispatch function is not defined.");
      }
    });
  },[dispatch, setUsers]);

  const columns = useMemo(
    () => [
      {
        field: "sn",
        header: "SN",
        body: (rowData, rowIndex) => rowIndex.rowIndex + 1,
      },
      {
        field: "market_place_id",
        header: "Market Place",
        body: (rowData) => {
          let MP = marketPlaceFromID(rowData?.market_place_id || "");
          return <>{MP}</>;
        },
      },
      { field: "cardName", header: "Card Id" },
      { field: "nameOnCard", header: "Name on Card" },
      { field: "userName", header: "Email" },
      {
        field: "status",
        header: "Status",
        body: (rowData, rowIndex) => (
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean([0, 1, 3].indexOf(rowData?.status) !== -1)}
                    onChange={(event) => handleChange(rowData, event)}
                  />
                }
              />
            </FormGroup>
          </div>
        ),
      },
      {
        field: "Ticket Location",
        header: "Card Status",
        body: (rowData) => {
          if (rowData?.status === 0) {
            return <Button variant="info">Pending</Button>;
          } else if (rowData?.status === 1) {
            return <Button variant="success">Success</Button>;
          } else if (rowData?.status === 2) {
            return <Button variant="warning">Fail</Button>;
          } else if (rowData?.status === 3) {
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
    ],
    [handleChange, deleteUser]
  );

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <div className="p-1">
        <QueueJobsUpdatecardsComponent />
      </div>
      <div className="p-2">
        <Table data={users} columns={columns} />
      </div>
    </Stack>
  );
}
export default Queuejobs_updatecardComponent;
