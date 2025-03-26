import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";

import {
  moveAccountAction,
  resetAccountAction,
  deleteAccountAction,
  updatePasswordAction,
  updateUserAction,
  setSelectedProduct
} from "../../store/reducer/UserAccount/userAccountSlice";
import { showArrow,hideArrow, setCheckBoxSelectedProduct } from "../../store/reducer/ArrowButton/arrowButtonSlice";

const UserAccountArrowComponent = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [showaction, setShowaction] = useState("none");
  const arrowData = useSelector((state) => state.showsidearrow?.userAccount);
  const checked = useSelector((state) => state.showsidearrow.checked);
  const filters = useSelector((state) => state.buyingaccount.filters);
  const tableData = useSelector((state) => state?.userAccount?.tableData);

  console.log(arrowData, "arrowData", tableData);

  const MoveAccountHandler = () => {
    // let updatedData = Data?.map((item)=>{
    //   if(arrowData?.some((da)=>(item.id===da))){

    //     return{
    //       ...item,
    //       active:1,
    //     }
    //   }
    //   return item;
    // })

    // dispatch(setSelectedProduct({data:updatedData}));

    if (arrowData?.length < 1) {
      showError("select atleast 1 user to activate", toast);
      return false;
    }
    dispatch(moveAccountAction({ ID: arrowData || [] })).then((res) => { console.log(res)
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
      }
      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload?.error, toast);
      }
    });
  };
  const MoveAccountForcefullyHandler = () => {
    // let updatedData = Data?.map((item)=>{
    //   if(arrowData?.some((da)=>(item.id===da))){
    //     return{
    //       ...item,
    //       active:0,
    //     }
    //   }
    //   return item;
    // })

    // dispatch(setSelectedProduct({data:updatedData}));

    dispatch(
      moveAccountAction({ ID: arrowData || [], forcefully: "forcefully" })
    ).then((res) => {
      console.log(res)
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
      }
      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload?.error, toast);
      }
    });
  };
  const ResetHandler = () => {
    dispatch(resetAccountAction({ ID: arrowData || [] })).then((res) => {
      console.log(res, 'resres')
      if (res?.meta?.requestStatus === "fulfilled") {
        if (res?.payload?.messages?.length > 0) {
          const messageElements = res?.payload?.messages?.map((item, index) => (
            <React.Fragment key={index}>
              {item}
              <br />
            </React.Fragment>
          ));
          showSuccess( messageElements, toast);
        }
      }
      if (res?.meta?.requestStatus === '"rejected"') {
        showError(res?.payload, toast);
      }
    });
  };

  //delete account
  const DeleteHandler = () => {
    dispatch(deleteAccountAction({ ID: arrowData || [] })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
        let updatedData = tableData?.filter(
          (item) => !arrowData?.includes(item.id)
        );
        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
        dispatch(hideArrow({url:'/api/user_accounts'}));
      }

      if (res?.meta?.requestStatus === "rejected") {
        showError(res?.payload, toast);
      }
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
            label="Move accounts"
            className="p-button-success"
            id="user_activate"
            onClick={MoveAccountHandler}
          />
          <Button
            label="Move accounts forcefully"
            className="p-button-warning"
            id="user_deactivate"
            onClick={MoveAccountForcefullyHandler}
          />

          <Button
            label="Reset accounts"
            className="p-button-success"
            data-action="reset"
            id="user_reset_password"
            onClick={ResetHandler}
          />
          <Button
            label="Delete"
            className="p-button-danger"
            id="delete user"
            onClick={DeleteHandler}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(UserAccountArrowComponent);
