

//FOR CHECKBOX CLICK
document.querySelectorAll("[data-pc-section=checkbox]").forEach((el, i) => {
    console.log(el.getAttribute("aria-checked"));
    let userSelected = el.getAttribute("aria-checked");

    if (userSelected) {
        selectedUser += 1;
    }
});


<input value={message || ''} onChange={(e) => setMessage(e.target.value)} />


// how to use fontawesome
//npm install @fortawesome/fontawesome-free (install this)
//import '@fortawesome/fontawesome-free/css/all.min.css'(import this in index.js file)
//<i className="fas fa-random"></i>


// for babel issue run this command
//npm install --save-dev @babel/plugin-proposal-private-property-in-object
//https://www.geeksforgeeks.org/implementation-of-dark-mode-in-react-using-redux-toolkit/?ref=ml_lbp
//https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
//https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
//https://medium.com/@hpark0114/react-outlet-params-5da45901fc45
//https://dev.to/collins87mbathi/reactjs-protected-route-m3j

//https://www.codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer


//npm install redux-persist


//request_for_login_otp

// cors: {
//     origin: /^(https?|http):\/\/([\da-z-]+\.)?localhost(:\d{2,5})?$/,
//     credentials: true,
//   },


// {
//     "name" : "Sweta",
//     "email": "sweta@yopmail.com",
//     "emailConfirm": "sweta@yopmail.com",
//     "access": "db_app,scraper_app" 
// }


//{moment(rowData?.event?.event_time, ["YYYY-MM-DD"]).format("MM")}
//{moment(rowData?.time, ["YYYY-MM-DD"]).format("MMM Do, YYYY HH:mm:ss")}
//moment(rowData?.event?.event_time,["YYYY-MM-DD"]).format("DD/MM/YY hh:mm")



// useMemo(() => {
//     let transformedValues = [];
//     formData.newArray?.forEach((value, index) => {
//       if (value?.length > 1) {
//         value[1]?.forEach((value1, index1) => {
//           let v = value[0] + '->' + value1;
//           transformedValues.push({
//             name: v,
//             code: value1
//           });
//         });
//       } else {
//         transformedValues.push({
//           name: value[0],
//           code: value[0]
//         });
//       }
//     });
//     landingPageRef.current = transformedValues;
//   }, [formData.newArray]);




// const updateValue = (e) => {
//     setSelectedCountry(e.value);
//     dispatch(landingPageUpdate({ defaultPage: e?.value?.code })).then(
//         (response) => {
//             if (response.meta.requestStatus === "fulfilled") {
//                 showSuccess(response?.payload?.message, toast);
//             }

//             if (response.meta.requestStatus === "rejected") {
//                 showError(response?.payload?.message, toast);
//             }
//         }
//     );
// };

///error i got 

// Assignments to the 'optionsCountry' variable from inside React Hook useMemo will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useMemo  react-hooks/exhaustive-deps
// Line 112:20:  Assignments to the 'optionsState' variable from inside React Hook useMemo will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useMemo    react-hooks/exhaustive-deps
// Line 119:18:  Assignments to the 'optionsVenue' variable from inside React Hook useMemo will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useMemo    react-hooks/exhaustive-deps
// Line 127:19:  Assignments to the 'optionsEvent' variable from inside React Hook useMemo will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useMemo    react-hooks/exhaustive-deps
// Line 146:6:   React Hook useEffect has missing dependencies: 'inputValues' and 'onfilter'. Either include them or remove the dependency array. If 'onfilter' changes too often, find the parent component that defines it and wrap that definition in useCallback    


//  React Hook useEffect has missing dependencies: 'filterHandle' and 'formValues'. Either include them or remove the dependency array. If 'filterHandle' changes 
// too often, find the parent component that defines it and wrap that definition in useCallback   


// const handleUnlinkedCheckBox = (e, position) => {
//     console.log(checkedValue, "checkBoxRef single");
//     const { value, checked } = e.target;


//     const updatedCheckedState = [...checkedState];
//     updatedCheckedState[position] = e.target.checked;
//     setCheckedState(updatedCheckedState);

