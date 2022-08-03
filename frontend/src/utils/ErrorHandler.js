import { toast } from "react-toastify";

const handleError = (response) => {
  if (response && response.data) {
    if (response.data.err) toast.error(response.data.err);
    else toast.error("No Error Message On handleError");
  } else {
    toast.error("No error Response in handleError or No data in the response");
  }
};

const handleLogin = (response) => {
  if (response && response.data) {
    if (response.data.err) toast.error(response.data.err);
    else toast.error("No Error Message On handleLogin");
  } else {
    toast.error("No error Response in handleLogin or No data in the response");
  }
};

const handleSignUp = (response) => {
  if (response && response.data) {
    if (response.data.err) toast.error(response.data.err);
    else toast.error("No Error Message On handleSignUp");
  } else {
    toast.error("No error Response in handleSignUp or No data in the response");
  }
};

export default { handleError, handleLogin, handleSignUp };
