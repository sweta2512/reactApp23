import { Link } from "react-router-dom";
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
import "./navigation.css";

function CollapsibleExample() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-primary "
      data-bs-theme="dark"
      // bg="primary"
      id="navigation"
    >
      {/* <Container> */}
      <Navbar.Brand href="#home">
        <PersonIcon />
        Hello Sweta
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/api/home">
              <HomeIcon />
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/api/buying_accounts">
              <PeopleAltIcon />
              Buying accounts
            </Link>
          </Nav.Link>

          <NavDropdown title="Queue Jobs" id="collapsible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/api/queue_jobs">Reset Password</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/update_cards">Update Cards</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <Link to="/api/performance">Performance</Link>
          </Nav.Link>
          <NavDropdown title="Settings" id="collapsible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/api/settings/change_password"> Change Password</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/landing_page">Landing Page</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/notifications"> Notifications</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/plugin_user"> Plugin User</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/admins"> Admin</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/card_grouping"> Card Grouping</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/manage_card_group">
                Manage Card Group
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/settings/manage_card_group_distance">
                {" "}
                Manage Card Group Distance
              </Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Archives" id="collapsible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/api/archives/event">Event</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/api/archives/buying_accounts"> Buying accounts</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <Link to="/api/failed_orders">
              <FilterAltIcon />
              Failed orders
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/api/user_accounts">
              <AccountBoxIcon />
              User accounts
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/api/over_limit_accounts">
              <WarningIcon />
              Over limit accounts
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="#">
              <SearchIcon />
              Scrapper
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/logout">
              <PowerSettingsNewIcon />
              Logout
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default CollapsibleExample;
