import Sections from "./Sections";
import Title from "./Title";
import { Container, Divider } from "@mui/material";

const Main = () => (
    <Container
        maxWidth="lg"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh"
        }}
    >
        <Title />
        <Divider variant="middle" />
        <Sections />
    </Container>
);

export default Main;
