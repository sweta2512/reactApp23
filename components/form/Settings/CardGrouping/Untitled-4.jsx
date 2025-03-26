<DragDropContext
onDragEnd={(result) =>
  onDragEndEvent(result, eventColumns, setEventColumns)
}
>
{/* <div > */}
{Object.entries(eventColumns).map(
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
{/* </div> */}
</DragDropContext>

className="d-flex flex-row"