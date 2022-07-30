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
    // display: "block",
    // marginTop: theme.spacing.unit * 2,
    color: "#ffffff",
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
    color: "#ffffff",
    // height: 100,
  },
  inputLabelRoot: {
    color: "white",
  },
  underline: {
    height: "20",
    padding: "2",
  },
  icon: {
    marginRight: "2",
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    age: "python",
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
          {this.state.age}
          <CodeIcon className={classes.icon} />
        </Button>
        <FormControl
          className={classes.formControl}
          variant="standard"
          color="secondary"
        >
          {/* <InputLabel
            classes={{ root: classes.inputLabelRoot }}
            htmlFor="demo-controlled-open-select"
          >
           
            Language
          </InputLabel> */}
          {/* <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            // value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: "age",
              id: "demo-controlled-open-select",
            }}
            className={classes.underline}
            color="primary"
          >
            <MenuItem value={"Python"}>Python</MenuItem>
          </Select> */}
        </FormControl>
      </div>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
