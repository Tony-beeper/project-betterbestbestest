import { toast } from "react-toastify";

const handleError = (response) => {
  if (response && response.data) {
    if (response.data.err) toast.error(response.data.err);
    else toast.error("something went wrong...");
  } else {
    toast.error("something went wrong...");
  }
};

const handleLogin = (response) => {
  if (response && response.data) {
    if (response.data) toast.error(response.data.message);
    else toast.error("something went wrong...");
  } else {
    toast.error("something went wrong...");
  }
};

export default { handleError, handleLogin };
