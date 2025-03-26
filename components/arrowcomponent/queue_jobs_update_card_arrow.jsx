import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";
import {
  updateCardBulkAction,
  setSelectedProduct,
} from "../../store/reducer/QueueJobs/updatecardsSlice";
import { showArrow , setCheckBoxSelectedProduct } from "../../store/reducer/ArrowButton/arrowButtonSlice";




const QueueJobsUpdateCardArrow = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [showaction, setShowaction] = useState("none");
  const arrowData = useSelector(
    (state) => state.showsidearrow.update_card_arrow
  );
  const checked = useSelector((state) => state.showsidearrow.checked);
  const data = useSelector(
    (state) => state.queueJobsUpdateCards.update_cards_data
  );

  const ActivateUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }
    dispatch(
      updateCardBulkAction({ users: arrowData.join(","), userAction: "active" })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response?.payload?.message, toast);

        let updatedData = data?.map((item) => {
            if (arrowData?.some((da) => item.id === da)) {
              return {
                ...item,
                status: 0,
              };
            }
            return item;
          });
          dispatch(setSelectedProduct({ data: updatedData }));
          dispatch(setCheckBoxSelectedProduct(null));
      }
      setTimeout(() => {
        dispatch(showArrow({ url: "", length: "", users: [], checked: false }));
      }, 1000);
    });
  };
  const DeactivateUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }
   

    dispatch(
      updateCardBulkAction({
        users: arrowData.join(","),
        userAction: "deactive",
      })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);
        //update ui
        let updatedData = data?.map((item) => {
            if (arrowData?.some((da) => item.id === da)) {
              return {
                ...item,
                status: 4,
              };
            }
            return item;
          });
          dispatch(setSelectedProduct({ data: updatedData }));
          dispatch(setCheckBoxSelectedProduct(null));
      }
      setTimeout(() => {
        dispatch(showArrow({ url: "", length: "", users: [], checked: false }));
      }, 1000);
    });
  };

  const DeleteUserHandler = () => {
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }

    dispatch(
      updateCardBulkAction({ users: arrowData.join(","), userAction: "remove" })
    ).then((response) => {
      console.log(response, "response");
      if (response.meta.requestStatus === "rejected") {
        showError(response?.payload?.message, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload?.message, toast);
        //update ui
        let updatedData = data?.filter((item) => !arrowData?.includes(item.id));
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

export default QueueJobsUpdateCardArrow;
