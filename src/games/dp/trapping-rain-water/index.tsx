import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { Table, TableBody, TableCell, TableRow, ThemeProvider, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import {
    createTableMatrix, createTableStyles, createButtonsStyles,
    startPoint, createLeftMax, createRightMax, createDPTable
} from "./init";
import { nonCorrect, isLastCell, getNextPoint } from "./update";
import DisplayTable from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';
import Heights from './Heights';
import CodeBlock from './CodeBlock';
import LeftMax from './LeftMax';
import RightMax from './RightMax';
import Water from './Water';
import Total from './Total';

const al = `waterHeight = Math.Min(MaxLeft, MaxRight);              
water = waterHeight > Height ? waterHeight - Height : 0;
`;

const backgroundColor = "rgb(69,69,69)";

const random = (max: number) => Math.floor(Math.random() * max);
const createButtons = (water: number[], left: number[], right: number[]): number[] => {
    const set = new Set<number>();
    water.forEach(item => set.add(item));
    left.forEach(item => set.add(item));
    right.forEach(item => set.add(item));
    return Array.from(set).sort();
};

const buildData = () => {
    const heights: number[] = Array(9).fill(5).map(random);
    const leftMax: number[] = createLeftMax(heights);
    const rightMax: number[] = createRightMax(heights);
    const water: number[] = createDPTable(heights);

    const buttons: number[] = createButtons(water, leftMax, rightMax);
    const buttonsStyles = createButtonsStyles(buttons);

    const table = createTableMatrix(heights);
    const tableStyles = createTableStyles(heights);
    return { buttons, buttonsStyles, table, tableStyles, water, leftMax, rightMax, heights };
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
    const [water, setWater] = React.useState(data.water);
    const [leftMax, setLeftMax] = React.useState(data.leftMax);
    const [rightMax, setRightMax] = React.useState(data.rightMax);
    const [heights, setHeights] = React.useState(data.heights);

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
        setWater(data.water);
        setHeights(data.heights);
        setLeftMax(data.leftMax);
        setRightMax(data.rightMax);
    }

    const handleClick = (value: number) => {
        if (success) {
            return;
        }

        setSteps(steps => steps + 1);

        if (nonCorrect(currentPoint, leftMax, rightMax, water, value)) {
            setErrors(errors => errors + 1);
            return;
        }

        if (isLastCell(currentPoint, water)) {
            setSuccess(true);
            return;
        }

        const nextPoint = getNextPoint(currentPoint, water.length);
        setCurrentPoint(nextPoint);
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "60px" }}></div>
                    <Typography variant='h6' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                        {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title}
                    </Typography>
                    <div style={{ marginTop: "10px" }}>
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
                    <div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white", width: "70px", minWidth: "70px" }}>Height</TableCell>
                                    <Heights data={heights} current={currentPoint} success={success} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <CodeBlock content="max = Math.Max(max, Height[i-1]); i++;" />
                    <div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white", width: "70px", minWidth: "70px" }}>Max Left</TableCell>
                                    <LeftMax data={leftMax} current={currentPoint} success={success} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <CodeBlock content="max = Math.Max(max, Height[i+1]); i--;" />
                    <div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white", width: "70px", minWidth: "70px" }}>Max Right</TableCell>
                                    <RightMax data={rightMax} current={currentPoint} success={success} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <CodeBlock content={al} />
                    <div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white", width: "70px", minWidth: "70px" }}>Water</TableCell>
                                    <Water data={water} current={currentPoint} success={success} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <CodeBlock content="total += water;" />
                    <div>
                        <Table sx={{ width: "160px" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell padding="none" style={{ backgroundColor, color: "white" }}>Total</TableCell>
                                    <Total data={water} current={currentPoint} success={success} />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Buttons
                            buttons={buttons}
                            buttonsStyles={buttonsStyles}
                            handleButtonClick={function (data: number | string | boolean) { handleClick(Number(data)) }}
                        />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
