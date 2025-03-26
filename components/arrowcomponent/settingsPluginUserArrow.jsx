import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo } from "../utilities/toast_message";
import {changeToken , removePluginUser , updateTableData} from "../../store/reducer/Settings/PluginUser/pluginUserSlice";





const SettingsPluginUserArrow = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [showadminarrowelement, setShowadmonarrowelement] = useState("none");
  const arrowData = useSelector((state) => state.showsidearrow.Data);
  const {tableData} = useSelector((state)=>state.pluginUser)

  const ChangeTokenHandler = () => {
    dispatch(changeToken({ userIds: arrowData , share:false})).then((res) => {console.log(res,'change  user')
      if (res?.meta?.requestStatus === "fulfilled") {
        showInfo(res?.payload?.data?.message, toast);
      } else {
        showError(res?.payload?.data?.message, toast);
      }
    });
  };
  const ChangeAndShareTokenHandler = () => {
    dispatch(changeToken({ userIds: arrowData ,share:true})).then((res) => {console.log(res,'change and share user')
    if (res?.meta?.requestStatus === "fulfilled") {
        showInfo(res?.payload?.data?.message, toast);
      } else {
        showError(res?.payload?.data?.message, toast);
      }
    });
  };


// remove user
  const RemoveUserHandler = () => {
    let updatedData = tableData?.result?.filter(
      (item) => !arrowData?.includes(item.id)
    );
    // dispatch(setCheckBoxSelectedProduct(null));

    dispatch(removePluginUser({ userIds: arrowData })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        showInfo(res?.payload?.data?.message, toast);
        dispatch(updateTableData({ ...tableData, result: updatedData })); //update table
        //dispatch(setCheckBoxSelectedProduct(null));
      } else {
        showError(res?.payload?.data?.message, toast);
      }
    });
  };



  return (
    <>
      <Toast ref={toast} />
      <div
        id="event_actions"
        className="hide"
        onMouseEnter={() => setShowadmonarrowelement("block")}
        onMouseLeave={() => setShowadmonarrowelement("none")}
      >
        <div id="arrow">
          <KeyboardArrowLeftOutlinedIcon />
        </div>
        <div id="action_buttons" style={{ display: showadminarrowelement }}>
          <Button
            label="Change Token"
            className="p-button-primary"
            id="user_remove"
            onClick={ChangeTokenHandler}
          />
          <Button
            label="Change & share token"
            className="p-button-primary"
            id="user_remove"
            onClick={ChangeAndShareTokenHandler}
          />
          <Button
            label="Remove user"
            className="p-button-primary"
            id="user_remove"
            onClick={RemoveUserHandler}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(SettingsPluginUserArrow);
