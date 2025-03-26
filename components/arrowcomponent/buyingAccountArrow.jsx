import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";

import {
  buyingAccountFormdata,
  buyingAccountMainTable,
  setSelectedProduct
} from "../../store/reducer/BuyingAccount/buyingAccountSlice";
import {
  activeDeactiveUserAction,
  deleteUserAction,
  resetPassUsersAction,
  updateCreditCardsAction,
  changePasswordTicketAction,
} from "../../store/reducer/BuyingAccount/ModalActions/actionSlice";
import { showArrow,hideArrow, setCheckBoxSelectedProduct } from "../../store/reducer/ArrowButton/arrowButtonSlice";



const BuyingAccountArrowComponent = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [showaction, setShowaction] = useState("none");
  const arrowData = useSelector((state) => state.showsidearrow.Data);
  const checked = useSelector((state) => state.showsidearrow.checked);
  const filters = useSelector((state) => state.buyingaccount.filters);
  const Data = useSelector((state) => state.buyingaccount.mainTabledata)?.data;


  console.log(arrowData,'arrowData', Data)
  
  const ActivateUserHandler = () => {
   
    if (arrowData?.length < 1) {
      showError("select atleast 1 user to activate", toast);
      return false;
    }
    dispatch(
      activeDeactiveUserAction({ ID: arrowData || [], checked: 1 })
    ).then((res) => {
    
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
       
        // dispatch(buyingAccountMainTable(filters)).then(()=>{
        //   dispatch(showArrow({ url: url, length: 0, users: [] ,checked:false }));
        // });
        let updatedData = Data?.map((item)=>{
          if(arrowData?.some((da)=>(item.id===da))){
           
            return{
              ...item,
              active:1,
            }
          }
          return item;
        })
    
        dispatch(setSelectedProduct({data:updatedData}));
        dispatch(setCheckBoxSelectedProduct(null));
       
      }
      if (res?.meta?.requestStatus ==="rejected") {
        showError(res?.payload, toast);
      }
    });
  };

  //deactive handler
  const DeactivateUserHandler = () => {
    dispatch(
      activeDeactiveUserAction({ ID: arrowData || [], checked: 0 })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
        let updatedData = Data?.map((item) => {
          if (arrowData?.some((da) => item.id === da)) {
            return {
              ...item,
              active: 0,
            };
          }
          return item;
        });

        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
      }
      if (res?.meta?.requestStatus === '"rejected"') {
        showError(res?.payload, toast);
      }
    });
  };

  //delete handler
  const DeleteUserHandler = () => {
    dispatch(deleteUserAction({ ID: arrowData || [] })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload, toast);
        let updatedData = Data?.filter((item) => !arrowData?.includes(item.id));
        dispatch(setSelectedProduct({ data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
        dispatch(hideArrow({url:'/api/buying_accounts'}));
      }
      if (res?.meta?.requestStatus === '"rejected"') {
        showError(res?.payload, toast);
      }
    });
  };

  const ResetPasswordHandler = () => {
    dispatch(resetPassUsersAction({ ID: arrowData || [] })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload?.message, toast);
        //dispatch(buyingAccountMainTable(filters));
      }
      if (res?.meta?.requestStatus === '"rejected"') {
        showError(res?.payload, toast);
      }
    });
  };

  const UpdateCardHandler = () => {
    dispatch(updateCreditCardsAction({ ID: arrowData || [] })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showSuccess(res?.payload?.message, toast);
        //dispatch(buyingAccountMainTable(filters));
      }
      if (res?.meta?.requestStatus === '"rejected"') {
        showError(res?.payload, toast);
      }
    });
  };
  const SyncPasswordHandler = () => {
    dispatch(changePasswordTicketAction({ ID: arrowData || [] })).then(
      (res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          showSuccess(res?.payload?.message, toast);
          //dispatch(buyingAccountMainTable(filters));
        }
        if (res?.meta?.requestStatus === '"rejected"') {
          showError(res?.payload, toast);
        }
      }
    );
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
          <Button
            label="Reset Password"
            className="p-button-success"
            data-action="reset"
            id="user_reset_password"
            onClick={ResetPasswordHandler}
          />
          <Button
            label="Update Card"
            className="p-button-warning"
            id="user_update_cards"
            onClick={UpdateCardHandler}
          />
          <Button
            label="Sync Password for Ticket.com"
            className="p-button-info"
            id="user_save_password_ticket"
            onClick={SyncPasswordHandler}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(BuyingAccountArrowComponent);
