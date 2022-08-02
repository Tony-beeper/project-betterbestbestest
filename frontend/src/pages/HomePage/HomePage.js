import { Home } from "@material-ui/icons";
import "./HomePage.css";
import penguin from "../../media/Logo.png";
import engineers from "../../media/engineers.jpeg";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import CodeBookIconWhite from "../../media/codebookiconwhite.png";
import PageHeading from "../../components/Headings/PageHeading";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeading>Codebook</PageHeading>
      <div className="homepage">
        <img src={CodeBookIconWhite} className="backgroundImage" alt="icon" />
      </div>
    </Container>
  );
};

export default HomePage;
