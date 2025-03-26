import React from "react";
import Button from "react-bootstrap/Button";

export const NameButton = ({
  column,
  handler,
  columnName,
  isDescSorting,
  isAscSorting,
}) => {
  return (
    <>
      <Button className="manage_card_button"  onClick={handler}>
        {" "}
        {columnName === "name" && (
          <SortArrow
            isDescSorting={isDescSorting}
            isAscSorting={isAscSorting}
          />
        )}
        {column}
      </Button>
    </>
  );
};

export const ExpiryButton = ({
  column,
  handler,
  columnName,
  isDescSorting,
  isAscSorting,
}) => {
  return (
    <>
      <Button className="manage_card_button"  onClick={handler}>
        {" "}
        {columnName === "expiry" && (
          <SortArrow
            isDescSorting={isDescSorting}
            isAscSorting={isAscSorting}
          />
        )}
        {column}
      </Button>
    </>
  );
};

export const SerialNoButton = ({
  column,
  handler,
  columnName,
  isDescSorting,
  isAscSorting,
}) => {
  return (
    <>
      <Button className="manage_card_button"  onClick={handler}>
        {" "}
        {columnName === "sn" && (
          <SortArrow
            isDescSorting={isDescSorting}
            isAscSorting={isAscSorting}
            // columnName={columnName}
          />
        )}
        {column}
      </Button>
    </>
  );
};


//SORT ARROW ICON COMPONENT
const SortArrow = ({ isAscSorting, isDescSorting }) => {
  return (
    <>
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </>
  );
};