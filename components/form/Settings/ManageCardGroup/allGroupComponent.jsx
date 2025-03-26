import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import Swal from "sweetalert2";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { ManageCardGroupModal } from "../../../modal/settings/manageCardGroup/manageCardGroupModal";
import {
  getManageCardGroupingFormData,
  getManageCardList,
  setGroupName,
  removeGroupManageCard,
  setFormDataAfterUpdate,
  ShowModal,
} from "../../../../store/reducer/Settings/ManageCardGroup/manageCardGroupSlice";

const AllGroupComponent = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { Form_Data, linkedId } = useSelector((state) => state.manageCardGroup);
  const allGroupsRef = useRef(null);
  const marketPlaceRef = useRef(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [disabledInputValue, setDisabledInputValue] = useState("");
  const [disabledInputName, setDisabledInputName] = useState("");
  const [makeRemoveEnable, setMakeRemoveEnable] = useState(true);
 
  //console.log(Form_Data, "datatatattat");
  useEffect(() => {
    dispatch(getManageCardGroupingFormData());
  }, [dispatch]);

  useMemo(() => {
    let allGroup = Form_Data?.cardGroups;
    let MP = Form_Data?.marketPlace;

    marketPlaceRef.current = MP?.map((value, index) => {
      return {
        name: value?.name,
        code: value?.id,
      };
    });
    setSelectedMarketplace(marketPlaceRef.current?.[0]);
    const updatedGroup = allGroup?.map((value, index) => {
      return {
        name: value?.name,
        code: value?.id,
      };
    });

    setSelectedGroup(updatedGroup?.[0]);
    if (updatedGroup) {
      allGroupsRef.current = [
        { name: "Add New Group Name", code: "add_new_group_name" },
        ...updatedGroup,
      ];
    } else {
      allGroupsRef.current = [
        { name: "Add New Group Name", code: "add_new_group_name" },
      ];
    }
  }, [Form_Data, allGroupsRef]);

  useEffect(() => {
    dispatch(setGroupName({ groupName: selectedGroup }));
    if (isFilter) {
      handleFilter();
    }
  }, [selectedGroup, isFilter, selectedGroup, selectedMarketplace, enabled]);





  const handleFilter = (e) => {
    const selectedMarketplaceValue = selectedMarketplace?.code;
    const selectedGroupValue = selectedGroup?.code;
    const selectedGroupName = selectedGroup?.name;

    //
    //diasbled or remove group handling
    if (selectedGroupValue === "add_new_group_name") {
      setMakeRemoveEnable(true);
      setIsDisabled(true);
      dispatch(ShowModal());
      //here show pop to add group
    } else if (selectedGroupValue === "GqhosqCo") {
      setDisabledInputValue("");
      setDisabledInputName("")
      setIsDisabled(true);
      setMakeRemoveEnable(true);
    } else {
      setDisabledInputValue(selectedGroupValue);
      setDisabledInputName(selectedGroupName);
      setIsDisabled(false);
      setMakeRemoveEnable(false);
    }

    //get card list
    dispatch(
      getManageCardList({
        marketplace: selectedMarketplaceValue,
        groupId: selectedGroupValue,
        enabledUser: enabled,
      })
    );
  };

  //handle remove group
  const handleRemoveGroup = () => {
    Swal.fire({
      html: `Do you really want to remove group: <b>${disabledInputName}</b> `,
      // icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(disabledInputValue,'disabledInputValue')
        dispatch(removeGroupManageCard({ groupID: disabledInputValue })).then(
          (response) => {
            if (response?.meta?.requestStatus === "fulfilled") {
              showSuccess(response?.payload.message, toast);
              // let updatedGroup = Form_Data.cardGroups.filter((item) => {
              //   console.log(disabledInputValue,'disabledInputValue 2' , item.code !== disabledInputValue);
              //   return item.code !== String(disabledInputValue);
              // });


              let updatedGroup = Form_Data.cardGroups.filter(
                function(item) {
                  return item.id !== disabledInputValue;
                }
              );
              let updateFormData = { ...Form_Data, cardGroups: updatedGroup };
              
              dispatch(setFormDataAfterUpdate({ updateFormData }))
              setTimeout(()=>{
                setDisabledInputValue("");
              },100)
             
              
            }
            if (response?.meta?.requestStatus === "rejected") {
              showError(response?.payload, toast);
            }
          }
        );
      } else {
        console.error("Dispatch function is not defined.");
        
      }
    });
   
  };

  return (
    <>
      <Col xs={3} className="">
        <Toast ref={toast} />{" "}
        <ListGroup>
          <ListGroup.Item>
            <Form>
              <div key="default-checkbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="Only enabled users"
                  name="enabled"
                  checked={enabled === true}
                  value={enabled}
                  onChange={(e) => {
                    setIsFilter(true);
                    setEnabled(e.target.checked);
                  }}
                />
              </div>
            </Form>
          </ListGroup.Item>

          <ListGroup.Item>
            <div
              className="card flex justify-content-start"
              style={{ marginBottom: "8px" }}
            >
              <Dropdown
                value={selectedMarketplace}
                onChange={(e) => {
                  setSelectedMarketplace(e.target.value);
                  setIsFilter(true);
                }}
                options={marketPlaceRef.current || []}
                optionLabel="name"
                placeholder="Select Market Place"
                filter
                className="w-full md:w-14rem"
              />
            </div>
            <div
              className="card flex justify-content-start"
              style={{ marginBottom: "8px" }}
            >
              <Dropdown
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setIsFilter(true);
                }}
                options={allGroupsRef.current}
                optionLabel="name"
                placeholder="-All groups-"
                filter
                className="w-full md:w-14rem"
              />
            </div>
            <div
              style={{ marginBottom: "8px" }}
              className="card flex justify-content-start"
            >
              <Form.Control
                type="text"
                placeholder={disabledInputName || ""}
                aria-label="Disabled input example"
                disabled={isDisabled}
                readOnly
                value={disabledInputName}
                //value={disabledInputValue}
                id="disabledInput"
              />
            </div>
            <div className="card flex justify-content-start">
              <Button
                variant="danger"
                onClick={handleRemoveGroup}
                disabled={makeRemoveEnable}
              >
                {" "}
                Remove Group
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>

     
    </>
  );
};

export default AllGroupComponent;
