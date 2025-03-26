import React, { useRef} from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AllGroupComponent from "../../form/Settings/ManageCardGroup/allGroupComponent";
import UnlinkedCardComponent from "../../form/Settings/ManageCardGroup/unlinkedCardComponent";
import LinkedCardComponent from "../../form/Settings/ManageCardGroup/linkedCardComponent";
import "../../style/manage_card_group.css";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import { addRemoveCardGroupManageCard ,setDataListAfterUpdate , setUserId , closeModal} from "../../../store/reducer/Settings/ManageCardGroup/manageCardGroupSlice";
import { showError, showSuccess } from "../../utilities/toast_message";
import { ManageCardGroupModal } from "../../modal/settings/manageCardGroup/manageCardGroupModal";



const Manage_card_group = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { linkedId , action, groupId , Card_List, showModal} = useSelector((state) => state.manageCardGroup);


  let unlink_enable = linkedId?.length > 0 && action === 'unlink'? false : true;
  let link_enable = linkedId?.length > 0 && action === 'link'? false : true;


  


  //unlink linked user
  const handleLinkedCard = (e) => {
    //setLinked(true);    
    let updatedlinkedData = Card_List.linked.filter((item) => !linkedId.includes(item.id));
    let updatedunLinkedData = [...Card_List.unLinked, ...Card_List.linked.filter((item) => linkedId.includes(item.id))];
    let updatedList = { ...Card_List,  unLinked: updatedunLinkedData, linked: updatedlinkedData };
  
   
    dispatch(
      addRemoveCardGroupManageCard({
        actionType: "remove",
        group: groupId,
        linked: linkedId,
        unLinked: "",
      })
    ).then((response) => {
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(setDataListAfterUpdate(updatedList));
        dispatch(setUserId({ ID: [], action: "link" }));
        setTimeout(() => {
          showSuccess(response.payload, toast);
        }, 100);
      }
      if (response?.meta?.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
    });
  };


  //link unlinked user
  const handleUnlinkedCard = () => {
    let updatedUnlinkedData = Card_List.unLinked.filter((item) => !linkedId.includes(item.id));
    let updatedLinkedData = [ ...Card_List.linked,...Card_List.unLinked.filter((item) => linkedId.includes(item.id))];

    let updatedList = {
      ...Card_List,
      unLinked: updatedUnlinkedData,
      linked: updatedLinkedData,
    };

    
    dispatch(
      addRemoveCardGroupManageCard({
        actionType: "add",
        group: groupId,
        linked: "",
        unLinked: linkedId,
      })
    ).then((response) => {
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(setDataListAfterUpdate(updatedList));
        dispatch(setUserId({ ID: [], action: "unlink" }));
        setTimeout(() => {
          showSuccess(response.payload, toast);
        }, 100);
      }
      if (response?.meta?.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
    });
  };
  return (
    <Stack gap={3} id="content" style={{ padding: "1% 0%" }}>
      <Toast ref={toast} />
      <Container fluid>
        <Row>
          <AllGroupComponent />
          <UnlinkedCardComponent />

          <Col xs={3} className="">
            <ListGroup>
              <ListGroup.Item>
                <Col
                  md={12}
                  style={{ height: "312px" }}
                  className="align-arrow"
                >
                  <Col md={4} className="d-flex">
                    {/* style={{marginTop:'10px'}} */}
                    <Button
                      className="card_add"
                      variant="light"
                      style={{ color: "grey" }}
                      onClick={handleUnlinkedCard}
                     disabled={unlink_enable}
                    >
                      {/* <i className="fa fa-arrow-right">1</i> */}
                      <ArrowForwardIcon />
                    </Button>
                  </Col>
                  <Col md={4}> &nbsp;</Col>
                  <Col md={4} className="d-flex">
                    {/* style={{marginBottom:'10px'}} */}
                    <Button
                      className="card_remove"
                      variant="light"
                      style={{ color: "grey" }}
                      onClick={(e) => handleLinkedCard(e)}
                      disabled={link_enable}
                    >
                      {/* <i className="fa fa-arrow-left">2</i> */}
                      <ArrowBackIcon id="card_remove" />
                    </Button>
                  </Col>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <LinkedCardComponent/>
        </Row>
      </Container>
      {/* <div className="p-2"> */}
      {/* <Table
          data={customers}
          columns={columns}
          show={show}
          setShow={setShow}
          creditcard={creditcard}
        /> */}
      {/* </div> */}

       {/* modal */}
       <ManageCardGroupModal
        show={showModal}
        handleClose={()=>dispatch(closeModal())}
      />
    </Stack>
  );
};

export default Manage_card_group;
