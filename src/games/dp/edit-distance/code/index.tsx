import { State } from "../AlgoState";
import Toolbox from "../toolbox";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { code } from "../contents";
import Container from "@mui/material/Container";
import { Divider, IconButton, Paper, Stack, styled, Toolbar, Typography } from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { useAlgoContext } from "../AlgoContext";
import Title from "../description/Title";

const Head = () => {
    const { setState } = useAlgoContext();
    return (
        <Toolbar
            sx={{
                display: "flex",
            }}
        >

            <Stack sx={{ flexGrow: 1, alignItems: "center", justifyContent: "left" }} spacing={0} direction="row">
                <IconButton>
                    <LocalCafeIcon />
                </IconButton>
                <Typography>Java</Typography>
            </Stack>

            <StyledIconButton onClick={() => setState(State.Input)}>
                <InputIcon fontSize='medium' />
            </StyledIconButton>
        </Toolbar>
    );
};

const Body = () => (
    <div style={{ padding: "0 20px", }}>
        <CodeBlock
            code={code}
            language={languages.Java}
            showLineNumbers={false}
            linesToHighlight={[]}
            wrapLines={false}
        />
    </div>
);

const StyledIconButton = styled(IconButton)(({ theme }) => ({
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
            <Title />
            <div style={{ marginBottom: "20px" }} />
            <Paper elevation={4}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Body />
                    <Divider variant='middle' />
                </Stack>
            </Paper>
        </Container>
    </>
);

export default Main;
