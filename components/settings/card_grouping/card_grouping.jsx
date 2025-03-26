import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import CardGrouping from "../../form/Settings/CardGrouping/card_groupingForm";
import { useDispatch, useSelector } from "react-redux";
import {
  marketPlaceGroupingList,
  eventGroupingList,
  pluginUserGroupingList,
} from "../../../store/reducer/Settings/CardGrouping/cardGroupingSlice";

const Card_grouping = () => {
  const dispatch = useDispatch();
  const { filters, event_list, market_place_list } = useSelector(
    (state) => state?.cardGrouping
  );
  

  useEffect(() => {
    if (filters?.marketplace) {
      dispatch(marketPlaceGroupingList(filters));
    }
  }, [dispatch, filters]);

  useEffect(() => {
    if (filters?.eventId) {
      dispatch(eventGroupingList(filters));
    }

    // if (filters?.pluginUserId) {
    //   dispatch(pluginUserGroupingList(filters));
    // }
  }, [dispatch, filters]);
  

  useEffect(() => {
    if (filters?.pluginUserId) {
      dispatch(pluginUserGroupingList(filters));
    }
  }, [dispatch, filters]);
  

  useEffect(() => {
    // if (
    //   event_list?.allCardGroup.length > 0 ||
    //   market_place_list?.allCardGroup.length > 0
    // ) {
    //   dispatch(saveCardGroupState(filters));
    // }
  }, [dispatch, filters, event_list, market_place_list]);

  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <CardGrouping />
      </div>
    </Stack>
  );
};

export default Card_grouping;
