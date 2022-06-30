import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { Grid, ThemeProvider, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import { createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint } from "./init";
import { addHelperStyles, updateTable, nonCorrect, isLastCell, createNewTableStyles, getNextPoint } from "./update";
import { errorStyle, helperStyle } from "../_commons/styles";
import Table from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';
import info from "./info";
import { KnapSackItem } from './KnapsackItem';
import Animator from './Animator'

const random = (max: number) => Math.floor(Math.random() * max) + 1;
const totalWeight = 6;

const buildData = () => {
    const items: KnapSackItem[] = Array(4).fill(0).map(() => ({ weight: random(5), value: random(10) }));

    const table = createTableMatrix(items, totalWeight);
    const tableStyles = createTableStyles(items, totalWeight);
    const buttons = createButtons(items, totalWeight);
    const buttonsStyles = createButtonsStyles(items, totalWeight);
    const comparedTable = createComparedTable(items, totalWeight);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable };
}

const Main = () => {

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);
    const [currentPoint, setCurrentPoint] = React.useState(startPoint);

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
                newTableStyles[currentPoint.row][currentPoint.col] = helperStyle;
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
            addHelperStyles(newTableStyles, nextPoint, comparedTable);
            return newTableStyles;
        });

        setCurrentPoint(nextPoint);
    }

    const potentialValue = table[currentPoint.row][1] <= currentPoint.col - 2 ? Math.max(
        Number(table[currentPoint.row][0]) + Number(table[currentPoint.row - 1][currentPoint.col - Number(table[currentPoint.row][1])]),
        Number(table[currentPoint.row - 1][currentPoint.col])
    ) : -1

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
                    <Grid container>
                        <Grid item md={12} lg={6} >
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
                        </Grid>
                        <Animator
                            table={table}
                            maxWeight={totalWeight}
                            currentWeight={Number(table[0][currentPoint.col])}
                            currentValue={Number(table[currentPoint.row - 1][currentPoint.col])}
                            potentialValue={potentialValue}
                            currentRow={currentPoint.row}
                        />
                    </Grid>

                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
