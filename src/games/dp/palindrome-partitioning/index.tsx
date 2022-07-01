import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { ThemeProvider, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import {
    addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint,
    createPalindromeTable, createPalindromeTableStyles, addHelperStylesToPalindromeTable
} from "./init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getNext } from "./update";
import { errorStyle, helperStyle } from "../_commons/styles";
import Table from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';

const size = 6;
const random = (sequence: string): string => {
    const index = Math.floor(Math.random() * sequence.length);
    return sequence.charAt(index);
};

const buildData = () => {
    const sequence = 'abcd';
    const input = Array(size).fill(sequence).map(random).join('');

    const table = createTableMatrix(input);
    const tableStyles = createTableStyles(input);
    const buttons = createButtons(input);
    const buttonsStyles = createButtonsStyles(input);
    const comparedTable = createComparedTable(input);

    const palindromeTable = createPalindromeTable(input);
    const palindromeTableStyles = createPalindromeTableStyles(input);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable, palindromeTable, palindromeTableStyles };
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
    const [palindromeTable, setPalindromeTable] = React.useState(data.palindromeTable);
    const [palindromeTableStyles, setPalindromeTableStyles] = React.useState(data.palindromeTableStyles);

    const handleRefresh = () => {
        setSteps(0);
        setErrors(0);
        setSuccess(false);
        setCurrentPoint(startPoint);
        setLength(1);

        const data = buildData();
        setTable(data.table);
        setTableStyles(data.tableStyles);
        setButtons(data.buttons);
        setButtonsStyles(data.buttonsStyles);
        setComparedTable(data.comparedTable);
        setPalindromeTable(data.palindromeTable);
        setPalindromeTableStyles(data.palindromeTableStyles);
    }

    const handleClick = (value: number) => {
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
                const newTableStyles = createNewTableStyles(tableStyles);
                const row = newTableStyles[2];
                row[row.length - 1] = helperStyle;
                return newTableStyles;
            });

            setSuccess(true);
            return;
        }

        const nextPoint = getNext(table, currentPoint, length);

        setTable((t) => {
            const t1 = updateTable(t, currentPoint, value);
            t1[nextPoint.row][nextPoint.col] = "?"
            return t1;
        })

        setTableStyles(() => {
            const newTableStyles = createNewTableStyles(tableStyles);
            addHelperStyles(newTableStyles, nextPoint, nextPoint.length, comparedTable);
            return newTableStyles;
        });

        setPalindromeTableStyles(() => {
            const newTableStyles = createNewTableStyles(palindromeTableStyles);
            addHelperStylesToPalindromeTable(newTableStyles, nextPoint, nextPoint.length, comparedTable);
            return newTableStyles;
        });

        setCurrentPoint(nextPoint);
        setLength(nextPoint.length);
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "60px" }}></div>
                    <Typography variant='body1' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                        {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title}
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

                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>Palindrome Table</div>
                    <Table table={palindromeTable} tableStyles={palindromeTableStyles} />
                    <div style={{ margin: "10px 0" }} />
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>DP Table</div>
                    <Table table={table} tableStyles={tableStyles} />
                    <div style={{ marginTop: "20px" }}>
                        <Buttons
                            buttons={buttons}
                            buttonsStyles={buttonsStyles}
                            handleButtonClick={function (data: number | string | boolean) {
                                handleClick(Number(data))
                            }}
                        />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default EditDistance;
