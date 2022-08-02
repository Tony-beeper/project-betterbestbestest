import React from "react";
import WhiteTextTypography from "../StyledMuiComponents/WhiteTypography";
function SectionHeading(props) {
  return (
    <WhiteTextTypography
      variant="h4"
      align="center"
      gutterBottom
      style={{ marginTop: "0.6em" }}
    >
      {props.children}
    </WhiteTextTypography>
  );
}
export default SectionHeading;
