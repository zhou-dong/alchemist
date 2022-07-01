import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../../dp/_components/Centered";
import Description from "../../dp/_components/Description";
import Formula from "../../dp/_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { CardContent, Chip, ThemeProvider, Typography } from '@mui/material';
import Steps from '../../dp/_components/Steps';
import Errors from '../../dp/_components/Errors';
import Refresh from "../../dp/_components/Refresh";
import { addHelperStyles, createTableMatrix, createTableStyles, createButtons, createButtonsStyles, createComparedTable, startPoint, getIndices } from "./init";
import { isLastCell, createNewTableStyles, isCorrect } from "./update";
import { errorStyle, helperStyle } from "../../dp/_commons/styles";
import Table from '../../dp/_components/Table';
import theme from '../../dp/_commons/theme';
import Buttons from '../../dp/_components/Buttons';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';
import HashTable from './HashTable';

const random = (max: number) => Math.floor(Math.random() * max);

const buildData = () => {
    const size = 6;
    const nums: number[] = [];
    for (let i = 0; i < size; i++) {
        let flag = true;
        while (flag) {
            const num = random(9) + 1;
            if (!nums.includes(num)) {
                nums.push(num);
                flag = false;
            }
        }
    }
    const one = random(6);
    let two = one;
    while (two === one) {
        two = random(6);
    }
    const target = nums[one] + nums[two];

    const table = createTableMatrix(nums);
    const tableStyles = createTableStyles(nums);
    const buttons = createButtons();
    const buttonsStyles = createButtonsStyles(nums);
    const comparedTable = createComparedTable(nums);
    const results = getIndices(nums, target);
    return { buttons, buttonsStyles, table, tableStyles, comparedTable, target, nums, results };
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
    const [target, setTarget] = React.useState(data.target);
    const [nums, setNums] = React.useState(data.nums);
    const [results, setResults] = React.useState(data.results);

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
        setTarget(data.target);
        setNums(data.nums);
        setResults(data.results);
    }

    const handleClick = (value: string) => {
        if (success) {
            return;
        }

        setSteps(steps => steps + 1);

        if (!isCorrect(currentPoint, results, value)) {
            setErrors(errors => errors + 1);
            setTableStyles(tableStyles => {
                tableStyles[currentPoint.row][currentPoint.col] = errorStyle;
                return tableStyles;
            })
            return;
        }

        if (isLastCell(currentPoint, results)) {
            setTableStyles(() => {
                const newTableStyles = createNewTableStyles(tableStyles);

                newTableStyles[0][0] = { backgroundColor: "lightgray" };
                newTableStyles[1][0] = { backgroundColor: "lightgray" };

                results.forEach(result => {
                    newTableStyles[0][result + 1] = helperStyle;
                });
                return newTableStyles;
            });

            setSuccess(true);
            return;
        }

        setTableStyles(() => {
            const newTableStyles = createNewTableStyles(tableStyles);
            addHelperStyles(newTableStyles, nextPoint)
            return newTableStyles;
        });

        const nextPoint = { row: currentPoint.row, col: currentPoint.col + 1 };
        setCurrentPoint(nextPoint);
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "100px" }}></div>
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

                    <CardContent>
                        <Chip label={"nums = [" + nums.join(", ") + "]"} variant="outlined" />
                        &nbsp;&nbsp;&nbsp;
                        <Chip label={"target = " + target} variant="outlined" />
                    </CardContent>

                    <Typography variant="subtitle1">Array</Typography>
                    <Table table={table} tableStyles={tableStyles} />


                    <div style={{ minHeight: 20 }} />

                    <CardContent>
                        <Typography variant="subtitle1">
                            HashTable
                        </Typography>
                        <HashTable comparedTable={comparedTable} currentPoint={currentPoint} />
                    </CardContent>

                    <div style={{ marginTop: "20px" }}>
                        <Buttons
                            buttons={buttons}
                            buttonsStyles={buttonsStyles}
                            handleButtonClick={function (data: number | string | boolean) {
                                handleClick(String(data))
                            }}
                        />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
