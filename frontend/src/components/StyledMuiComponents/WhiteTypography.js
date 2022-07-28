import { withStyles } from "@material-ui/core/styles";
import { Typography, createTheme } from "@material-ui/core";

const WhiteTextTypography = withStyles({
  root: {
    color: "#c8d1d9",
  },
})(Typography);

export default WhiteTextTypography;