//     console.log(value,'value')
//     // const data = checkBoxRef.current.map((item, index) =>
//     //     item.checked === true ? item.id : ''
//     // );

//     // console.log(data,'updatedCheckedState1')
//     // setCheckedState(updatedCheckedState);
//     // // setCheckedValue(updatedCheckedState);
//     // console.log(checkBoxRef.current ,'update value' , updatedCheckedState);
    
//     // let data = checkBoxRef.current
//     //   .filter((item1) =>console.log(item1) )//item.checked !== false
//     //   // .map((item) => item.id);
//     // console.log(data, "datatttt");
//     // // if (checked === true) {
//     // setSingleCheckboxChecked(data);
//   };


//let data = checkBoxRef.current.filter((item) => item.checked !== false).map((item) => item.id);

// const updatedCheckedState = checkBoxRef.current.map((item, index) =>
//   index === position ? !item.checked : item.checked
// );



// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { showError, showInfo } from "../utilities/toast_message";
// import { mergeEvent } from "../../store/reducer/Home/homeSlice";
// import Swal from "sweetalert2";
// import ReactDOMServer from 'react-dom/server';
// import { v4 as uuidv4 } from "uuid";


// const HomePageArrowComponent = () => {
//   const toast = useRef(null);
//   const inputRef = useRef(null);
//   const [keepEvent, setKeepEvent] = useState(null);
//   const dispatch = useDispatch();
//   const [showaction, setShowaction] = useState("none");
//   const arrowData = useSelector((state) => state.showsidearrow.Data);

//  // console.log(arrowData,'arrowDataarrowData')

//   const handleChange = (e)=>{
   
//     //console.log(e.target.value, 'valueeeeeeee')
//     console.log(e,'changeeee')
//   }

//   useEffect(()=>{
//    console.log( document.querySelector('[name="events_to_merge"]'))
//   })

//   const PopUpComponent = () => {
//     return (
//       <>
//         <div id="merge_events_popup" key={uuidv4()}>
//           {/* <b>Please select an event to replace with :</b> */}
//           <br />
//           {arrowData?.map((item, index) => {
//             console.log(item, "item");
//             return (
//               <div key={index}>
//                 <input
//                    ref= {inputRef}
//                   type="radio"
//                   name="events_to_merge"
//                   value={item?.id}
//                   checked={keepEvent === item?.id}
//                   key={item?.id}
//                   onChange={(e)=>window.handleChangeEvent(e)}
//                 />
//                 {item?.name}
//                 <br />
//               </div>
//             );
//           })}
//         </div>
//       </>
//     );
//   };
//   const handleChangeEvent = (e)=>{
//     console.log(e.target.value,'chjjjj')
//     setKeepEvent(e.target.value)
//   }

//   const mergerEventHandler = async () => {
   
//     if (arrowData.length <= 1) {
//       showError("Select at least 2 event to merge", toast);
//     } else {
//      //const popupHtml = ReactDOMServer.renderToString(<PopUpComponent />);
//       let htmlContent = arrowData
//         ?.map((item, index) => {
//           return `<label><input type="radio" name="events_to_merge" value="${item.id}" onChange="window.handleChangeEvent(event)"/> ${item?.name}</label>`;
//         })
//         .join("<br/>");
//       Swal.fire({
//         title: "<b>Please select an event to replace with :</b>",
//         html: htmlContent,
//         confirmButtonText: "Merge",
//         showCancelButton: true,
//         cancelButtonColor: "#d33",
//         didOpen: () => {
//           window.handleChangeEvent = handleChangeEvent
//         },
//         preConfirm:()=>{
//           return keepEvent;
//         }
//       }).then((result) => {
//         if (result.isConfirmed) {
//           console.log(result, "keepevent");
//           // dispatch(mergeEvent({ data: arrowData })).then((res) => {
//           //   if (res.meta.requestStatus === "fulfilled") {
//           //     showInfo(res.payload.data.message, toast);
//           //   } else if (res.meta.requestStatus === "rejected") {
//           //     showError(res.payload.data, toast);
//           //   }
//           // });
//         }
//       });
//     }
//   };
//   return (
//     <>
//       <Toast ref={toast} />
//       <div
//         id="event_actions"
//         className="hide"
//         onMouseEnter={() => setShowaction("block")}
//         onMouseLeave={() => setShowaction("none")}
//       >
//         <div id="arrow">
//           <KeyboardArrowLeftOutlinedIcon />
//         </div>
//         <div id="action_buttons" style={{ display: showaction }}>
//           <Button
//             label="Merge Event"
//             className="p-button-primary"
//             id="merge_event"
//             onClick={() => {
//               mergerEventHandler();
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default React.memo(HomePageArrowComponent);



