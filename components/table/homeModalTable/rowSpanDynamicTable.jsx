// import Table from 'react-bootstrap/Table';

// // In the fifth row, other columns are merged into first column
// // by setting it's colSpan to be 0

// // Usage example

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     tel: "0571-22098909",
//     phone: 18889898989,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "John Brown",
//     tel: "0571-22098333",
//     phone: 18889898888,
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "John Brown",
//     //name: "Joe Black",
//     age: 32,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Joe Black",
//     //name: "Jim Red",
//     age: 18,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "London No. 2 Lake Park",
//   },
//   {
//     key: "5",
//     name: "Joe Black",
//     // name: "Jake White",
//     age: 18,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Dublin No. 2 Lake Park",
//   },
//   {
//     key: "6",
//     //name: "Joe Black",
//     name: "Jake White",
//     age: 18,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Dublin No. 2 Lake Park",
//   },
//   {
//     key: "7",
//     name: "Joe Black",
//     //name: "Jake White",
//     age: 18,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Dublin No. 2 Lake Park",
//   },
//   {
//     key: "8",
//     name: "Joe Black",
//     //name: "Jake White",
//     age: 18,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Dublin No. 5 Lake Park",
//   },
//   {
//     key: "9",
//     name: "Joe Black",
//     //name: "Jake White",
//     age: 98,
//     tel: "0575-22098909",
//     phone: 18900010002,
//     address: "Dublin No. 5 Lake Park",
//   },
// ];
// let processData = () => {
//   let datanew = [];
//   let CurrentRowSpan = 1;
//   let prevName = "";
//   let consecutiveNamesCount = 1;
//   let keys=[];

//   data.forEach((row, index) => {
//     let currentName = row.name;

//     if (currentName === prevName) {
//       keys.push(index)
//       prevName = currentName;
//       consecutiveNamesCount++;
//       console.log(keys,'keys')
//       //datanew[index - consecutiveNamesCount].namerowSpan = consecutiveNamesCount;
//       datanew[index - 1].namerowSpan += 1;
//       row.name = "";
//       datanew.push(row);
//     } else {
//       keys=[]
//       prevName = currentName;
//       row.namerowSpan = 1;
//       consecutiveNamesCount = 1;
//       datanew.push(row);
//     }
//   });
//   return datanew;
// };

// let prodata = processData();
// console.log(prodata, "newdtaaaaaa");

// const DataTableTest = () => {

//   return (
//     <>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {prodata.map((row, index) => (
//             <tr key={index}>
//               {row.namerowSpan > 1 && (
//                 <td rowSpan={row.namerowSpan ? row.namerowSpan : 1}>{row.name}</td>
//               )}
//               {row.namerowSpan == 1 && row.name != "" && <td>{row.name}</td>}
//               <td>{row.age}</td>
//               <td>{row.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </>
//   );
// };
// export default DataTableTest;

// const TableRow = ({ rowData }) => {};

import React,{useState} from "react";
import { Table } from "antd";
//import id from "date-fns/esm/locale/id/index.js";

// const data = [
//   { key: "1", name: "John Doe", age: 32, phone: 123456 },
//   { key: "2", name: "Jane Smith", age: 32, phone: 123456 },
//   { key: "3", name: "John Doe", age: 32, phone: 123456 },
//   { key: "4", name: "John Doe", age: 28, phone: 123456 },
//   { key: "5", name: "Alice Johnson", age: 46, phone: 123456 },
//   { key: "6", name: "Alice Johnson", age: 47, phone: 123456 },
//   { key: "7", name: "Alice Johnson", age: 45, phone: 123456 },
// ];

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text, record, index) => {
//       // const rowSpan = data.filter((item, idx) => idx < index && item.name === text).length + 1;
//       const rowSpan = calculateRowSpan(data, index, "name");
//       return {
//         children: text,
//         props: { rowSpan },
//       };
//     },
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//     render: (text, record, index) => {
//       // const rowSpan = data.filter((item, idx) => idx < index && item.name === text).length + 1;
//       const rowSpan = calculateRowSpan(data, index, "age");
//       return {
//         children: text,
//         props: { rowSpan },
//       };
//     },
//   },
//   {
//     title: "Phone",
//     dataIndex: "phone",
//     key: "phone",
//     render: (text, record, index) => {
//       // const rowSpan = data.filter((item, idx) => idx < index && item.name === text).length + 1;
//       const rowSpan = calculateRowSpan(data, index, "phone");
//       return {
//         children: text,
//         props: { rowSpan },
//       };
//     },
//   },
// ];

// const calculateRowSpan = (data, index, key) => {
//   const currentValue = data[index][key];
//   let rowSpan = 1;
//   console.log(data, "datata", index, "  ", currentValue, "currentValue", key);
//   for (let i = index + 1; i < data.length; i++) {
//     if (data[i][key] === currentValue) {
//       rowSpan++;
//     } else {
//       break;
//     }
//   }

//   for (let i = index - 1; i >= 0; i--) {
//     if (data[i][key] === currentValue) {
//       return 0;
//     } else {
//       break;
//     }
//   }
//   return rowSpan;
// };

export const DataTable = ({ columns, data }) => {
  const [top, setTop] = useState('topLeft');
  const [bottom, setBottom] = useState('bottomRight');
  return (
    <Table
      className="cstm-table-purchased"
      columns={columns}
      dataSource={data}
      bordered
      pagination={{
        position: [bottom],
      }}
      scroll={{x:'max-content'}}
    />
  );
};
