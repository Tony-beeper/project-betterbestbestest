import React from "react";
import penguin from "../../media/Logo.png";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";
import { Container } from "@material-ui/core";

const NotFoundPage = () => {
  return (
    <Container maxWidth="lg">
      <WhiteTextTypography
        variant="h3"
        align="center"
        gutterBottom
        style={{ marginTop: "1em" }}
      >
        404 Page not found
      </WhiteTextTypography>
      <div className="homepage">
        <img src={penguin} className="backgroundImage" alt="404 not found" />
      </div>
    </Container>
  );
};

export default NotFoundPage;
