import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo } from "../utilities/toast_message";
import { showArrow } from "../../store/reducer/ArrowButton/arrowButtonSlice";
import { mergeEvent , setTableSelectedData} from "../../store/reducer/Home/homeSlice";
import Swal from "sweetalert2";


const HomePageArrowComponent = () => {
  const toast = useRef(null);
  const [keepEvent, setKeepEvent] = useState(null);
  const dispatch = useDispatch();
  const [showaction, setShowaction] = useState("none");
  const arrowData = useSelector((state) => state.showsidearrow.Data);
  const tableData = useSelector((state) => state.home.tableData);


//handle merge event here
  const mergerEventHandler = async () => {
    let valueID;

    const handleChangeEvent = (e) => {
     // setKeepEvent(e.target.value)
      valueID = e.target.value
    }

    if (arrowData.length <= 1) {
      showError("Select at least 2 event to merge", toast);
    } else {
      let htmlContent = `<div id='merge-event-popup-form'>`;
      htmlContent += arrowData
        ?.map((item, index) => {
          return `<label>
                      <input type="radio" name="events_to_merge" value="${item.id}" onChange="window.handleChangeEvent(event)"/> ${item?.name}
                 </label>`;
        })
        .join("");
      htmlContent += `</div>`;
      Swal.fire({
        title:"<b className='text-merge-event'>Please select an event to replace with :</b>",
        html: htmlContent,
        confirmButtonText: "Merge",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        didOpen: () => {
          window.handleChangeEvent = handleChangeEvent;
        },
        preConfirm: () => {
          return {
            valueID
          };
        },
      }).then((result) => {
        if (result.isConfirmed) { 
          const keep = result.value.valueID;
          const notKeeep =  arrowData?.filter((item) => item.id !== keep).map((item) => item.id);
                            
          dispatch(
            mergeEvent({
              keepEventValue: keep,
              notKeepEventValues: notKeeep,
            })
          ).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {

             showInfo(res.payload.data.message, toast);

              let updatedData = tableData?.encodedEvent.filter(
                (item, i) => !notKeeep.includes(item.id)
              );
              let list = { ...tableData, encodedEvent: updatedData };

              dispatch(setTableSelectedData(list));

              // setTimeout(() => {
              //   dispatch(showArrow({ url: "/api/home", length: "", users: [], checked: false }));
              // }, 100);
              
            } else if (res.meta.requestStatus === "rejected") {
              showError(res.payload.data, toast);
            }
          });
        }else{
          console.log('canceled')
        }
      });
    }
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
            label="Merge Event"
            className="p-button-primary"
            id="merge_event"
            onClick={() => {
              mergerEventHandler();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(HomePageArrowComponent);
