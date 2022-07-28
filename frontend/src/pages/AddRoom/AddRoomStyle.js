import { makeStyles } from "@material-ui/core/styles";

const AddRoomStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
  },
  background_blue: {
    marginTop: 10,
    background: "linear-gradient(to right,  #2980B9, #6DD5FA)",
    border: 0,
    color: "white",
    borderRadius: 3,
  },
  textField: {
    marginBottom: 10,
  },
  input: {
    color: "white",
  },
});

export default AddRoomStyle;