//Parsing error: This experimental syntax requires enabling the parser plugin: "optionalChainingAssign".
//npm install --save-dev @babel/plugin-syntax-jsx



///link unlink


const handleUnlinkedCard = () => {
    console.log("handle unlinked card");
    // let updatedData = Card_List.unLinked.filter((item, index) => {
    //   console.log(item, "item");
    //   return !linkedId?.includes(item.id);
    // });

    // let updatedData1 = Card_List.unLinked.filter((item, index) => {
    //   console.log(item, "item");
    //   return linkedId?.includes(item.id);
    // });
    //Card_List.linked.push(updatedData);
    //Card_List.unLinked = updatedData;
    // let updatedData1 = Card_List?.unLinked?.filter((item, index) => {
    //   console.log(item, "item 2", {...Card_List.linked});
    //   if (linkedId?.includes(item.id)) {

    //     return({...Card_List.linked});
    //   }else{
    //     return({...Card_List.linked});
    //   }
    // });
//correct way
    let updatedUnlinkedData = Card_List.unLinked.filter((item) => !linkedId.includes(item.id));
    let updatedLinkedData = [ ...Card_List.linked,...Card_List.unLinked.filter((item) => linkedId.includes(item.id))];

    let updatedList = {
      ...Card_List,
      unLinked: updatedUnlinkedData,
      linked: updatedLinkedData,
    };

    //let linked = [...Card_List.linked,updatedData1]
    // console.log(updatedData ,'updatedData' , updatedData1 ,'linked', )
    // let list  = {...Card_List,unLinked:updatedData , linked: updatedData1}

    // console.log(list ,'list list list list')
    dispatch(
      addRemoveCardGroupManageCard({
        actionType: "add",
        group: groupId,
        linked: "",
        unLinked: linkedId,
      })
    ).then((response) => {
      console.log(response, "response unlink");
     
      if(response?.meta?.requestStatus === "fulfilled"){
        dispatch(setDataListAfterUpdate(updatedList));
      }
      if(response?.meta?.requestStatus === "rejected"){

      }
    });
  };


  ///rejectWithValue


  // if (error.response && error.response.data.message) {
  //   return rejectWithValue(error.response.data.message);
  // } else {
  //   return rejectWithValue(error.message);
  // }



  

  ///mysql -u root -p local_7_7_0 < D:\xammp7.2.5\mysql\databaseapp_database.sql



  // //let date = moment(rowData?.first, "YYYY-MM-DDTHH:mm:ss").format("DD-MM-YY HH:mm:ss");

  // export const getDate = (inputDate)=>{
  //   const date = new Date(inputDate);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  // }
  


  //https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/
  // let a = checkBoxRef.current
  // .filter((item) => console.log(item ,'fiiii')) // Assuming each item has a 'checked' property
  // .map((item) => item.id);
  // console.log(a,'kkkkkkkk')
  //     setSingleCheckboxChecked(
  //       checkBoxRef.current
  //         .filter((item) => item.checked === true) // Assuming each item has a 'checked' property
  //         .map((item) => item.id)
  //     );


  //     const handleAllCheckboxCheck = (e) => {
  //       let updatedCheckedState;
  //       setMasterCheck(e.target.checked);
  //       if (e.target.checked === true) {
  //         updatedCheckedState = checkedState.map((item, index) => true);
  //       } else {
  //         updatedCheckedState = checkedState.map((item, index) => false);
  //       }
    
  //       setCheckedState(updatedCheckedState);
  //       if (e.target.checked === true) {
  //         // setSingleCheckboxChecked(
  //         //   checkBoxRef.current.map((item, index) => item?.id)
  //         // );
  //         let value = checkBoxRef.current.map((item, index) => item?.id);    
  //         setSingleCheckboxChecked([...new Set(value)]);
  //         //setSingleCheckboxChecked(checkBoxRef.current.map((item, index) => item?.id));
  //       }
    
  //       if (e.target.checked === false) {
  //         setSingleCheckboxChecked([]);
  //       }
  //     };    



  //

  arrowData?.forEach((item) => {
    if (
      item.id !== e.target.value &&
      !notKeep.some((notKeepItem) => notKeepItem === item.id)
    ) {
      array.push(item.id);
    }
  });



  const handleChangeEvent = (e) => {
    // setKeepEvent(e.target.value);
    // let array = [];
    let valueID = e.target.value
    // arrowData?.forEach((item, index) => {
    //   if (item.id !== e.target.value) {
    //     if (!notKeep.some((item) => item === e.target.value)) {
    //       array.push(item.id);
    //     }
    //   }
    // });
    // arrowData?.forEach((item) => {
    //   if (item.id !== e.target.value) {
    //     if (!notKeep.some((notKeepItem) => notKeepItem === e.target.value)) {
    //       array.push(item.id);
    //     }
    //   }
    // });
  

    //let updatedData = notKeep?.filter((item) => !notKeep?.includes(e.target.value));
    // Check if the item id already exists in notKeep array
    // if (!notKeep.some((item) => item === e.target.value)) {
    //   setNotKeep((prev) => [...prev, ...array]);
    // }
    //setNotKeep((prev) => [...prev, ...updatedData]);



    //let updatedData = notKeep?.filter((item) => item !== e.target.value);

    
    // arrowData?.forEach((item) => {
    //   if (item.id !== e.target.value && !notKeep.some((notKeepItem) => notKeepItem === item.id)) {
    //     array.push(item.id);
    //   }
    // });
    // console.log(array,'array', notKeep)
    // //let updatedData = notKeep?.filter((item) => item !== e.target.value);
    // //console.log(updatedData,'updatedData')
    // setNotKeep((prev) => [  ...array]);
  };



  let updatedData = tableData?.encodedEvent.filter(
    (item, i) => !notKeeep.includes(item.id)
  );
  let list = { ...tableData, encodedEvent: updatedData };
  console.log(updatedData, "updatedData");
  dispatch(setTableSelectedData(list));








    // useEffect(() => {
  //   if (isConfirmed) {              
  //     dispatch(
  //       mergeEvent({ keepEventValue: keepEvent, notKeepEventValues: notKeep })
  //     ).then((res) => {
  //       if (res.meta.requestStatus === "fulfilled") {
  //         showInfo(res.payload.data.message, toast);
  //         let updatedData = tableData?.encodedEvent.filter((item,i)=> !notKeep.includes(item.id))
  //         let list ={...tableData, encodedEvent:updatedData}
  //         console.log(updatedData,'updatedData', notKeep)
  //         dispatch(setTableSelectedData(list)); 
  //         setNotKeep([]);
  //         setKeepEvent([])
  //       } else if (res.meta.requestStatus === "rejected") {
  //         showError(res.payload.data, toast);
  //       }
  //     });
  //   }
  // }, [isConfirmed, notKeep,keepEvent]);



     // let updatedData = data?.map((item) => {
    //   if (arrowData?.some((da) => item.id === da)) {
    //     return {
    //       ...item,
    //       status: 0,
    //     };
    //   }
    //   return item;
    // });
    // dispatch(setSelectedProduct({ data: updatedData }));



      // formData.newArray?.forEach((value, index) => {
    //   if (value?.length > 1) {
    //     value[1]?.forEach((value1, index1) => {
    //       let v = value[0] + '->' + value1;
    //       transformedValues.push({
    //         name: v,
    //         code: value1
    //       });
    //     });
    //   } else {
    //     transformedValues.push({
    //       name: value[0],
    //       code: value[0]
    //     });
    //   }
    // });


    //https://linangdata.com/snippets-of-javascript/format-date/


    //https://medium.com/kaliop/react-js-reduce-your-javascript-bundle-with-code-splitting-f2d24abd42b8


    //https://scientyficworld.org/how-to-use-query-parameters-with-react-router/



    const handleFilter = (inputValues) => {

      dispatch(
        setFilters({    
          keyword: inputValues.keyword,
          orderID: inputValues.orderID,
          events: inputValues.events,
          country: inputValues.country,
          state: inputValues.state,
          city: inputValues.city,
          venue: inputValues.venue,
          dateEventFrom: inputValues.dateEventFrom,
          dateEventTo: inputValues.dateEventTo,
          datePurchaseFrom: inputValues.datePurchaseFrom,
          datePurchaseTo: inputValues.datePurchaseTo,
        })
      );
    };
  //The 'handleFilter' function makes the dependencies of useEffect Hook (at line 128) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'handleFilter' in its own useCallback() Hook


  useEffect(() => {
    if (flag) {
      handleFilter(inputValues);
      setFlag(false); // Reset flag after filtering
    }
  }, [inputValues, flag, handleFilter]);/// Now handleFilter is stable



 // Wrap the handleFilter function in a useCallback hook to memoize it, ensuring that it only changes when its dependencies change.


