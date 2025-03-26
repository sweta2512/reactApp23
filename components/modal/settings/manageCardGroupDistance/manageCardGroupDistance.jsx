import React,{useState, useRef} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";
import {addDistanceGroup, getManageCardGroupDistanceGroup , closeModal} from "../../../../store/reducer/Settings/ManageCardGroupDistance/manage_card_group_distance";
import { useDispatch , useSelector } from "react-redux";

const ManageCardGroupDistance = ({ show, handleClose }) => {
const dispatch = useDispatch();
const toast  = useRef();
const [addGroup, setAddGroup] = useState(null);
const {MP, selectedOption } = useSelector(
  (state) => state.manageCardGroupDistance
);


console.log( MP,selectedOption?.distanceRange,'MODALLLLLL' )
  const handleAddGroup = () => {
    dispatch(addDistanceGroup({groupName:addGroup})).then((response)=>{
        console.log(response,'response')
        if (response?.meta?.requestStatus === "fulfilled") {
          showSuccess(response?.payload, toast);
          setTimeout(() => {
            dispatch(closeModal());
            dispatch(
              getManageCardGroupDistanceGroup({
                marketPlaceId: MP?.code,
                group: selectedOption?.code,
                start: parseFloat(selectedOption?.distanceRange?.start),
                end: parseFloat(selectedOption?.distanceRange?.end),
              })
            );
          }, 1000);
        }
          if (response?.meta?.requestStatus === "rejected") {
            showError(response?.payload, toast);
          }
    })
  };




  return (
    <>
    <Toast ref={toast}/>
      <Modal
        show={show}
        onHide={() => handleClose()}
        id="manage_card_distance_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new group name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group as={Row} className="mb-1" controlId="add_group">
              <Col sm="3">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={(e) => setAddGroup(e.target.value)}
                  value={addGroup||""}
                />
              </Col>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>

          <Button variant="secondary" onClick={() => handleAddGroup()}>
            submit
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageCardGroupDistance;
