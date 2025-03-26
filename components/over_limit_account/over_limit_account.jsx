import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Table from "../table/tablewithoutcheckbox";
import { CustomerService } from "../../services/customerservice";
import OverLimitAccountsForm from "../form/OverLimitAccount/over_limit_accounts_form";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { showModal } from "../../store/reducer/Modal/showAndHideModal";
import {getOverLimitAccountsMainTable , getOverLimitAccountsFormData , userLimitErrorHistory, successfulOrderHistory} from "../../store/reducer/OverLimitAccount/overLimitAccountSlice";


const Over_limit_account = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {table_data, filters} =  useSelector((state)=>state.overLimitAccount);
  useEffect(()=>{
    dispatch(getOverLimitAccountsFormData())
  },[dispatch])

  
  useEffect(()=>{
    dispatch(getOverLimitAccountsMainTable(filters))
  },[filters,dispatch])

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

console.log(table_data,'table_data')
  useEffect(()=>{
    setData(table_data)
  },[table_data])




  const getCustomers = (data) => {  
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

 

  //   Define columns here
  const columns = [
    { field: "sn", header: "SN", body: (rowData, rowIndex)=>{return rowIndex.rowIndex + 1} },
    { field: "Event Date", header: "Market Place" },
    { field: "company", header: "User Name" },
    { field: "Tickets Purchase Limit", header: "PW" },
    { field: "Total Tickets Purchased", header: "Credit Card" },
    {
      field: "company",
      header: "Number of over limit",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.company ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(userLimitErrorHistory({fromDate:'',toDate:'', dataID:''})).then((response) => {
                    dispatch(
                      showModal({
                        modal: "over_limit_account/noOfOverLimit",
                        data: rowData,
                      })
                    );
                  });
                }}
              >
                {rowData?.company}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    { field: "Ticket Location", header: "First over limit" },
    {
      field: "company",
      header: "Number of successful order between over limit",
      body: (rowData) => {
        return (
          <>
            {rowData !== undefined && rowData !== null && rowData?.company ? (
              <Button
                type="button"
                className="btn link"
                id="forgetButton"
                onClick={() => {
                  dispatch(successfulOrderHistory({fromDate:'',toDate:'', dataID:''})).then((response) => {
                    dispatch(
                      showModal({
                        modal:
                          "over_limit_account/noOfSuccessfulOrderOverLimit",
                        data: rowData,
                      })
                    );
                  });
                }}
              >
                {rowData?.company}
              </Button>
            ) : (
              "_"
            )}
          </>
        );
      },
    },
    { field: "Ticket Location2", header: "Last over limit date" },
  ];

  return (
    <Stack gap={1} id="content">
      <div className="p-1">
        <OverLimitAccountsForm />
      </div>
      <div className="p-1">
        <Table data={customers} columns={columns} page={'over_limit_account'}/>
      </div>
    </Stack>
  );
};

export default Over_limit_account;
