import React, { useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setUserId } from "../../../../store/reducer/Settings/ManageCardGroup/manageCardGroupSlice";

import {
  NameButton,
  ExpiryButton,
  SerialNoButton,
} from "../../../utilities/manageCardButton";

const LinkedCardComponent = () => {
  const dispatch = useDispatch();
  const checkBoxRef = useRef([]);
  const [masterCheck, setMasterCheck] = useState(false);
  const [linkedData, setLinkedData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [singleCheckboxChecked, setSingleCheckboxChecked] = useState([]);
  const { Card_List, Group_Name, Linked_Count } = useSelector(
    (state) => state.manageCardGroup
  );
  const [checkedState, setCheckedState] = useState([]);
  const [sorting, setSorting] = useState("desc");
  const [columnName, setColumnName] = useState("expiry");
  const isDescSorting = sorting === "desc";
  const isAscSorting = sorting === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  useEffect(() => {
    setCheckedState(new Array(Card_List?.linked?.length).fill(false));
  }, [Card_List?.linked]);

  //format data and serial no. key
  useEffect(() => {
    let newAR = [];
    if (Card_List?.linked?.length > 0) {
      Card_List?.linked?.forEach((item, i) => {
        const newItem = { ...item, serial: i + 1 };
        newAR.push(newItem);
      });
    }
    //filterr
    let filter = newAR.filter((value, key) => {
      return value?.user?.toLowerCase().includes(searchVal?.toLowerCase());
    });

    setLinkedData(filter);
  }, [Card_List?.linked, searchVal]);

  useEffect(() => {
    let count = singleCheckboxChecked?.length;
    let countOfElement = checkBoxRef.current?.length;

    if (count > 0) {
      if (count === countOfElement) {
        setMasterCheck(true);
      }
      if (count !== countOfElement) {
        setMasterCheck(false);
      }
    } else if (linkedData?.length === 0) {
      setMasterCheck(false);
    }
    // if (linked === true) {
    dispatch(setUserId({ ID: singleCheckboxChecked, action: "link" }));
    // }
  }, [dispatch, singleCheckboxChecked, checkBoxRef , linkedData]);



  // update singleCheckboxChecked after link.
  useEffect(() => {
    if (Card_List?.linked?.length === 0) {
      setSingleCheckboxChecked([]);
    } else {
      Card_List?.linked?.forEach((item, i) => {
        if (!singleCheckboxChecked.includes(item.id)) {
          setSingleCheckboxChecked([]);
        }
      });
    }
  }, [Card_List?.linked]);

  const handleInputCheck = (e, position) => {
    const { value, checked } = e.target;
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[position] = checked;
    setCheckedState(updatedCheckedState);
    if (checked) {
      let value = [...singleCheckboxChecked, e.target.value];
      setSingleCheckboxChecked([...new Set(value)]);
    } else if (checked === false) {
      let freshArray = singleCheckboxChecked.filter((val) => val !== value);
      setSingleCheckboxChecked([...freshArray]);
    }
  };

  const handleAllCheckboxCheck = (e) => {
    let updatedCheckedState;
    setMasterCheck(e.target.checked);
    if (e.target.checked === true) {
      updatedCheckedState = checkedState.map((item, index) => true);
    } else {
      updatedCheckedState = checkedState.map((item, index) => false);
    }

    setCheckedState(updatedCheckedState);
    if (e.target.checked === true) {
      let value = checkBoxRef.current.map((item, index) => item?.id);    
      setSingleCheckboxChecked([...new Set(value)]);
    }

    if (e.target.checked === false) {
      setSingleCheckboxChecked([]);
    }
  };

  //Sort by serial no. handler
  const SortByserialNoHandler = (column) => {
    setColumnName(column);
    setSorting(futureSortingOrder);

    let reversedData = linkedData.sort(function (a, b) {
      if (sorting === "asc") {
        return a.serial > b.serial ? 1 : -1;
      } else if (sorting === "desc") {
        return a.serial < b.serial ? 1 : -1;
      }
      return false;
    });
    setLinkedData(reversedData);
  };

  //sort by name
  const sortByNameHandler = (column) => {
    setColumnName(column);
    setSorting(futureSortingOrder);

    let dat = [];
    linkedData?.forEach((value, key) => {
      let exp = value?.user?.substr(12);
      const newItem = { ...value, name: exp };
      dat.push(newItem);
    });
    let a = dat.sort(function (a, b) {
      if (sorting === "asc") {
        return a.name < b.name ? 1 : -1;
      } else if (sorting === "desc") {
        return a.name > b.name ? 1 : -1;
      }
      return false;
    });
    setLinkedData(a);
  };

  // sort by expiry
  const sortByExpiryHandler = (column) => {
    setColumnName(column);
    setSorting(futureSortingOrder);

    let dat = [];
    linkedData?.forEach((value, key) => {
      let exp = value?.user?.substr(7, 4);
      const newItem = { ...value, exp: exp };
      dat.push(newItem);
    });
    let a = dat.sort(function (a, b) {
      if (sorting === "asc") {
        return a.exp < b.exp ? 1 : -1;
      } else if (sorting === "desc") {
        return a.exp > b.exp ? 1 : -1;
      }
      return false;
    });
    setLinkedData(a);
  };

 //search text
  const TextAfterFilter = () => {
    return (
      <>
        {searchVal !== "" && (
          <>
            <span className="searchTextman">
              showing {linkedData?.length} of {Card_List?.linked?.length}
            </span>
          </>
        )}
      </>
    );
  };
  const LabelText = () => {
    return (
      <>
        <span style={{ fontSize: "13px" }}>
          ({Linked_Count}) Cards linked to group:{" "}
          <span className="warning">{Group_Name}</span>
        </span>
      </>
    );
  };
  return (
    <>
      <Col xs={3} className="">
        <ListGroup>
          <ListGroup.Item>
            <Col md={12} style={{ height: "312px" }}>
              <div>
                <Form>
                  <div key="default-checkbox1" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="default-checkbox1"
                      label={<LabelText />}
                      onChange={(e) => {
                        handleAllCheckboxCheck(e);
                      }}
                      name="all"
                      checked={masterCheck}
                    />
                  </div>
                </Form>
              </div>
              <div className='serchBarManageCard'>
                <input
                  type="search"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  className='serchManageIcon'
                />
                {Card_List?.linked?.length > 0 && (
                  <>
                    <TextAfterFilter />
                  </>
                )}
              </div>
              <div>
                <Row>
                  <Col sm={4} className="text-center">
                    <SerialNoButton
                      column={"SN"}
                      handler={() => {
                        SortByserialNoHandler("sn");
                      }}
                      isDescSorting={isDescSorting}
                      isAscSorting={isAscSorting}
                      columnName={columnName}
                    />
                  </Col>
                  <Col sm={4} className="text-center">
                    <NameButton
                      column={"Name"}
                      handler={() => {
                        sortByNameHandler("name");
                      }}
                      isDescSorting={isDescSorting}
                      isAscSorting={isAscSorting}
                      columnName={columnName}
                    />
                  </Col>
                  <Col sm={4} className="text-center">
                    <ExpiryButton
                      column={"Expiry"}
                      handler={() => {
                        sortByExpiryHandler("expiry");
                      }}
                      isDescSorting={isDescSorting}
                      isAscSorting={isAscSorting}
                      columnName={columnName}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ maxHeight: "10vh" }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        maxWidth: 300,
                        bgcolor: "background.paper",
                        overflow: "auto",
                      }}
                    >
                      {linkedData?.map((value, index) => {
                        return (
                          <React.Fragment key={uuidv4()}>
                            <ListItem
                              style={{
                                fontSize: "13px",
                              }}
                              component="div"
                              disablePadding
                            >
                              <ListItemButton key={`a${value?.id}`}>
                                <ListItemText primary={value.serial} />

                                <ListItemIcon key={`k${value?.id}`}>
                                  <Checkbox
                                    edge="start"
                                    data-id={value?.id}
                                    value={value?.id}
                                    checked={checkedState[index]}
                                    onChange={(e) => {
                                      handleInputCheck(e, index);
                                    }}
                                    name="single"
                                    ref={(element) =>
                                      (checkBoxRef.current[index] = {
                                        checked: checkedState[index],
                                        id: value?.id,
                                      })
                                    }
                                    // tabIndex={-1}
                                    // disableRipple
                                    // inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </ListItemIcon>

                                <ListItemText
                                  style={{
                                    fontSize: "10px",
                                  }}
                                  primary={value?.user}
                                />
                              </ListItemButton>
                            </ListItem>
                          </React.Fragment>
                        );
                      })}
                    </Box>
                  </Col>
                </Row>
              </div>
            </Col>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
};

export default LinkedCardComponent;
