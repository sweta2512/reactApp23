import React, { useState, useRef } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { showError, showInfo, showSuccess } from "../utilities/toast_message";
import { Toast } from "primereact/toast";
import { updateTableData , deleteAdminAction} from "../../store/reducer/Settings/Admin/adminSlice";
import { setCheckBoxSelectedProduct } from "../../store/reducer/ArrowButton/arrowButtonSlice";

const SettingsAdminArrow = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [showadminarrowelement, setShowadmonarrowelement] = useState("none");
  const arrowData = useSelector((state) => state.showsidearrow.showAdminData);
  const { tableData } = useSelector((state) => state.admin);
 

  const RemoveUserHandler = () => {   
    if (!arrowData && arrowData.length === 0) {
      showInfo("select at least 1 user", toast);
      return false;
    }
    let updatedData = tableData?.data?.filter((item) => !arrowData?.includes(item.id));

    dispatch(deleteAdminAction({ ID: arrowData })).then((response) => {
      console.log(response);
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload, toast);
        dispatch(updateTableData({ ...tableData, data: updatedData }));
        dispatch(setCheckBoxSelectedProduct(null));
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
            label="Delete"
            className="p-button-danger"
            id="user_remove"
            onClick={RemoveUserHandler}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(SettingsAdminArrow);
