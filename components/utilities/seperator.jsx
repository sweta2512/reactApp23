import React from "react";
import { Input, Space } from "antd";
const Testing = () => (
  <Space direction="vertical">
    <Space.Compact block>
      <Input
        className="site-input-split"
        style={{
          width: 40,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: "none",
        }}
        placeholder="to"
        disabled
      />
    </Space.Compact>
  </Space>
);
export default Testing;