//  import React, { useEffect, useState, useCallback } from "react";
// import { debounce } from "lodash";

// function AutoLayoutExample({ onfilter, refreshHandler }) {
//     const [inputValues, setInputValues] = useState({
//         // your initial state
//     });

//     const handleFilter = useCallback((values) => {
//         // Your filter logic
//         console.log("Filtering with values:", values);
//     }, []);

//     // Create a debounced version of handleFilter
//     const debouncedHandleFilter = useCallback(debounce(handleFilter, 300), [handleFilter]);

//     useEffect(() => {
//         debouncedHandleFilter(inputValues);
//     }, [inputValues, debouncedHandleFilter]);

//     // Your component JSX
// }


// Explanation
// Debounce Function: The debounce function creates a new function that delays the execution of the original function (handleFilter) until after a specified delay (300 milliseconds in this case) has passed since the last time the debounced function was invoked.
// useCallback: The useCallback hook is used to memoize the handleFilter and debouncedHandleFilter functions, ensuring that they are not recreated on every render unless their dependencies change.
// Effect Hook: The useEffect hook listens for changes in inputValues and calls the debounced version of handleFilter. This means that handleFilter will only be called after the user has stopped typing for 300 milliseconds.
//custom debounce function
// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//       if (timeoutId) {
//           clearTimeout(timeoutId);
//       }
//       timeoutId = setTimeout(() => {
//           func(...args);
//       }, delay);
//   };
// };

