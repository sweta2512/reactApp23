import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

import { MultiSelect } from "primereact/multiselect";
import { ResetAndRefreshComponent } from "../../utilities/reset_refresh";
import {setFilter} from "../../../store/reducer/QueueJobs/resetpasswordSlice";



const Queuejobs_resetpassword = ({  refreshHandler }) => {
  const dispatch = useDispatch();
  const optionsMarketPlaceRef = useRef([]);
  const [marketplace, setMarketplace] = useState([null]);

  const restFormData = useSelector(
    (state) => state.queuejobsresetpassword.resetFormData
  );
  

  //arrange multiselect data
  useMemo(() => {
    optionsMarketPlaceRef.current = restFormData.data?.map((value, index) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    if (optionsMarketPlaceRef.current && optionsMarketPlaceRef.current[1]) {
      let DefaultMP = optionsMarketPlaceRef.current[1].value;
      setMarketplace([DefaultMP]);
    }
  }, [restFormData]);

  useEffect(()=>{   
    dispatch(setFilter({marketPlace:marketplace}))
  },[dispatch,marketplace])



  //reset Handler
  const resetHandler = useCallback(() => {
    setMarketplace([]);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          {" "}
          <Stack gap={1}>
            <div className="p-0 mt-3 mb-3">
              {" "}
              <Row>
                <Col sm={4}>
                  <span style={{ fontSize: "13px" }}>Market Place</span>
                </Col>
                <Col sm={8}>
                  {" "}
                  <MultiSelect
                    value={marketplace}
                    options={optionsMarketPlaceRef.current}
                    onChange={(e) =>{ setMarketplace(e.value);}}
                    placeholder={
                      marketplace
                        ? "Nothing selected"
                        : optionsMarketPlaceRef?.current[1]?.label
                    }
                    filter
                    className="cstm-input-text md:w-40rem"
                    style={{ width: "100%" }}   
                  />
                </Col>
              </Row>
            </div>
          </Stack>
        </Col>
        <Col className="p-0 mt-3 mb-3">
          <ResetAndRefreshComponent
            refreshHandler={refreshHandler}
            resetHandler={resetHandler}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Queuejobs_resetpassword;
