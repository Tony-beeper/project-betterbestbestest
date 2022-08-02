import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 210,
    marginTop: 30,
    border: "1px solid #2f363d",
    background: "#010409",
    borderRadius: 6,
  },
  root_my: {
    minWidth: 220,
    minHeight: 250,
    marginTop: 30,
  },
  background_blue: {
    marginTop: 10,
    // background: "linear-gradient(to right,  #2980B9, #6DD5FA)",
    background: "#3f51b5",
    border: 0,
    color: "white",
  },
  background_red: {
    marginTop: 10,
    background: "#f44336",
    color: "white",
  },
  title: {
    fontSize: 28,
    color: "#c9d1d9",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  pos: {
    marginBottom: 12,
    color: "#c9d1d9",
  },
}));

export default useStyles;
