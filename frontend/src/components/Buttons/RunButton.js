import React from "react";
import { Button } from "@material-ui/core";

function RunButton(props) {
  return (
    <Button
      {...props}
      primary={true}
      type="submit"
      variant="contained"
      style={{
        margin: "12px 0 12px 0",
        borderRadius: "6px",
        backgroundColor: "#FFD700",
        padding: "4px 36px",
        fontSize: "12px",
        color: "black",
      }}
    >
      {props.children}
    </Button>
  );
}

export default RunButton;
