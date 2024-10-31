import * as React from 'react';
import { title } from "../introduce/Title";
import { Container, Divider, IconButton, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint } from "../init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getLastCell, getNextPoint } from "../update";
import { errorStyle, helperStyle } from "../../../dp/_commons/styles";
import Table from '../../../dp/_components/Table';
import Buttons from '../../../dp/_components/Buttons';
import { CheckCircleOutline } from '@mui/icons-material';
import Introduction from '../Introduction';
import { useAlgoContext } from '../AlgoContext';
import Code from '../Code';
import { contents, DisplayContents } from '../introduce/Contents';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';

const Intro = () => {
    const { setDisplayContents } = useAlgoContext();

    return (
        <Container
            maxWidth="lg"
            sx={{
                position: "fixed",
                top: '50%',
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 1,
            }}
        >
            <Draggable>
                <Paper
                    elevation={4}
                    style={{
                        padding: "15px",
                        borderRadius: '15px',
                    }}
                >
                    <Toolbar variant='dense' sx={{ display: "flex" }}>
                        <IconButton color='info'>
                            <DragIndicatorIcon fontSize='medium' />
                        </IconButton>
                        <div style={{ flexGrow: 1 }}>
                        </div>
                        <IconButton onClick={() => setDisplayContents(false)}>
                            <CloseIcon fontSize='medium' color='warning' />
                        </IconButton>
                    </Toolbar>

                    <Divider variant='middle' />

                    <DisplayContents contentIndex={contents.length - 1} contents={contents} />
                </Paper>
            </Draggable>
        </Container>
    );
};

const bases = 'ACGT';
const random = (max: number) => Math.floor(Math.random() * max);

const createRandom = (): string => {
    return Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
}

const buildData = () => {
    const stringOne = createRandom();
    const stringTwo = createRandom();
    const table = createTableMatrix(stringOne, stringTwo);
    const tableStyles = createTableStyles(stringOne, stringTwo);
    const buttons = createButtons(stringOne, stringTwo);
    const buttonsStyles = createButtonsStyles(stringOne, stringTwo);
    const comparedTable = createComparedTable(stringOne, stringTwo);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable };
}

const Main = () => {

    const { displayCode, displayContents } = useAlgoContext();

    const [success, setSuccess] = React.useState(false);
    const [currentPoint, setCurrentPoint] = React.useState(startPoint);

    const data = buildData();
    const [table, setTable] = React.useState(data.table);
    const [tableStyles, setTableStyles] = React.useState(data.tableStyles);
    const [buttons, setButtons] = React.useState(data.buttons);
    const [buttonsStyles, setButtonsStyles] = React.useState(data.buttonsStyles);
    const [comparedTable, setComparedTable] = React.useState(data.comparedTable);

    const handleRefresh = () => {
        setSuccess(false);
        setCurrentPoint(startPoint);

        const data = buildData();
        setTable(data.table);
        setTableStyles(data.tableStyles);
        setButtons(data.buttons);
        setButtonsStyles(data.buttonsStyles);
        setComparedTable(data.comparedTable);
    }

    const handleClick = (value: number) => {
        if (success) {
            return;
        }

        if (nonCorrect(comparedTable, currentPoint, value)) {
            setTable((t) => updateTable(t, currentPoint, value));
            setTableStyles(tableStyles => {
                tableStyles[currentPoint.row][currentPoint.col] = errorStyle;
                return tableStyles;
            })
            return;
        }

        if (isLastCell(table, currentPoint)) {
            setTable((t) => updateTable(t, currentPoint, value));

            setTableStyles(() => {
                const lastCell = getLastCell(table);
                const newTableStyles = createNewTableStyles(tableStyles);
                newTableStyles[lastCell.row][lastCell.col] = helperStyle;
                return newTableStyles;
            });

            setSuccess(true);
            return;
        }

        const nextPoint = getNextPoint(table, currentPoint);

        setTable((t) => {
            const t1 = updateTable(t, currentPoint, value);
            const t2 = updateTable(t1, nextPoint, "?");
            return t2;
        })

        setTableStyles(() => {
            const newTableStyles = createNewTableStyles(tableStyles);
            addHelperStyles(newTableStyles, nextPoint)
            return newTableStyles;
        });

        setCurrentPoint(nextPoint);
    }

    return (
        <>
            {displayContents && <Intro />}
            <Introduction />
            <Stack
                direction="column"
                spacing={5}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
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
                    {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title} <DragIndicatorIcon color="info" />
                </Typography>

                <Table
                    table={table}
                    tableStyles={tableStyles}
                />

                <Buttons
                    buttons={buttons}
                    buttonsStyles={buttonsStyles}
                    handleButtonClick={function (data: number | string | boolean) {
                        handleClick(Number(data))
                    }}
                />
            </Stack>

            {displayCode && <Code />}
        </>
    );
}

export default Main;
