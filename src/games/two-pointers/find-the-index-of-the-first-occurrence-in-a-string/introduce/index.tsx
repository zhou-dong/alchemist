import React from 'react';
import Sections from "./Sections";
import Title from "./Title";
import { Container, Divider } from "@mui/material";
import Welcome from "./Welcome";
import { statments } from './Statements';

const Main = () => {

    const [statmentIndex, setStatementIndex] = React.useState(-1);

    return (
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
            <Welcome />
            <Divider variant="middle" />
            <Sections
                statmentIndex={statmentIndex}
                setStatementIndex={setStatementIndex}
                statements={statments}
            />
        </Container>
    );
};

export default Main;
