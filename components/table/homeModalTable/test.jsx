import React from "react";
import Table from 'react-bootstrap/Table';

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park",
    rowSpan: 3,
  },
  {
    key: "2",
    name: "",
    // name: "John Brown",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park",
    rowSpan: 1,
  },
  {
    key: "3",
    name: "",
    //name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sydney No. 1 Lake Park",
    rowSpan: 1,
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park",
    rowSpan: 1,
  },
  {
    key: "5",
    name: "Joe Black",
    //name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park",
    rowSpan: 2,
  },
  {
    key: "6",
    name: "",
    // name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park",
    rowSpan: 1,
  },
];

const Test = () => {
  return (
    <div>
      <Table  bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
            {data.map((row,index)=>(
                 <tr key={index}>
                     {row.rowSpan>1&&<td rowSpan={row.rowSpan?row.rowSpan:1}>{row.name}</td>}
                     {row.rowSpan==1 && row.name!=''&&<td>{row.name}</td>}
                     <td>{row.age}</td>
                     <td>{row.phone}</td>
                 </tr>
            ))}
         
        </tbody>
      </Table>
    </div>
  );
};

export default Test;
