import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showArrow , setCheckBoxSelectedProduct} from "../../store/reducer/ArrowButton/arrowButtonSlice";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";
import {
  setSelectedProduct,
  resetPasswordBulkAction,
} from "../../store/reducer/QueueJobs/resetpasswordSlice";

const QueueJobsResetPasswordArrow = () => {
 const toast = useRef(null);
  const dispatch = useDispatch();
  const [showaction, setShowaction] = useState("none");
  const arrowData = useSelector(
    (state) => state?.showsidearrow?.reset_password_arrow
  );
  const checked = useSelector((state) => state.showsidearrow.checked);
  let resetTabledata = useSelector(
    (state) => state.queuejobsresetpassword.resetTableData?.data
  );
 
  console.log(arrowData,'arrowData')

  //bulk activate
  const ActivateUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }
   

    dispatch(
      resetPasswordBulkAction({
        users: arrowData.join(","),
        userAction: "active",
      })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        console.log(response, "response");
        showError(response?.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);

        let updatedData = resetTabledata?.map((item) => {
          if (arrowData?.some((da) => item.id === da)) {
            return {
              ...item,
              status: "1",
              resetStatus: "0",
            };
          }
          return item;
        });
        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
      }
      setTimeout(() => {
        dispatch(showArrow({ url: "/api/queue_jobs", length: "", users: [], checked: false }));
      }, 1000);
    });
  };


  //bulk deactivate
  const DeactivateUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }  
    dispatch(
      resetPasswordBulkAction({
        users: arrowData.join(","),
        userAction: "deactive",
      })
    ).then((response) => {
      console.log(response, "response");

      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload, toast);
      }

      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);

        let updatedData = resetTabledata?.map((item) => {
          if (arrowData?.some((da) => item.id === da)) {
            return {
              ...item,
              status: "0",
              resetStatus: "4",
            };
          }
          return item;
        });
        console.log(updatedData,'updatedData')
        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
      }
      setTimeout(() => {
        dispatch(showArrow({ url: "", length: "", users: [], checked: false }));
      }, 1000);
    });
  };


  //bulk delete
  const DeleteUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }
   

    dispatch(
      resetPasswordBulkAction({
        users: arrowData.join(","),
        userAction: "remove",
      })
    ).then((response) => {
    
      if (response.meta.requestStatus === "rejected") {  console.log(response, "response");
        showError(response?.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);
        let updatedData = resetTabledata?.filter(
          (item) => !arrowData?.includes(item.id)
        );
        console.log(updatedData, "updatedData");
        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
      }
      setTimeout(() => {
        dispatch(showArrow({ url: "", length: "", users: [], checked: false }));
      }, 1000);
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div
        id="event_actions"
        className="hide"
        onMouseEnter={() => setShowaction("block")}
        onMouseLeave={() => setShowaction("none")}
      >
        
        <div id="arrow">
          <KeyboardArrowLeftOutlinedIcon />
        </div>
        <div id="action_buttons" style={{ display: showaction }}>
          <Button
            label="Activate"
            className="p-button-success"
            id="user_activate"
            onClick={ActivateUserHandler}
          />
          <Button
            label="Deactivate"
            className="p-button-warning"
            id="user_deactivate"
            onClick={DeactivateUserHandler}
          />
          <Button
            label="Delete"
            className="p-button-danger"
            id="user_remove"
            onClick={DeleteUserHandler}
          />
        </div>
      </div>
    </>
  );
};

export default QueueJobsResetPasswordArrow;
