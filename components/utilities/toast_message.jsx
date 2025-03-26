import { Toast } from "primereact/toast";
//const toast = useRef(null);
//toast
export const showError = (MESSAGE, toast) => {
  toast.current.show({
    severity: "error",
    summary: "Error",
    detail: MESSAGE,
    life: 1500,
  });
};

export const showInfo = (MESSAGE, toast) => {
  toast.current.show({
    severity: "info",
    summary: "Info",
    detail: MESSAGE,
    life: 1500,
  });
};
export const showSuccess = (MESSAGE, toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success",
    detail: MESSAGE,
    life: 1500,
  });
};
export const showWarn =  (MESSAGE, toast) => {
  toast.current.show({
    severity: "warn",
    summary: "Warning",
    detail: MESSAGE,
    life: 1500,
  });
};