// Debouncing is a technique used to limit the rate at which a function is executed. In the context of a React application, debouncing is often used to delay the execution of a function until after a specified period of inactivity. This is particularly useful for scenarios like filtering or searching, where you want to wait until the user has stopped typing before making an API call or updating the state.

// To implement debouncing in your useEffect for the handleFilter function, you can use a custom debounce function or a library like lodash. Below, I'll show you how to implement debouncing using both methods.

//https://www.freecodecamp.org/news/difference-between-usememo-and-usecallback-hooks/





import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showInfo } from "../utilities/toast_message";
import { showArrow } from "../../store/reducer/ArrowButton/arrowButtonSlice";
import { mergeEvent , setTableSelectedData} from "../../store/reducer/Home/homeSlice";
import Swal from "sweetalert2";


// const HomePageArrowComponent = () => {
//   const toast = useRef(null);
//   const [keepEvent, setKeepEvent] = useState(null);
//   const dispatch = useDispatch();
//   const [showaction, setShowaction] = useState("none");
//   const arrowData = useSelector((state) => state.showsidearrow.Data);
//   const tableData = useSelector((state) => state.home.tableData);


//handle merge event here
//   const mergerEventHandler = async () => {
//     let valueID;

//     const handleChangeEvent = (e) => {
//      // setKeepEvent(e.target.value)
//       valueID = e.target.value
//     }

