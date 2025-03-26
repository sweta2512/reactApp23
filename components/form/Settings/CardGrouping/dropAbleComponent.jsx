import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DragableComponenet from "./dragAbleComponenet";
const DropAbleComponent = ({ columnId, column ,type}) => {
  return (
    <>
      <Droppable key={columnId} droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={style.dropContainer}
            className={snapshot.isDraggingOver +"d-flex flex-column"}
          >
            <div style={style.title}>
              <h6>{column.title}</h6>
            </div>
            {column.items.map((item, index) => (
              <DragableComponenet
                item={item}
                index={index}
                key={item.id}
                provided={provided}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

const style = {
  dropContainer: {
    backgroundColor:'#337ab7',
    minHeight: "15vh",
    maxHeight: "55vh",
    display:'flex',
    flexDirection:'column',
    width: "600px",
    padding: "10px",
    //border: "1px solid grey",
    marginTop: "20px",
    marginRight: "10px",
    overflowY: "auto",
    borderRadius: "10px",
    
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  title: {
    textAlign: "center",
    color:'white'
  },
  dragging:'gray',
  dropOver:'bg-gray-100',
};
export default DropAbleComponent;
