import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown } from "primereact/dropdown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import DropAbleComponent from "./dropAbleComponent";
import DragableComponenet from "./dragAbleComponenet";
import Card from "react-bootstrap/Card";



export default function CardGrouping() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  const Arr = [
    {
      name: "North",
      key: "12353",
    },
    {
      name: "South",
      key: "23463",
    },
    {
      name: "East",
      key: "54643",
    },
    {
      name: "West",
      key: "4435",
    },
  ];

  const data = [
    {
      id: "1",
      Task: "Create PR for the Task",
      Due_Date: "25-May-2021",
    },
    {
      id: "2",
      Task: "Fix Styling",
      Due_Date: "26-May-2021",
    },
    {
      id: "3",
      Task: "Handle Api Changes",
      Due_Date: "27-May-2021",
    },
    {
      id: "4",
      Task: "Blog on new features",
      Due_Date: "23-Aug-2021",
    },
    {
      id: "5",
      Task: "Call with Backend Team",
      Due_Date: "05-Jan-2021",
    },
  ];

  const columnsFromBackend = {
    [uuidv4()]: {
      title: "All",
      items: data,
    },
    [uuidv4()]: {
      title: "Included",
      items: [],
    },
    [uuidv4()]: {
      title: "Excluded",
      items: [],
    },
  };

  const [project, setProject] = useState(Arr);
  const [columns, setColumns] = useState(columnsFromBackend);
  // we'll pass this function into DragDropContext
  // inside the component
  const onDragEnd = (result) => {
    console.log(result, "result");
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const projects = reorder(
      project, // project is state
      result.source.index,
      result.destination.index
    );
    //store reordered state.
    setProject(projects);
  };
  const onDragEnd1 = (result, columns, setColumns) => {
    console.log(result,' result ', columns,'columns')
    if (!result.destination) return;
    const { source, destination } = result;
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
      console.log(column,'column')
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
  // inside the component
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <Container fluid>
      <Row>
        <Col id="card_grouping_market_place">
          <Row>
            <Col sm="2" id="landing_text">
              <span className="landing_text">Market Place</span>
            </Col>
            <Col sm="8" id="landing_drop">
              <div className=" flex justify-content-start">
                <Dropdown
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4" className="d-flex" style={{width:'600px'}}>
              <DragDropContext  onDragEnd={result => onDragEnd1(result, columns, setColumns)}>
                {/* <div > */}
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (

                    <DropAbleComponent column={column} columnId={columnId}/>
                    // <Droppable key={columnId} droppableId={columnId}>
                    //   {(provided) => (
                    //     <div
                    //       ref={provided.innerRef}
                    //       {...provided.droppableProps}
                    //       style={{minHeight:'10vh',width:'600px',border:'1px solid red',marginBottom:'20px',marginRight:'10px',overflowY:'auto'}}
                    //     >
                    //       <h6>{column.title}</h6>
                    //       {column.items.map((item, index) => (
                    //         <Draggable
                    //           draggableId={item.id}
                    //           key={item.id}
                    //           index={index}
                    //         >
                    //           {(provided) => (
                    //             <div
                    //               ref={provided.innerRef}
                    //               {...provided.draggableProps}
                    //               {...provided.dragHandleProps}
                    //             >
                    //               <Card>
                    //                 <Card.Body> <p>{item.Task}</p></Card.Body>
                    //               </Card>
                    //             </div>
                    //           )}
                    //         </Draggable>
                    //       ))}
                    //       {provided.placeholder}
                    //     </div>
                    //   )}
                    // </Droppable>

                  );
                })}
                {/* </div> */}
              </DragDropContext>
            </Col>
            {/* <Col sm="4">
              2
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list2">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {project &&
                        project.map((item, index) => (
                          // draggableId should be string, index is also require, key props should be unique to prevent from unnecassary re-rendering
                          <Draggable
                            draggableId={item.key}
                            key={item.key}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <p style={{ color: "green" }}>{item.name}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
            <Col sm="4">
              3
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list3">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {project &&
                        project.map((item, index) => (
                          <DragableComponenet item={item} index={index} />
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col> */}
          </Row>
        </Col>
        <Col>
          <Row>
            <Col sm="2" id="landing_text">
              <span className="landing_text">Event</span>
            </Col>
            <Col sm="8" id="landing_drop">
              <div className=" flex justify-content-start">
                <Dropdown
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.value)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem"
                />
              </div>
            </Col>
          </Row>
        </Col>
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
