import React, { useEffect, useState ,useMemo , useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useSelector, useDispatch } from "react-redux";
import Stack from "react-bootstrap/Stack";
import { Dropdown } from "primereact/dropdown";
import CloseIcon from "@mui/icons-material/Close";
import { userCapacityModalAction, userCapacityFormAction } from "../../../store/reducer/Home/homemodalSlice";


 function UserPurchasedCapacityModal({ show, handleClose }){
   const dispatch = useDispatch();
   const [usedData, setUsedData] = useState([]);
   const [unUsed, setUnUsed] = useState([]);
   const [event, setEvent] = useState([]);
   const { id, name, time, eventUrl } = useSelector(
     (state) => state.modal.eventDetali
   );
   const { user_capacity_form_data, user_capacity_modal_table } = useSelector(
     (state) => state.modal
   );
   const { eventName, used, unusedUser } = user_capacity_modal_table || [];
   const formRef = useRef([]);
  
 

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(()=>{   
    if (show === true) {
      dispatch(userCapacityFormAction({ eventID: id })).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          
        }
      });
    }
  },[dispatch,id,show])


  useEffect(()=>{
    setUsedData(used);
    setUnUsed(unusedUser||[]);
    setEvent(eventName);
  },[eventName, used, unusedUser])

  useMemo(()=>{
    formRef.current= user_capacity_form_data?.options?.map((value)=>{
      return{
        code:value?.id,
        name:value?.name
      }
    })

    setSelectedCountry({
      code: user_capacity_form_data?.options?.[0]?.id,
      name: user_capacity_form_data?.options?.[0]?.name,
    });
  },[user_capacity_form_data])


  useEffect(()=>{
    if (show === true && selectedCountry) {
      dispatch(
        userCapacityModalAction({
          marketPlaceID: selectedCountry?.code,
          eventID: id,
        })
      ).then((response) => {});
    }
  },[selectedCountry])
 
  const header1 = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Available</span>
    </div>
  );

  const header2 = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Used</span>
    </div>
  );

 const totalVisible = () => {
   let total = unUsed?.reduce((accumulator, item) => {
     return accumulator + item?.total_count;
   }, 0);
   return total;
 };

 const totalUsed = () => { 
    let total = usedData?.reduce((accumulator, item) => {
      return accumulator + item.total_count;
   }, 0);
   return total
 };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='cstm-capacity-outer custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontSize: "18px" }}>
              {" "}
              Users purchase capacity{" "}
              <span style={{ color: " #F80" }}>
                {event ?? ""} @ {time ?? ""}
              </span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={1}>
            <div className="p-1">
              <Dropdown
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.value)}
                options={formRef.current}
                optionLabel="name"
                placeholder="Select a Country"
                filter
                className="w-full md:w-14rem"
                appendTo={"self"}
              />
            </div>
            <div className="p-1">
              <div className="card">
                <DataTable
                  value={unUsed}
                  header={header1}
                  tableStyle={{ minWidth: "20rem" }}
                  size={"small"}
                >
                  <Column
                    field="total"
                    header="Packs"
                    footer={unUsed?.length > 0 ? "Total" : ""}
                  ></Column>
                  <Column
                    field="total_count"
                    header="Number of Orders"
                    footer={unUsed?.length > 0 ? totalVisible() : ""}
                  ></Column>
                </DataTable>
              </div>
            </div>
            <div className="p-1">
              <div className="card">
                <DataTable
                  value={usedData}
                  header={header2}
                  tableStyle={{ minWidth: "20rem" }}
                  size={"small"}
                >
                  <Column
                    field="total"
                    header="Packs"
                    footer={usedData?.length > 0 ? "Total" : ""}
                  ></Column>
                  <Column
                    field="total_count"
                    header="Number of Orders"           
                    footer={usedData?.length > 0 ? totalUsed() : ""}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button
            variant="secondary"
            className="closeAdminButton"
            onClick={handleClose}
          >
            <CloseIcon />
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default React.memo(UserPurchasedCapacityModal);