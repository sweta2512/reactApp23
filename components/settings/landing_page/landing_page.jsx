import React, { useState, useEffect , useRef, useMemo } from "react";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import {landingPageFormData , landingPageUpdate} from "../../../store/reducer/Settings/LandingPage/landingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../utilities/toast_message";


const Landing_page = () => {
  const dispatch = useDispatch();
  let toast = useRef(null);
  const formData = useSelector((state)=>state.landingPage?.form_data);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const landingPageRef = useRef([])


  useMemo(() => {
    landingPageRef.current = formData?.options?.map((item) => {
      return {
        name: item[1],
        code: item[0],
      };
    });
  }, [formData]);




  useEffect(() => {
    let result = dispatch(landingPageFormData());
    return () => {
      result.abort();
      
    };
  }, [dispatch]);



  const updateValue = (e) => {
    setSelectedCountry(e.value);
    dispatch(landingPageUpdate({ defaultPage: e?.value?.code })).then(
      (response) => {
        if (response.meta.requestStatus === "fulfilled") {
          showSuccess(response?.payload?.message, toast);
        }

        if (response.meta.requestStatus === "rejected") {
          showError(response?.payload?.message, toast);
        }
      }
    );
  };

  return (
    <Stack gap={1} id="content">
      <Toast ref={toast} />
      <Row>
        <Col sm="2" id="landing_text"><span className="landing_text">Landing Page</span></Col>
        <Col sm="8" id="landing_drop" className="mt-3">
          {/* <div className="card flex justify-content-start"> */}
            <Dropdown
              value={selectedCountry}
              onChange={(e) => updateValue(e)}
              options={landingPageRef.current}
              optionLabel="name"
              placeholder="Select a Country"
              filter            
              className="w-full md:w-14rem"
              style={{width:'400px',height: '46px'}}
            />
          {/* </div> */}
        </Col>
      </Row>
    </Stack>

  );
};

export default Landing_page;
