import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PluginUserModal  from "../../../modal/settings/pluginUser/plugin_userModal";

export default function PluginUserForm() {
    const [show, setShow] = useState(false);
  return (
    <Container>
      <Row>
        <Col>
          {" "}
          <Button
            variant="info"
            className="addAdminButton"
            id="user_activate"
            onClick={() => {
              setShow(true);
            }}
          >
            <PersonAddAltIcon />
            Add New User
          </Button>
        </Col>
      </Row>
      <PluginUserModal
        show={show}
        handleClose={() => {
          setShow(false);
        }}
      />
    </Container>
  );
}
