import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";

import { v4 as uuidv4 } from "uuid";
import { setUserId } from "../../../../store/reducer/Settings/ManageCardGroup/manageCardGroupSlice";
import {
  NameButton,
  ExpiryButton,
  SerialNoButton,
} from "../../../utilities/manageCardButton";

const UnlinkedCardComponent = () => {
  const dispatch = useDispatch();
  const { Card_List, Unlinked_Count } = useSelector(
    (state) => state.manageCardGroup
  );
  const [checkedState, setCheckedState] = useState([]);
  const [masterCheck, setMasterCheck] = useState(false);
  const [unlinkedData, setUnlinkedData] = useState([]);

  const [searchVal, setSearchVal] = useState("");
  const [singleCheckboxChecked, setSingleCheckboxChecked] = useState([]);
  const checkBoxRef = useRef([]);
  const [sorting, setSorting] = useState("desc");
  const [columnName, setColumnName] = useState("expiry");
  const isDescSorting = sorting === "desc";
  const isAscSorting = sorting === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  useEffect(() => {
    setCheckedState(new Array(Card_List?.unLinked?.length).fill(false));
  }, [Card_List?.unLinked]);

  //set useer Id and dispatch action
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
    } else if (unlinkedData?.length === 0) {
      setMasterCheck(false);
    }
    // if (linked === true) {
    dispatch(setUserId({ ID: singleCheckboxChecked, action: "unlink" }));
    // }
  }, [dispatch, singleCheckboxChecked, unlinkedData]);

  //format data and serial no. key
  useEffect(() => {
    let newAR = [];
    if (Card_List?.unLinked?.length > 0) {
      Card_List?.unLinked?.forEach((item, i) => {
        const newItem = { ...item, serial: i + 1 };
        newAR.push(newItem);
      });
    }

    //filterr
    let filter = newAR.filter((value, key) => {
      return value?.user?.toLowerCase().includes(searchVal?.toLowerCase());
    });

    setUnlinkedData(filter);
  }, [Card_List?.unLinked, searchVal]);

  // update singleCheckboxChecked after unlink.
  useEffect(() => {
    if (Card_List?.unLinked?.length === 0) {
      setSingleCheckboxChecked([]);
    } else {
      Card_List?.unLinked?.forEach((item, i) => {
        if (!singleCheckboxChecked.includes(item.id)) {
          setSingleCheckboxChecked([]);
        }
      });
    }
  }, [Card_List?.unLinked]);

  //single checkbox check
  const handleUnlinkedCheckBox = (e, position) => {
    const { value, checked } = e.target;
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[position] = checked;
    setCheckedState(updatedCheckedState);
    if (e.target.checked === true) {
      let value = [...singleCheckboxChecked, e.target.value];
      setSingleCheckboxChecked([...new Set(value)]);
      //setSingleCheckboxChecked((prev) => [...prev, value]);
    } else if (e.target.checked === false) {
      let freshArray = singleCheckboxChecked.filter((val) => val !== value);
      setSingleCheckboxChecked([...freshArray]);
    }
  };

  //handle master checkbox
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

    let reversedData = unlinkedData.sort(function (a, b) {
      if (sorting === "asc") {
        return a.serial > b.serial ? 1 : -1;
      } else if (sorting === "desc") {
        return a.serial < b.serial ? 1 : -1;
      }
      return false;
    });
    setUnlinkedData(reversedData);
  };

  // sort by expiry
  const sortByExpiryHandler = (column) => {
    setColumnName(column);
    setSorting(futureSortingOrder);

    let dat = [];
    unlinkedData?.forEach((value, key) => {
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
    setUnlinkedData(a);
  };

  const sortByNameHandler = (column) => {
    setColumnName(column);
    setSorting(futureSortingOrder);

    let dat = [];
    unlinkedData?.forEach((value, key) => {
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
    setUnlinkedData(a);
  };

  //search text
  const TextAfterFilter = () => {
    return (
      <>
        {searchVal !== "" && (
          <>
            <span className="searchTextman">
              showing {unlinkedData?.length} of {Card_List?.unLinked?.length}
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
          Unlinked cards ({Unlinked_Count})
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
              <div className="serchBarManageCard">
                <input
                  type="search"
                  placeholder="Search"
                  className="serchManageIcon"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                {Card_List?.unLinked?.length > 0 && (
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
                      {unlinkedData?.map((value, index) => {
                        return (
                          <React.Fragment key={uuidv4()}>
                            <ListItem
                              style={{
                                fontSize: "13px",
                              }}
                              component="div"
                              disablePadding
                            >
                              <ListItemButton>
                                <ListItemText primary={value.serial} />

                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    data-id={value?.id}
                                    value={value?.id}
                                    checked={checkedState[index]}
                                    onChange={(e) => {
                                      handleUnlinkedCheckBox(e, index);
                                    }}
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

export default UnlinkedCardComponent;
