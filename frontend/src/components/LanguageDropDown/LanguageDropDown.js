import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import "./LanguageDropDown.css";
const styles = (theme) => ({
  root: {
    border: "0.8px solid white",
  },
  button: {
    color: "#ffffff",
  },
  formControl: {
    minWidth: 120,
    color: "#ffffff",
  },
  inputLabelRoot: {
    color: "white",
  },
  underline: {
    height: "20",
    padding: "2",
    opacity: "100",
  },
  icon: {
    marginRight: "2",
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    language: "python",
    open: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="root">
        <Button
          className={classes.button}
          onClick={this.handleOpen}
          variant="outlined"
          color="primary"
        >
          {this.state.language}
          <CodeIcon className={classes.icon} />
        </Button>
        <FormControl
          className={classes.formControl}
          variant="standard"
          color="secondary"
        ></FormControl>
      </div>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
