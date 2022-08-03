import { Home } from "@material-ui/icons";
import "./HomePage.css";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import CodeBookIconWhite from "../../media/codebookiconwhite.png";
import PageHeading from "../../components/Headings/PageHeading";
import CodebookLink from "../../components/CodebookLink/CodebookLink";

const HomePage = () => {
    return (
        <Container maxWidth="lg">
            <PageHeading>Codebook</PageHeading>
            <div className="homepage">
                <img
                    src={CodeBookIconWhite}
                    className="backgroundImage"
                    alt="icon"
                />
                <div className="credits">
                    <CodebookLink href="/credits">Credits</CodebookLink>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
