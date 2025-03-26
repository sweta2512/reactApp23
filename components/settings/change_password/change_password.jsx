import React, { useCallback } from "react";
import Stack from 'react-bootstrap/Stack';
import SettingChangePasswordForm from '../../form/Settings/ChangePassword/setting_change_password';

const Change_password = () => {

  
  return (
    <Stack gap={1} id="content">
      <div className="p-1"><SettingChangePasswordForm /></div>
    </Stack>
  );
};

export default Change_password;
