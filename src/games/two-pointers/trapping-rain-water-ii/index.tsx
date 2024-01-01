import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../../dp/_components/Centered";
import Description from "../../dp/_components/Description";
import Formula from "../../dp/_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { Table, TableBody, TableCell, TableRow, ThemeProvider, Typography } from '@mui/material';
import Steps from '../../dp/_components/Steps';
import Errors from '../../dp/_components/Errors';
import Refresh from "../../dp/_components/Refresh";
import {
    createTableMatrix, createTableStyles, createButtonsStyles, createButtons,
    startPoint, createLeftMax, createRightMax, createDPTable, createGuiders
} from "./init";
import { isSuccess } from "./update";
import DisplayTable from '../../dp/_components/Table';
import theme from '../../dp/_commons/theme';
import Buttons from '../../dp/_components/Buttons';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';
import Heights from './Heights';
import Total from './Total';

const backgroundColor = "rgb(69,69,69)";

const random = (max: number) => Math.floor(Math.random() * max);

const buildData = () => {
    const heights: number[] = Array(9).fill(5).map(random);
    const leftMax: number[] = createLeftMax(heights);
    const rightMax: number[] = createRightMax(heights);
    const waters: number[] = createDPTable(heights);
    const guiders = createGuiders(heights);

    const buttons: string[] = createButtons(heights);
    const buttonsStyles = createButtonsStyles(heights);

    const table = createTableMatrix(heights);
    const tableStyles = createTableStyles(heights);
    return { buttons, buttonsStyles, table, tableStyles, waters, leftMax, rightMax, heights, guiders };
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
    const [waters, setWaters] = React.useState(data.waters);

    const [heights, setHeights] = React.useState(data.heights);
    const [guiders, setGuiders] = React.useState(data.guiders);

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
        setWaters(data.waters);
        setHeights(data.heights);
        setGuiders(data.guiders);
    }

    const handleClick = (value: string) => {
        if (success) {
            return;
        }

        setSteps(steps => steps + 1);

        if (!isSuccess(value, currentPoint, guiders)) {
            setErrors(errors => errors + 1);
            return;
        }

        setCurrentPoint(point => {
            return { row: point.row, col: point.col + 1 };
        });

        if (currentPoint.col >= guiders.directions.length - 1) {
            setSuccess(true);
            return;
        }
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "100px" }}></div>
                    <Typography variant='h6' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
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
                    <DisplayTable table={table} tableStyles={tableStyles} />

                    <div style={{ marginTop: 10 }}></div>
                    <Heights data={heights} current={currentPoint} guiders={guiders} success={success} />

                    <div>
                        <Table sx={{ width: "160px" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Total</TableCell>
                                    <Total data={waters} current={currentPoint} success={success} guiders={guiders} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Buttons
                            buttons={buttons}
                            buttonsStyles={buttonsStyles}
                            handleButtonClick={function (data: number | string | boolean) { handleClick(String(data)) }}
                        />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
