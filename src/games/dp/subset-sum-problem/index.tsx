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
import { addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint } from "./init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getLastCell, getNextPoint } from "./update";
import { errorStyle, helperStyle } from "../_commons/styles";
import Table from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';
import info from "./info";

const total = 8;
const random = (max: number) => Math.floor(Math.random() * max) + 1;

const buildData = () => {
    const array: number[] = Array(4).fill(4).map(random);
    const table = createTableMatrix(total, array);
    const tableStyles = createTableStyles(total, array, table);
    const buttons = createButtons(total, array);
    const buttonsStyles = createButtonsStyles(total, array);
    const comparedTable = createComparedTable(total, array);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable };
}

const EditDistance = () => {

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
            addHelperStyles(newTableStyles, nextPoint, comparedTable);
            return newTableStyles;
        });

        setCurrentPoint(nextPoint);
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
