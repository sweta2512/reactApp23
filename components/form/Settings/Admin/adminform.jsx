import React from "react";
import { useDispatch ,useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { AddUserModal } from "../../../modal/settings/admin/addAdminModal";
import {showAddUserModal, closeAddUserModal} from "../../../../store/reducer/Settings/Admin/adminSlice"

const Adminform = () => {
  const dispatch = useDispatch()
  const {addUserModal} = useSelector((state)=>state.admin)

  return (
    <Container>
      <Row>
        <Col>
          {" "}
           <Button variant="info" className="addAdminButton" id="user_activate" onClick={()=>{dispatch(showAddUserModal())}}><PersonAddAltIcon />Add New User</Button>
        </Col>
      </Row>
      <AddUserModal
        show={addUserModal}
        handleClose={() => {
          dispatch(closeAddUserModal())
        }}
      />
    </Container>
  );
};

export default Adminform;
