import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
const DragableComponenet = ({ item, index }) => {
  //console.log(item)
  return (
    <>
      <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided,snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            //className={snapshot.isDragging && 'dragging'}
          >
            <Card  style={style.cardContent} >
              <CardContent style={style.textContent} className={snapshot.isDragging ? 'dragging' : ''}>
                <Typography color="text.primary"  style={style.textStyle}>{item.name}</Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default DragableComponenet;

const style = {
  cardContent: {
    minWidth: "100px",
    maxHeight: "30px",
    // padding:'5px',
    marginBottom: "10px",
    //textAlign:'center',
    //padding:'10px'
    //backgroundColor:'#ebfafa'
  },
  textContent: {
    padding: "4px",
    fontSize: "13px",
  },
  textStyle: {
    textAlign: "center",
    fontSize: "10px",
    fontWeight: "bold",
  },
  dropOver: "bg-gray-100",
};
