import React, { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import PluginUserForm from "../../form/Settings/PluginUser/plugin_userForm";
import Table from '../../table/table';
import {pluginUserMainTable} from '../../../store/reducer/Settings/PluginUser/pluginUserSlice';
import { showModal } from "../../../store/reducer/Modal/showAndHideModal";
import {purchaseDetailAction} from "../../../store/reducer/Purchase/purchaseSlice";
import { getDate} from "../../../services/helper";

const Plugin_user = () => {
  const dispatch = useDispatch();
  const {tableData} = useSelector((state)=>state.pluginUser)
  console.log(tableData,'plugin users')
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(tableData.result);
  }, [tableData]); 

 
  useEffect(()=>{
    dispatch(pluginUserMainTable())
  },[dispatch])

  // lastPurchasedBodyTemplate

  const lastPurchasedBodyTemplate = (rowData, column) => {
    return (
      <>
        {rowData.last_purchase ? (
          <Button
            type="button"
            className="btn link"
            id="forgetButton"
            onClick={() => {
              lastPurchaseHandler(rowData);
            }}
          >
            {rowData.last_purchase}
          </Button>
        ) : (
          "NA"
        )}
      </>
    );
  };

  const lastPurchaseHandler = ()=>{

  }

  // columns define here
  const columns = [
    {
      field: "display_name",
      header: "User Name",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData.display_name ? (
              <Button
                type="button"
                //className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(
                    showModal({ data: rowData, modal: "plugin_user_name" })
                  );
                }}
              >
                {rowData.display_name}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "email",
      header: "Email Address",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData.email ? (
              <Button
                type="button"
                //className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(
                    showModal({ data: rowData, modal: "plugin_user_email" })
                  );
                }}
              >
                {rowData.email}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    {
      field: "last_purchase",
      header: "Last Purchased",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined &&
            rowData !== null &&
            rowData.last_purchase ? (
              <Button
                type="button"
                //className="btn link"
                id="forgetButton"
                onClick={() => {
                  // dispatch(
                  //   showModal({ data: rowData, modal: "plugin_last_purchase" })
                  // );

                  let date = getDate(rowData?.last_purchase);
                  dispatch(
                    purchaseDetailAction({
                      pluginUserID: rowData?.id,
                      date: date,
                      dataType: "last",
                    })
                  ).then((response) => {                   
                    dispatch(showModal({ data: rowData, modal: "plugin_last_purchase" }));
                  });
                }}
              >
                { rowData.last_purchase}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
      //body: lastPurchasedBodyTemplate,
    },
  ];

  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <PluginUserForm/>
      </div>
      <div className="p-1">
            <Table columns={columns} data={users} page={'plugin_user'}/>
      </div>
    </Stack>
  );
};

export default Plugin_user;
