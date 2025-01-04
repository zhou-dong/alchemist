import { State } from "../AlgoState";
import Toolbox from "../toolbox";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import CodeIcon from '@mui/icons-material/Code';
import { formula } from "../contents";
import Container from "@mui/material/Container";
import { Divider, IconButton, Paper, Stack, styled, Toolbar, Typography } from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import { useAlgoContext } from "../AlgoContext";
import Title from "../description/Title";

const Head = () => (
    <Toolbar
        variant='dense'
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left"
        }}
    >
        <Typography>Core Code (Typescript)</Typography>
    </Toolbar>
);

const Body = () => (
    <div style={{ padding: "0 20px", }}>
        <CodeBlock
            code={formula}
            language={languages.Typescript}
            showLineNumbers={false}
            linesToHighlight={[]}
            wrapLines={false}
        />
    </div>
);

const Next = () => {
    const { setState } = useAlgoContext();
    return (
        <Toolbar
            variant='dense'
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
            }}
        >
            <StyledIconButton onClick={() => setState(State.Input)}>
                <InputIcon fontSize='medium' />
            </StyledIconButton>
        </Toolbar>
    );
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    width: 60,
    height: 60,
    border: "1px solid lightgray",
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
}));

const Main = () => (
    <>
        <Toolbox current={State.DisplayCode} />
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Title icon={<CodeIcon />} />
            <div style={{ marginBottom: "20px" }} />
            <Paper elevation={4}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Body />
                    <Divider variant='middle' />
                    <Next />
                </Stack>
            </Paper>
        </Container>
    </>
);

export default Main;
