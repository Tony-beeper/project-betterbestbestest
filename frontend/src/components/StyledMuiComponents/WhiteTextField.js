import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const WhiteTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "#fff", // Text color
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#fff", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff", // Solid underline on focus
    },
    "& .Mui-error": {
      color: "red",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
      textAlign: "center",
    },

    width: "85%",
  },
})(TextField);

export default WhiteTextField;
