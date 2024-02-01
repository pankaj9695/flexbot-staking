import { toast } from "react-toastify";

const notifyInfo = (message) => {
  toast("🦄" + message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    progress: undefined,
  });
};

const notifyError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    progress: undefined,
  });
};

export { notifyInfo, notifyError };
