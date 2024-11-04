import * as React from 'react';
import { title } from "../introduction/Title";
import { Container, IconButton, Paper, Stack, styled, Toolbar, Typography, useTheme } from '@mui/material';
import { addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint } from "./init";
import { errorStyle, helperStyle } from "../../../dp/_commons/styles";
import Table from '../../../dp/_components/Table';
import Buttons from '../../../dp/_components/Buttons';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAlgoContext } from '../AlgoContext';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MouseIcon from '@mui/icons-material/Mouse';

const Header: React.FC<{ lock: boolean, setLock: React.Dispatch<React.SetStateAction<boolean>> }> = ({ lock, setLock }) => {
    const { setDisplayGame } = useAlgoContext();

    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton color='info' disabled={lock}>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
            <IconButton onClick={() => setLock(open => !open)}>
                {lock ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
            </IconButton>
            <div style={{ flexGrow: 1 }} />
            <IconButton onClick={() => setDisplayGame(false)}>
                <CloseIcon fontSize='medium' color='warning' />
            </IconButton>
        </Toolbar>
    );
};

const Location = styled(Container)(({ theme }) => (({
    position: "fixed",
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
})));

const Main = () => {

    const theme = useTheme();
    const { table, setTable, tableStyle, steps, setSteps, index, setIndex } = useAlgoContext();


    const [lock, setLock] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleClick = () => {
        if (success) {
            return;
        }

        console.log(index, steps);

        const step = steps[index];
        const { row, col } = step;
        table[row + 2][col + 2] = "-";
        setTable(table);
        setIndex(index + 1);
    }

    const Body = () => (
        <Stack
            direction="column"
            spacing={5}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                variant='h5'
                display="inline-flex"
                sx={{
                    verticalAlign: 'middle',
                    fontWeight: 300,
                }}
            >
                {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title}
            </Typography>

            <Table
                table={table}
                tableStyles={tableStyle}
            />

            <IconButton onClick={handleClick} size='large' color='primary'

                sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: theme.palette.primary.light,
                    borderColor: theme.palette.primary.light,
                    color: "#fff",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        color: "#fff",
                    },
                    '&&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                        borderColor: theme.palette.primary.dark,
                        color: "#fff",
                    },
                }}
            >
                <MouseIcon />
            </IconButton>
        </Stack>
    );

    return (
        <Location>
            <Container maxWidth="lg">
                <Draggable disabled={lock}>
                    <Paper
                        elevation={4}
                        sx={{
                            padding: "10px 0",
                            paddingBottom: "10%",
                            borderRadius: " 15px",
                        }}
                    >
                        <Header lock={lock} setLock={setLock} />
                        <Body />
                    </Paper>
                </Draggable>
            </Container>
        </Location>
    );
}

export default Main;
