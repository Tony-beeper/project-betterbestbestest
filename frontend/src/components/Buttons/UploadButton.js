//   <Button variant="contained" color="primary" onClick={handleClickOpen}>
//   Upload file
// </Button>

import React from "react";
import { Button } from "@material-ui/core";

function UploadButton(props) {
  return (
    <Button
      primary={true}
      type="submit"
      variant="contained"
      style={{
        // margin: "12px 0 12px 0",

        borderRadius: "6px",
        backgroundColor: "#696969",
        // padding: "4px 36px",
        // fontSize: "12px",
        color: "white",
      }}
    >
      {props.children}
    </Button>
  );
}

export default UploadButton;
