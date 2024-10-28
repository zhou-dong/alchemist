import Sections from "./Sections";
import Title from "./Title";
import { Container, Divider } from "@mui/material";

const Main = () => (
    <Container
        maxWidth="lg"
        sx={{
            // marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh"
        }}
    >
        <div>
            <Title />
            <Divider variant="middle" />
        </div>

        <Sections />
    </Container>
);

export default Main;
