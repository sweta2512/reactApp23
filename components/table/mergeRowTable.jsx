import React, { useState } from "react";
import { Table } from "antd";

const MergeRowTableComponent = ({ columns, data }) => {
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={{
        position: [bottom],
      }}
      scroll={{ x: "max-content" }}
    />
  );
};
export default MergeRowTableComponent;
