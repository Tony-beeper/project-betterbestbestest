import React from "react";
import WhiteTextTypography from "../StyledMuiComponents/WhiteTypography";
function PageHeading(props) {
  return (
    <WhiteTextTypography
      variant="h3"
      align="center"
      gutterBottom
      style={{ marginTop: "1em" }}
    >
      {props.children}
    </WhiteTextTypography>
  );
}
export default PageHeading;
