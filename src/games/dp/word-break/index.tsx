import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { Button, ButtonGroup, ThemeProvider, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import { addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint } from "./init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getLastPoint, getNextPoint } from "./update";
import { errorStyle, helperStyle } from "../_commons/styles";
import Table from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';
import info from "./info";

const arrayShuffle = (array: Array<any>): Array<any> => {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(array, i, j);
    }
    return array;
};

const swap = (array: Array<any>, i: number, j: number) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

const stringShuffle = (str: string): string => arrayShuffle(str.split('')).join('');
const random = (max: number) => Math.floor(Math.random() * max);
const input = 'itisanice';
const dictionary = ["a", "an", "i", "ice", "is", "it", "nice"];

const Dict = () => {

    const words = dictionary.map((word, index) => {
        return (
            <Button key={index} sx={{ color: "gray", borderColor: "gray", textTransform: 'none' }}>
                {word}
            </Button>
        )
    })

    return (
        <div style={{ margin: "20px 0" }}>
            <ButtonGroup>
                <Button >
                    Dictionary:
                </Button>
                {words}
            </ButtonGroup>
        </div>
    );
}

const buildData = () => {
    let sentence = stringShuffle(input);
    if (random(3) === 2) {
        sentence = input;
    }

    const table = createTableMatrix(sentence, dictionary);
    const tableStyles = createTableStyles(sentence, dictionary);
    const buttons = createButtons(sentence, dictionary);
    const buttonsStyles = createButtonsStyles(sentence, dictionary);
    const comparedTable = createComparedTable(sentence, dictionary);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable };
}

const EditDistance = () => {

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);
    const [currentPoint, setCurrentPoint] = React.useState(startPoint);
    const [length, setLength] = React.useState(1);

    const data = buildData();
    const [table, setTable] = React.useState(data.table);
    const [tableStyles, setTableStyles] = React.useState(data.tableStyles);
    const [buttons, setButtons] = React.useState(data.buttons);
    const [buttonsStyles, setButtonsStyles] = React.useState(data.buttonsStyles);
    const [comparedTable, setComparedTable] = React.useState(data.comparedTable);

    const handleRefresh = () => {
        setSteps(0);
        setErrors(0);
        setSuccess(false);
        setCurrentPoint(startPoint);

        const data = buildData();
        setTable(data.table);
        setTableStyles(data.tableStyles);
        setButtons(data.buttons);
        setButtonsStyles(data.buttonsStyles);
        setComparedTable(data.comparedTable);
    }

    const handleClick = (value: boolean) => {
        if (success) {
            return;
        }

        setSteps(steps => steps + 1);

        if (nonCorrect(comparedTable, currentPoint, value)) {
            setTable((t) => updateTable(t, currentPoint, value));
            setErrors(errors => errors + 1);
            setTableStyles(tableStyles => {
                tableStyles[currentPoint.row][currentPoint.col] = errorStyle;
                return tableStyles;
            })
            return;
        }

        if (isLastCell(table, currentPoint)) {
            setTable((t) => updateTable(t, currentPoint, value));

            setTableStyles(() => {
                const lastCell = getLastPoint(table);
                const newTableStyles = createNewTableStyles(tableStyles);
                newTableStyles[lastCell.row][lastCell.col] = helperStyle;
                return newTableStyles;
            });

            setSuccess(true);
            return;
        }

        const nextPoint = getNextPoint(table, currentPoint, length);

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
        setLength(nextPoint.length);
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <Typography
                        variant='body1'
                        sx={{ marginTop: "100px" }}
                    >
                        {title}
                    </Typography>
                    <div style={{ marginTop: "25px" }}>
                        <Steps steps={steps} />
                        <Errors errors={errors} />
                        <Description
                            success={success}
                            title={title}
                            example={example}
                            usecases={usecases}
                            description={description}
                        />
                        <Formula title={title} formula={formula} />
                        <Refresh handleRefresh={handleRefresh} />
                    </div>
                    <Dict />
                    <Table table={table} tableStyles={tableStyles} />
                    <div style={{ marginTop: "20px" }}>
                        <Buttons
                            buttons={buttons}
                            buttonsStyles={buttonsStyles}
                            handleButtonClick={function (data: number | string | boolean) {
                                handleClick(Boolean(data))
                            }}
                        />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default EditDistance;