//     if (arrowData.length <= 1) {
//       showError("Select at least 2 event to merge", toast);
//     } else {
//       let htmlContent = `<div id='merge-event-popup-form'>`;
//       htmlContent += arrowData
//         ?.map((item, index) => {
//           return `<label>
//                       <input type="radio" name="events_to_merge" value="${item.id}" onChange="window.handleChangeEvent(event)"/> ${item?.name}
//                  </label>`;
//         })
//         .join("");
//       htmlContent += `</div>`;
//       Swal.fire({
//         title:"<b className='text-merge-event'>Please select an event to replace with :</b>",
//         html: htmlContent,
//         confirmButtonText: "Merge",
//         showCancelButton: true,
//         cancelButtonColor: "#d33",
//         didOpen: () => {
//           window.handleChangeEvent = handleChangeEvent;
//         },
//         preConfirm: () => {
//           return {
//             valueID
//           };
//         },
//       }).then((result) => {
//         if (result.isConfirmed) { 
//           const keep = result.value.valueID;
//           const notKeeep =  arrowData?.filter((item) => item.id !== keep).map((item) => item.id);
                            
//           dispatch(
//             mergeEvent({
//               keepEventValue: keep,
//               notKeepEventValues: notKeeep,
//             })
//           ).then((res) => {
//             if (res.meta.requestStatus === "fulfilled") {

//              showInfo(res.payload.data.message, toast);

//               let updatedData = tableData?.encodedEvent.filter(
//                 (item, i) => !notKeeep.includes(item.id)
//               );
//               let list = { ...tableData, encodedEvent: updatedData };

//               dispatch(setTableSelectedData(list));

//               // setTimeout(() => {
//               //   dispatch(showArrow({ url: "/api/home", length: "", users: [], checked: false }));
//               // }, 100);
              
//             } else if (res.meta.requestStatus === "rejected") {
//               showError(res.payload.data, toast);
//             }
//           });
//         }else{
//           console.log('canceled')
//         }
//       });
//     }
//   };
//   return (
//     <>
//       <Toast ref={toast} />
//       <div
//         id="event_actions"
//         className="hide"
//         onMouseEnter={() => setShowaction("block")}
//         onMouseLeave={() => setShowaction("none")}
//       >
//         <div id="arrow">
//           <KeyboardArrowLeftOutlinedIcon />
//         </div>
//         <div id="action_buttons" style={{ display: showaction }}>
//           <Button
//             label="Merge Event"
//             className="p-button-primary"
//             id="merge_event"
//             onClick={() => {
//               mergerEventHandler();
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default React.memo(HomePageArrowComponent);




// import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Stack from "react-bootstrap/Stack";
// import Button from "react-bootstrap/Button";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// //import ArchiveEventForm from "../../form/archive_event";
// import QueueJobsUpdatecardsComponent from "../../form/QueueJobs/queuejobs_updatecard";
// import Table from "../../table/table";
// import Swal from "sweetalert2";
// import { getQueueJobsResetPasswordFormData } from "../../../store/reducer/QueueJobs/resetpasswordSlice";
// import {
//   getUpdateCardsTableData,
//   deleteUpdateCardData,
//   updateCardStatus,
// } from "../../../store/reducer/QueueJobs/updatecardsSlice";
// import Switch from "@mui/material/Switch";
// import { Toast } from "primereact/toast";
// import CloseIcon from "@mui/icons-material/Close";
// import { showError, showSuccess } from "../../utilities/toast_message";
// import { marketPlaceFromID } from "../../../services/helper";

// function Queuejobs_updatecardComponent() {
//   const dispatch = useDispatch();
//   let toast = useRef(null);
//   const [users, setUsers] = useState([]);

//   let { update_cards_data } = useSelector(
//     (state) => state.queueJobsUpdateCards
//   );

//   let filter = useSelector(
//     (state) => state.queueJobsUpdateCards?.filters
//   );

//   useEffect(() => {
//     dispatch(getQueueJobsResetPasswordFormData());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getUpdateCardsTableData(filter));
//   }, [dispatch , filter]);

//   useEffect(() => {
//     console.log(update_cards_data, "updateCardData");
//     if (update_cards_data && update_cards_data.length > 0) {
//       setUsers(update_cards_data);
//     }else{
//       setUsers([]);
//     }
//   }, [update_cards_data]);

 

