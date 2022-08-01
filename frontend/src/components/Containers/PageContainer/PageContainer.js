import { Container } from "@material-ui/core";

function PageContainer(props) {
  return (
    <Container
      maxWidth="lg"
      style={{ display: "flex", justifyContent: "center", paddingTop: "5em" }}
    >
      {props.children}
    </Container>
  );
}
export default PageContainer;
