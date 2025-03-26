

import React, { useState, useEffect, useMemo, useRef } from "react";
import Col from "react-bootstrap/Col";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  getManageCardGroupDistanceGroup,
  getManageCardGroupDistanceMarketPlace,
  setMarketPlace,
} from "../../../store/reducer/Settings/ManageCardGroupDistance/manage_card_group_distance";

const MarketPlaceComponent = () => {
  const dispatch = useDispatch();
  const marketPlaceRef = useRef([]);
  const { market_place, MP } = useSelector(
    (state) => state.manageCardGroupDistance
  );

  const handleOptionChange = (event) => {
    // setDefaultSelected(event.target.value);
    dispatch(setMarketPlace(event.target.value));
  };

  // get marketplace list
  useEffect(() => {
    dispatch(getManageCardGroupDistanceMarketPlace());
  }, [dispatch]);

  //get group list
  useEffect(() => {
    dispatch(getManageCardGroupDistanceGroup({ marketPlaceId: MP?.code }));
  }, [market_place, MP]);

  //set list and default marketplace
  useMemo(() => {
    marketPlaceRef.current = market_place?.map((value, index) => {
      if (value.id === "GqhocoCo") {
        // setDefaultSelected({ code: value.id, name: value.name });
        dispatch(setMarketPlace({ code: value.id, name: value.name }));
      }
      return {
        name: value.name,
        code: value.id,
      };
    });
  }, [market_place]);

  return (
    <>
      <Col>
        <Dropdown
          value={MP}
          onChange={(e) => handleOptionChange(e)}
          options={marketPlaceRef.current}
          optionLabel="name"
          placeholder="Nothing Selected"
          filter
          className="w-full md:w-14rem"
          appendTo="self"
          style={{ width: "420px" }}
          name="country"
        />
      </Col>
    </>
  );
};

export default MarketPlaceComponent;
