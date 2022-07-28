import React from "react";
import { Button } from "@material-ui/core";

function CodeBookButton(props) {
  return (
    <Button
      size="large"
      primary={true}
      type="submit"
      variant="contained"
      label="submit"
      style={{
        margin: "25px 0 15px 0",
        borderRadius: "6px",
        backgroundColor: "#226feb",
        padding: "9px 18px",
        fontSize: "18px",
        color: "white",
      }}
    >
      {props.children}
    </Button>
  );
}

export default CodeBookButton;
