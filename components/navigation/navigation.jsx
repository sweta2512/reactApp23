import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WarningIcon from "@mui/icons-material/Warning";
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch, useSelector } from "react-redux";
import "./navigation.css";
import { showError, showSuccess, showInfo } from "../utilities/toast_message";
import { Toast } from "primereact/toast";
import { logout } from "../../store/reducer/Auth/authSlice";


function CollapsibleExample() {
  let navigate = useNavigate();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const name  = localStorage.getItem('name');;

  const navigatePages = (url) => {
    navigate(url);
  };

  const Logout = () => {
    dispatch(logout()).then((response) => {
      // localStorage.setItem("token", "");
      localStorage.removeItem("token");
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload, toast);
      }
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/dbapp");
      }
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-primary flex-wrap"
        data-bs-theme="dark"
        // bg="primary"
        id="navigation"
      >
        {/* <Container> */}
        <Navbar.Brand href="#home" className="ms-3">
          <PersonIcon />
          Hello {name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto flex-wrap gap-20">
            <Nav.Link
              to="/api/home"
              onClick={() => {
                navigatePages("/api/home");
              }}
            >
              <HomeIcon />
              Home
            </Nav.Link>
            <Nav.Link
              to="/api/buying_accounts"
              onClick={() => {
                navigatePages("/api/buying_accounts");
              }}
            >
              {/* <PeopleAltIcon /> */}
              <i className="fa-solid fa-users custm-icon-width"></i>
              Buying accounts
            </Nav.Link>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-users custm-icon-width"></i>
              <NavDropdown title="Queue Jobs" id="collapsible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/api/queue_jobs">Reset Password</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/api/update_cards">Update Cards</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <Nav.Link
              to="/api/performance"
              onClick={() => {
                navigatePages("/api/performance");
              }}
            >
              <i className="fa fa-lg fa-chart-line custm-icon-width"></i>
              Performance
            </Nav.Link>
            <div className="d-flex align-items-center">
              <i className="fa fa-lg fa-cogs"></i>
              <NavDropdown
                title="Settings"
                icon={<SettingsSuggestIcon />}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/change_password" as={Link}>
                    {" "}
                    Change Password
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/landing_page">Landing Page</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/notifications"> Notifications</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/plugin_user"> Plugin User</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/admins"> Admin</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/api/settings/card_grouping"> Card Grouping</Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/manage_card_group">
                    Manage Card Group
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="/api/settings/manage_card_group_distance">
                    {" "}
                    Manage Card Group Distance
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            {/* <NavDropdown
              title="Settings"
              icon={<SettingsSuggestIcon />}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item
                as="li"
                // href="/api/settings/change_password"
                onClick={() => {
                  navigatePages("/api/settings/change_password");
                }}
              >
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item
                as="li"
               // href="/api/settings/landing_page"
                onClick={() => {
                  navigatePages("/api/settings/landing_page");
                }}
              >
                Landing Page
              </NavDropdown.Item>
              <NavDropdown.Item as="li" href="/api/settings/notifications">
                Notifications
              </NavDropdown.Item>
              <NavDropdown.Item as="li" href="/api/settings/plugin_user">
                Plugin User
              </NavDropdown.Item>
              <NavDropdown.Item as="li" href="/api/settings/admins">
                Admin
              </NavDropdown.Item>
              <NavDropdown.Item as="li" href="/api/settings/card_grouping">
                Card Grouping
              </NavDropdown.Item>
              <NavDropdown.Item as="li" href="/api/settings/manage_card_group">
                Manage Card Group
              </NavDropdown.Item>
              <NavDropdown.Item
                as="li"
                href="/api/settings/manage_card_group_distance"
              >
                Manage Card Group Distance
              </NavDropdown.Item>
            </NavDropdown> */}
            <div className="d-flex align-items-center">
              <i className="fa fa-lg fa-archive custm-icon-width"></i>
              <NavDropdown title="Archives" id="collapsible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/api/archives/event">Event</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/api/archives/buying_accounts">
                    {" "}
                    Buying accounts
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link
              to="/api/failed_orders"
              onClick={() => {
                navigatePages("/api/failed_orders");
              }}
            >
              <FilterAltIcon />
              Failed orders
            </Nav.Link>
            <Nav.Link
              to="/api/user_accounts"
              onClick={() => {
                navigatePages("/api/user_accounts");
              }}
            >
              <AccountBoxIcon />
              User accounts
            </Nav.Link>
            <Nav.Link
              to="/api/over_limit_accounts"
              onClick={() => {
                navigatePages("/api/over_limit_accounts");
              }}
            >
              <WarningIcon />
              Over limit accounts
            </Nav.Link>
            <Nav.Link to="#">
              <SearchIcon />
              Scrapper
            </Nav.Link>
          </Nav>
          <Nav.Link
            className="me-4"
            to="/logout"
            onClick={() => {
              Logout("/logout");
            }}
          >
            <PowerSettingsNewIcon />
            Logout
          </Nav.Link>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
}

export default CollapsibleExample;
