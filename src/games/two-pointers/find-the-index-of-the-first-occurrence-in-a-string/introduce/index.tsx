import Sections from "./Sections";
import Title from "./Title";
import { Container, Divider } from "@mui/material";

const Main = () => (
    <Container
        maxWidth="lg"
        sx={{
            marginTop: "20px",
        }}
    >
        <Title />
        <Divider variant="middle" />
        <Sections />
    </Container>
);

export default Main;
