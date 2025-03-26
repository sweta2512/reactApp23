import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Dropdown } from "primereact/dropdown";
import {
  getNotificationFormData,
  saveNotificationData,
} from "../../../../store/reducer/Settings/Notifications/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { ucfirst } from "../../../../services/helper";
import { showError, showSuccess } from "../../../utilities/toast_message";
import { Toast } from "primereact/toast";

const NotificationForm = () => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.notification);
  let toast = useRef(null);
  const adminRef = useRef();
  const transationRef = useRef([]);
  const userRequestedForLoginRef = useRef([]);
  const userEnabledRef = useRef([]);

  const [isChange, setIsChange] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [selectedLoginRequet, setSelectedLoginRequest] = useState([]);
  const [selectedUserEnableDisable, setSelectedUserEnableDisable] = useState(
    []
  );

  useEffect(() => {
    dispatch(getNotificationFormData());
  }, [dispatch]);

  useEffect(() => {
    let transaction = formData?.result?.transaction?.selected;
    let user_enabled_disabled =
      formData?.result?.user_enabled_disabled?.selected;
    let user_requested_for_login =
      formData?.result?.user_requested_for_login?.selected;

    setSelectedTransaction(
      {
        code: transaction,
        name: ucfirst(transaction),
      } || []
    );
    setSelectedLoginRequest(
      {
        code: user_requested_for_login,
        name: ucfirst(user_requested_for_login),
      } || []
    );
    setSelectedUserEnableDisable(
      {
        code: user_enabled_disabled,
        name: ucfirst(user_enabled_disabled),
      } || []
    );
  }, [formData]);

  // set dropdpwn data in its format
  useMemo(() => {
    let transaction = formData?.result?.transaction;
    let user_enabled_disabled = formData?.result?.user_enabled_disabled;
    let user_requested_for_login = formData?.result?.user_requested_for_login;

    transationRef.current = transaction?.options?.map((value, index) => {
      // let arr = value?.split(", ");
      return {
        name: ucfirst(value[0]),
        code: value[0],
      };
    });

    userRequestedForLoginRef.current = user_enabled_disabled?.options?.map(
      (value, index) => {
        // let arr = value?.split(", ");
        return {
          name: ucfirst(value[0]),
          code: value[0],
        };
      }
    );
    userEnabledRef.current = user_requested_for_login?.options?.map(
      (value, index) => {
        // let arr = value?.split(", ");
        return {
          name: ucfirst(value[0]),
          code: value[0],
        };
      }
    );
  }, [formData]);

  //handle option change
  const handleChange = useCallback(() => {
    dispatch(
      saveNotificationData({
        transactions: selectedTransaction.code,
        userRequestedForLogin: selectedLoginRequet.code,
        userEnabledDisabled: selectedUserEnableDisable.code,
      })
    ).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showError(response.payload.message, toast);
      }

      if (response.meta.requestStatus === "fulfilled") {
        showSuccess(response.payload.message, toast);
      }
    });
  }, [
    selectedLoginRequet,
    selectedUserEnableDisable,
    selectedTransaction,
    dispatch,
  ]);

  //call handle change when option changes
  useEffect(() => {
    if (isChange) {
      handleChange();
    }
  }, [
    selectedUserEnableDisable,
    selectedLoginRequet,
    selectedTransaction,
    handleChange,
    isChange,
  ]);

  return (
    <>
      <Toast ref={toast} />
      <Container style={{ marginLeft: "10px" }}>
        <Form>
          <Form.Group className="mb-3" controlId="adminId">
            <Form.Control type="hidden" value={"testing"} ref={adminRef} />
          </Form.Group>
        </Form>
        <Row>
          <Col className="rightForm">
            <Row style={{ marginBottom: "9px" }}>
              <Col sm={4}>
                <span style={{ fontSize: "13px" }}>Transactions</span>
              </Col>
              <Col sm={8}>
                <Dropdown
                  value={selectedTransaction}
                  onChange={(e) => {
                    setIsChange(true);
                    setSelectedTransaction(e.value);
                  }}
                  options={transationRef.current}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem"
                  style={{ width: "420px", height: "39px" }}
                  name="transactions"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="rightForm">
            <Row style={{ marginBottom: "9px" }}>
              <Col sm={4}>
                <span style={{ fontSize: "13px" }}>
                  User requested for login
                </span>
              </Col>
              <Col sm={8}>
                <Dropdown
                  value={selectedLoginRequet}
                  onChange={(e) => {
                    setIsChange(true);
                    setSelectedLoginRequest(e.value);
                  }}
                  options={userRequestedForLoginRef.current}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem"
                  style={{ width: "420px", height: "39px" }}
                  name="userRequestedForLogin"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="rightForm">
            <Row style={{ marginBottom: "9px" }}>
              <Col sm={4}>
                <span style={{ fontSize: "13px" }}>User enabled/disabled</span>
              </Col>
              <Col sm={8}>
                <Dropdown
                  value={selectedUserEnableDisable}
                  onChange={(e) => {
                    setIsChange(true);
                    setSelectedUserEnableDisable(e.value);
                  }}
                  options={userEnabledRef.current}
                  optionLabel="name"
                  placeholder="Select a Country"
                  filter
                  className="w-full md:w-14rem"
                  style={{ width: "420px", height: "39px" }}
                  name="userEnabledDisabled"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default NotificationForm;
