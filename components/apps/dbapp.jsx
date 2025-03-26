import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { style } from "./style.jsx";
import { useNavigate } from "react-router-dom";

const Dbapp = () => {
  let navigate = useNavigate();

  const handleScraperAPP = () => {
    navigate("/dbapp/scraper");
  };
  const handleDatabaseAPP = () => {
    navigate("/dbapp");
  };
  return (
    <>
      <Stack>
        <div className="header-section" style={style.headerSection}>
          <h1 style={style.textAPP}>Choose Application</h1>
        </div>
        <div style={style.contentWrapper}>
          <div style={style.buttonWrapper}>
            <Button style={style.contentButton} onClick={handleDatabaseAPP}>
              Database Application
            </Button>
            <Button style={style.contentButton} onClick={handleScraperAPP}>
              Scraper Application
            </Button>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default Dbapp;