//   const handleChange = useCallback(
//     (rowData, e) => {
//       let id = rowData?.id;
//       setUsers((prevList) => {
//         const updatedUsers = prevList.map((user) => {
//           if (user.id === rowData.id) {
//             return { ...user, status: e.target.checked === true ? 0 : 4 };
//           }
//           return user;
//         });
//         console.log(updatedUsers, "updatedUsers");
//         return updatedUsers;
//       });

//       dispatch(updateCardStatus({ userID: id })).then((response) => {
//         if (response.meta.requestStatus === "rejected") {
//           showError(response?.payload?.message, toast);
//         }

//         if (response.meta.requestStatus === "fulfilled") {
//           showSuccess(response?.payload?.message, toast);
//         }
//       });
//     },
//     [dispatch,  setUsers]
//   );

//   const deleteUser = useCallback((rowData) => {
//     let id = rowData?.id;
//     Swal.fire({
//       //title: "Warning!",
//       //text: "Do you realy want to remove event: <b>"+`${rowData.event_name}` +"</b>",
//       html: `Do you really want to remove user: <b>${rowData?.userName}</b> `,
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Confirm",
//       customClass: {
//         confirmButton: 'confirm-button-class',
//         title: 'title-class',
//         icon: 'icon-class',
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setUsers((prevList) => {
//           const newList = prevList.filter((r) => r.id !== id);
//           return newList;
//         });
//         dispatch(deleteUpdateCardData({ userID: id })).then((response) => {
//           if (response.meta.requestStatus === "rejected") {
//             showError(response?.payload?.message, toast);
//           }

//           if (response.meta.requestStatus === "fulfilled") {
//             showSuccess(response?.payload?.message, toast);
//           }
//         });
//       } else {
//         console.error("Dispatch function is not defined.");
//       }
//     });
//   },[dispatch, setUsers]);

//   const columns = useMemo(
//     () => [
//       {
//         field: "sn",
//         header: "SN",
//         body: (rowData, rowIndex) => rowIndex.rowIndex + 1,
//       },
//       {
//         field: "market_place_id",
//         header: "Market Place",
//         body: (rowData) => {
//           let MP = marketPlaceFromID(rowData?.market_place_id || "");
//           return <>{MP}</>;
//         },
//       },
//       { field: "cardName", header: "Card Id" },
//       { field: "nameOnCard", header: "Name on Card" },
//       { field: "userName", header: "Email" },
//       {
//         field: "status",
//         header: "Status",
//         body: (rowData, rowIndex) => (
//           <div>
//             <FormGroup>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={Boolean([0, 1, 3].indexOf(rowData?.status) !== -1)}
//                     onChange={(event) => handleChange(rowData, event)}
//                   />
//                 }
//               />
//             </FormGroup>
//           </div>
//         ),
//       },
//       {
//         field: "Ticket Location",
//         header: "Card Status",
//         body: (rowData) => {
//           if (rowData?.status === 0) {
//             return <Button variant="info">Pending</Button>;
//           } else if (rowData?.status === 1) {
//             return <Button variant="success">Success</Button>;
//           } else if (rowData?.status === 2) {
//             return <Button variant="warning">Fail</Button>;
//           } else if (rowData?.status === 3) {
//             return <Button variant="primary">In Process</Button>;
//           } else {
//             return <Button variant="danger">Reject</Button>;
//           }
//         },
//       },
//       {
//         field: "action",
//         header: "Action",
//         body: (rowData) => {
//           return (
//             <span
//               className="error"
//               onClick={() => {
//                 deleteUser(rowData);
//               }}
//             >
//               <CloseIcon />
//             </span>
//           );
//         },
//       },
//     ],
//     [handleChange, deleteUser]
//   );

//   return (
//     <Stack gap={1} id="content">
//       <Toast ref={toast} />
//       <div className="p-1">
//         <QueueJobsUpdatecardsComponent />
//       </div>
//       <div className="p-2">
//         <Table data={users} columns={columns} />
//       </div>
//     </Stack>
//   );
// }
// export default Queuejobs_updatecardComponent;

Compose:
New Message
MinimizePop-outClose
