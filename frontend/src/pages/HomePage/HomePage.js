import { Home } from "@material-ui/icons";
import "./HomePage.css";
import penguin from "../../media/Logo.png";
import engineers from "../../media/engineers.jpeg";

import { Container, Grid, Button, Typography } from "@material-ui/core";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Login or Sign up to start Coding with CodeBook!!!
      </Typography>
      <div className="homepage">
        <img src={engineers} className="backgroundImage" alt="icon" />
      </div>
    </Container>
  );
};

export default HomePage;
