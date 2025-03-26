import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import NotificationForm from "../../form/Settings/Notifications/notifications";

const Notifications = () => {
  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <NotificationForm />
      </div>

      <div className="p-2"></div>
    </Stack>
  );
};

export default Notifications;
