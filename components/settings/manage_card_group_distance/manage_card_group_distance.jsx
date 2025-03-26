import React, { useState, useEffect, useMemo, useRef } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDistanceGroup,
  showModal,
  closeModal,
  selectOption
} from "../../../store/reducer/Settings/ManageCardGroupDistance/manage_card_group_distance";
import MarketPlaceComponent from "./market_place_dropdown";
import ManageCardGroupDistance from "../../modal/settings/manageCardGroupDistance/manageCardGroupDistance";

const Manage_card_group_distance = () => {
  const dispatch = useDispatch();
  const [Range, setRange] = useState([0, 0]);
  const [showGroupName, setShowGroupName]= useState('');
  //const [selectedOption, setSelectedOption] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const { show, groups ,MP ,selectedOption } = useSelector(
    (state) => state.manageCardGroupDistance
  );
  const groupRef = useRef();




  useMemo(() => {
    const updatedGroup = groups?.list?.map((value, index) => {
      console.log(groups?.list,'groups?.selected')
     
     // if (groups?.selected?.some((item) => item.group_id === value?.id)) {
        // console.log(value, "value if"  ,'item');
        // setSelectedOption({
        //   name: "Remove Grouping",
        //   code: 0,
        // });
     // }
    
      return {
        name: value?.name,
        code: value?.id,
        distanceRange: {
          start: value?.distance_start,
          end: value?.distance_end,
        },
      };
    });


    // setSelectedOption({
    //   name: "Remove Grouping",
    //   code: 0,
    // });

    dispatch(
      selectOption({
        name: "Remove Grouping",
        code: 0,
      })
    );
    console.log(updatedGroup, "updatedGroup");
    if (updatedGroup?.length > 0) {
      groupRef.current = [
        { name: "Add New Group Name", code: "add_new_group_name" },
        {
          name: "Remove Grouping",
          code: 0,
        },
        ...updatedGroup,
      ];
    } else {
      groupRef.current = [
        { name: "Add New Group Name", code: "add_new_group_name" },
        {
          name: "Remove Grouping",
          code: 0,
        },
      ];
    }
  }, [groups]);

  







  // handle on change event
  const handleOptionChange = (event) => {
   // setSelectedOption(event.target.value);
    dispatch(selectOption(event.target.value))
    console.log(event.target.value, "(event.target.value");

    if (event.target.value.code === "add_new_group_name") {
      setIsEnabled(true)
      dispatch(showModal());
      setShowGroupName('');
      setRange([0,0]);
    }else if(event.target.value.code === 0){
      setShowGroupName('');
      setIsEnabled(false)
      setRange([0,0]);
    }else{
      setIsEnabled(false)
      setShowGroupName(event.target.value.name)
      setRange([parseFloat(event.target.value?.distanceRange?.start), parseFloat(event.target.value?.distanceRange?.end)]);
    }
  };






  //update manage group distance

  const handleUpdate = ()=>{
    console.log("update", {
      marketPlaceId: MP?.code,
      group: selectedOption?.code,
      start: Range[0],
      end: Range[1],
    });
    dispatch(
      updateDistanceGroup({
        marketPlaceId: MP?.code,
        group: selectedOption?.code,
        start: Range[0],
        end: Range[1],
      })
    ).then((response) => {
      console.log(response, "response response");
    });
  }


 

  return (
    <Stack gap={3} id="content" style={{ padding: "1% 0%" }}>
      {" "}
      <Container>
        <Row>
          <MarketPlaceComponent />
          <Col>
            <Dropdown
              value={selectedOption}
              onChange={(e) => handleOptionChange(e)}
              options={groupRef.current}
              optionLabel="name"
              placeholder="Nothing Selected"
              filter
              className="w-full md:w-14rem"
              appendTo="self"
              style={{ width: "420px" }}
              name="country"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              id="selected_group"
              value={showGroupName || ""}
              readOnly
            />
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <p>
              Distance range:{" "}
              <span className="warning">
                {Range[0]} Miles - {Range[1]} Miles{" "}
              </span>
            </p>
            <div style={{ marginLeft: "10px" }}>
              <Slider
                value={Range}
                onChange={(e) => setRange(e.value)}
                className="w-14rem"
                range
                id="slider-range"
                min={0}
                max={3000}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <Button
              variant="primary"
              className="Update_Buying_account"
              onClick={handleUpdate}
              style={{
                float: "left",
                marginLeft: "0px",
                marginTop: "20px",
                borderRadius: "none",
              }}
              disabled={isEnabled}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Container>
      <ManageCardGroupDistance
        show={show}
        handleClose={() => dispatch(closeModal())}
      />
    </Stack>
  );
};

export default Manage_card_group_distance;
