import React, { useState, useEffect,useRef , useMemo } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown } from "primereact/dropdown";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DropAbleComponent from "./dropAbleComponent";
import { useDispatch, useSelector } from "react-redux";
import { getCardGroupingFormData  ,setFilters , saveCardGroupState } from "../../../../store/reducer/Settings/CardGrouping/cardGroupingSlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../../utilities/toast_message";



export default function CardGrouping() {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const {
    Form_Data,
    market_place_list,
    event_list,
    filters,
    plugin_user_list,
  } = useSelector((state) => state?.cardGrouping);
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  const [isMp, setIsMp] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [isPluginUser, setIsPluginUser] = useState(false);
  const [selectedMarketPlace, setSelectedMarketPlace] = useState([]);
  const [marketPlaceList, setMarketPlaceList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [pluginUserList, setPluginUserList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [seletctedPluginUser, setSelectedPluginUser] = useState([]);
  const MarketPlaceRef = useRef("");
  const EventRef = useRef("");
  const PluginUserRef = useRef("");

  useEffect(()=>{
    dispatch(getCardGroupingFormData());
  },[dispatch]);


  useEffect(() => {
    dispatch(
      setFilters({
        marketplace: selectedMarketPlace?.code||'',
        eventId: selectedEvent?.code||'',
        pluginUserId: seletctedPluginUser?.code||'',
      })
    );
  }, [dispatch , selectedMarketPlace, selectedEvent , seletctedPluginUser]);

  useMemo(() => {
    const columnsForCardGrouping = {
      all: {
        title: "All",
        items: market_place_list?.allCardGroup || [],
      },
      marketplaceInclude: {
        title: "Included",
        items: market_place_list?.include || [],
      },
      marketplaceExclude: {
        title: "Excluded",
        items: market_place_list?.exclude || [],
      },
    };

    const columnsForEvents = {
      eventAll: {
        title: "All",
        items: event_list?.allCardGroup || [],
      },
      eventInclude: {
        title: "Included",
        items: event_list?.include || [],
      },
      eventExclude: {
        title: "Excluded",
        items: event_list?.exclude || [],
      },
    };

    const columnsForPluginUser = {
      pluginUserAll: {
        title: "All",
        items: plugin_user_list?.allCardGroup || [],
      },
      pluginUserInclude: {
        title: "Included",
        items: plugin_user_list?.include || [],
      },
      pluginUserExclude: {
        title: "Excluded",
        items: plugin_user_list?.exclude || [],
      },
    };
    setMarketPlaceList(columnsForCardGrouping);
    setEventList(columnsForEvents);
    setPluginUserList(columnsForPluginUser);
  }, [market_place_list, event_list , plugin_user_list]);

 

  useMemo(() => {
    let marketPlace = Form_Data?.marketPlace;
    let events = Form_Data?.events;
    let pluginUser = Form_Data?.pluginUsers;
    MarketPlaceRef.current = marketPlace?.map((value, index) => {     
      return {
        name: value?.name,
        code: value?.id,
      };
    });

    EventRef.current = events?.map((value, index) => {
      return {
        name: value?.eventName,
        code: value?.id,
      };
    });
    PluginUserRef.current = pluginUser?.map((value, index) => {
      return {
        name: value?.display_name,
        code: value?.id,
      };
    });

    if(MarketPlaceRef?.current && MarketPlaceRef?.current?.length>0){
      let MP = MarketPlaceRef.current?.[0];
      setSelectedMarketPlace(
        {
          code: MP?.code,
          name: MP?.name,
        } || []
      );
      
    }
    if(EventRef?.current  && EventRef?.current?.length>0){    
      let event = EventRef?.current?.[0];
      setSelectedEvent(
        {
          code: event?.code,
          name: event?.name,
        } || []
      );
      
    }   
    if(PluginUserRef.current  && PluginUserRef.current?.length>0){    
      let pluginUser = PluginUserRef.current?.[0];
      setSelectedPluginUser(
        {
          code: pluginUser?.code,
          name: pluginUser?.name,
        } || []
      );
      
    }   
  }, [Form_Data]);

useEffect(() => {
  let includeId = [];
  let excluded = [];
  let eventInclude = [];
  let eventExcluded = [];
  let pluginUserIncluded = [];
  let pluginUserExcluded = [];

  if (isUpdate === true) {
    marketPlaceList?.marketplaceInclude?.items?.map((item) => {
      includeId.push(item?.id);
      return null;
    });

    marketPlaceList?.marketplaceExclude?.items?.map((item) => {
      excluded.push(item?.id);
      return null;
    });
    eventList?.eventInclude?.items?.map((item) => {
      eventInclude.push(item?.id);
      return null;
    });

    eventList?.eventExclude?.items?.map((item) => {
      eventExcluded.push(item?.id);
      return null;
    });


    pluginUserList?.pluginUserInclude?.items?.map((item) => {
      pluginUserIncluded.push(item?.id);
      return null;
    });

    pluginUserList?.pluginUserExclude?.items?.map((item) => {
      pluginUserExcluded.push(item?.id);
      return null;
    });
   
    if (
      includeId?.length > 0 ||
      excluded?.length > 0 ||
      eventInclude?.length > 0 ||
      eventExcluded?.length > 0||
      pluginUserIncluded?.length>0||
      pluginUserIncluded?.length >0
    ) {
      let data = {};
      if (isMp === true) {
        data = {
          marketplace: filters?.marketplace,
          eventId: 0,
          pluginUserId:0,
          marketplaceInclude: includeId?.join(","),
          marketplaceExclude: excluded?.join(","),
          eventInclude: "",
          eventExclude: "",
          pluginUserIncluded: "",
          pluginUserExcluded: "",
        };
      }

      if (isEvent === true) {
        data = {
          marketplace: 0,
          eventId: filters?.eventId,
          pluginUserId:0,
          marketplaceInclude: "",
          marketplaceExclude: "",
          eventInclude: eventInclude?.join(","),
          eventExclude: eventExcluded?.join(","),
          pluginUserIncluded: "",
          pluginUserExcluded: "",
        };
      }

      if (isPluginUser === true) {
        data = {
          marketplace: 0,
          eventId: 0,
          pluginUserId:filters?.pluginUserId,
          marketplaceInclude: "",
          marketplaceExclude: "",
          eventInclude: "",
          eventExclude: "",
          pluginUserIncluded: pluginUserIncluded?.join(","),
          pluginUserExcluded: pluginUserExcluded?.join(","),
        };
      }

      dispatch(saveCardGroupState(data)).then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          showSuccess(response?.payload?.message, toast);
        }
        if (response?.meta?.requestStatus === "rejected") {
          showError(response?.payload?.message, toast);
        }
      });
    }
  }

  return () => {
    setIsUpdate(false);
  };
}, [dispatch, marketPlaceList, eventList , pluginUserList, filters ,isEvent,isMp ,isUpdate]);

 


  // we'll pass this function into DragDropContext
  // inside the component
  const onDragEndForMp = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setIsUpdate(true)
    setIsMp(true)
    setIsEvent(false)
    setIsPluginUser(false)

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const onDragEndEvent = (result, eventColumns, setEventColumns) => {
    if (!result.destination) return;
    setIsEvent(true);
    setIsMp(false);
    setIsUpdate(true)
    setIsPluginUser(false)
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = eventColumns[source.droppableId];
      const destColumn = eventColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setEventColumns({
        ...eventColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = eventColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setEventColumns({
        ...eventColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }

  };


  //PLUGIN USER

  const onDragEndPluginUser = (result, userColumns, setUserColumns) => {
    if (!result.destination) return;
    setIsEvent(false);
    setIsMp(false);
    setIsUpdate(true)
    setIsPluginUser(true)
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = userColumns[source.droppableId];
      const destColumn = userColumns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setUserColumns({
        ...userColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = userColumns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setUserColumns({
        ...userColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }

  };
  





  return (
    <Container fluid>
      <Toast ref={toast} />
      <Row>
        <Col id="card_grouping_market_place">
          <Row style={{ marginLeft: "-100px" }}>
            <Col sm="2" id="landing_text">
              <span className="landing_text">Market Place</span>
            </Col>
            <Col sm="8" id="landing_drop">
              <div className=" flex justify-content-start">
                <Dropdown
                  value={selectedMarketPlace}
                  onChange={(e) => setSelectedMarketPlace(e.value)}
                  options={MarketPlaceRef.current || []}
                  optionLabel="name"
                  placeholder="Select Market Place"
                  filter
                  className="w-full md:w-14rem"
                  style={{ width: "400px" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="d-flex" style={style.cardContainer}>
                <DragDropContext
                  onDragEnd={
                    (result) =>
                      onDragEndForMp(
                        result,
                        marketPlaceList,
                        setMarketPlaceList
                      )
                    //onDragEnd1(result, columns, setColumns)
                  }
                >
                  {Object.entries(marketPlaceList).map(
                    ([columnId, column], index) => {
                      return (
                        <DropAbleComponent
                          column={column}
                          columnId={columnId}
                          key={index}
                        />
                      );
                    }
                  )}
                </DragDropContext>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          {isSuperAdmin === "1" && (
            <>
              <Row>
                <Col sm="2" id="landing_text">
                  <span className="landing_text">Event</span>
                </Col>
                <Col sm="8" id="landing_drop">
                  <div className=" flex justify-content-start">
                    <Dropdown
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.value)}
                      options={EventRef.current || []}
                      optionLabel="name"
                      placeholder="Select Event"
                      filter
                      className="w-full md:w-14rem"
                      style={{ width: "400px" }}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm="4">
                  <div style={style.eventContainer} className="d-flex flex-row">
                    <DragDropContext
                      onDragEnd={(result) =>
                        onDragEndEvent(result, eventList, setEventList)
                      }
                    >
                      {Object.entries(eventList).map(
                        ([columnId, column], index) => {
                        
                          return (
                            <DropAbleComponent
                              column={column}
                              columnId={columnId}
                              key={index}
                              type={"event"}
                            />
                          );
                        }
                      )}
                    </DragDropContext>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>

        <br />
        <hr></hr>

        {/* plugin start */}
        {isSuperAdmin === "1" && (
          <>
            {" "}
            <Col id="card_grouping_plugin_user">
              <Row style={{ marginLeft: "-212px" }}>
                <Col sm="3" id="landing_text">
                  <span className="landing_text">Plugin User</span>
                </Col>
                <Col sm="9" id="landing_drop">
                  <div className=" flex justify-content-start">
                    <Dropdown
                      value={seletctedPluginUser}
                      onChange={(e) => setSelectedPluginUser(e.value)}
                      options={PluginUserRef.current || []}
                      optionLabel="name"
                      placeholder="Select Market Place"
                      filter
                      className="w-full md:w-14rem"
                      style={{ width: "400px" }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <div className="d-flex" style={style.cardContainer}>
                    <DragDropContext
                      onDragEnd={(result) =>
                        onDragEndPluginUser(
                          result,
                          pluginUserList,
                          setPluginUserList
                        )
                      }
                    >
                      {Object.entries(pluginUserList).map(
                        ([columnId, column], index) => {
                          return (
                            <DropAbleComponent
                              column={column}
                              columnId={columnId}
                              key={index}
                            />
                          );
                        }
                      )}
                    </DragDropContext>
                  </div>
                </Col>
              </Row>
            </Col>
          </>
        )}
        <Col></Col>

        {/* plugin end */}
      </Row>
      <Row></Row>
    </Container>
  );
}

export const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const style = {
  cardContainer: {
    marginTop: "10px",
    //minWidth:'600px'
    width: "550px",
    position: "relative",
    backgroundPosition: "top",
    
  },
  eventContainer: {
    // display:'flex',
    // flexDirection:'row',
    // alignItems:'stretch',
    
    // marginTop: "10px",
    //minWidth:'600px'
    width: "550px",
    // position: "relative",
     marginLeft: "90px",
    
  },

  

  
};
