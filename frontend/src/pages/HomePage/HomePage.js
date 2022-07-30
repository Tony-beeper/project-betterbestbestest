import { Home } from "@material-ui/icons";
import "./HomePage.css";
import penguin from "../../media/Logo.png";
import engineers from "../../media/engineers.jpeg";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import CodeBookIconWhite from "../../media/codebookiconwhite.png";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <WhiteTextTypography
        variant="h3"
        align="center"
        gutterBottom
        style={{ marginTop: "1em" }}
      >
        CodeBook
      </WhiteTextTypography>
      <div className="homepage">
        <img src={CodeBookIconWhite} className="backgroundImage" alt="icon" />
      </div>
    </Container>
  );
};

export default HomePage;
