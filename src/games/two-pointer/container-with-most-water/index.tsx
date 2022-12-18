import * as React from 'react';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../../dp/_components/Centered";
import Description from "../../dp/_components/Description";
import Formula from "../../dp/_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { Chip, Table, TableBody, TableCell, TableRow, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Steps from '../../dp/_components/Steps';
import Errors from '../../dp/_components/Errors';
import Refresh from "../../dp/_components/Refresh";
import theme from '../../dp/_commons/theme';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';
import Chart from './Chart';
import { Action, maxArea } from "./algo";

const random = (max: number) => Math.floor(Math.random() * max) + 1;
const buildHeights = () => Array(6).fill(5).map(random);

type ButtonColor = "error" | "inherit";

const Main = () => {
    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);
    const [heights, setHeights] = React.useState<number[]>(buildHeights());

    const [index, setIndex] = React.useState(0);
    const [items, setItems] = React.useState(maxArea(heights));

    const [leftButtonColor, setLeftButtonColor] = React.useState<ButtonColor>("inherit");
    const [rightButtonColor, setRightButtonColor] = React.useState<ButtonColor>("inherit");

    const handleRefresh = () => {
        setHeights([]);
        setSteps(0);
        setErrors(0);
        setSuccess(false);
        setIndex(0);
        setLeftButtonColor("inherit");
        setRightButtonColor("inherit");

        const heights = buildHeights();
        setHeights(heights);
        setItems(maxArea(heights));
    }

    const Title = () => (
        <Typography variant='body1' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
            {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title}
        </Typography>
    )

    const Stats = () => (
        <Table sx={{ width: "200px" }}>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ fontWeight: "bold", color: "gray" }}>Max</TableCell>
                    <TableCell padding="none" style={{}}>{items[index].max}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ fontWeight: "bold", color: "gray" }}>Left</TableCell>
                    <TableCell padding="none" style={{}}>{items[index].left}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ fontWeight: "bold", color: "gray" }}>Right</TableCell>
                    <TableCell padding="none" style={{}}>{items[index].right}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ fontWeight: "bold", color: "gray" }}>Current Area</TableCell>
                    <TableCell padding="none" style={{}}>{items[index].area}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "60px" }} />
                    <Title />
                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                        <Chip icon={<TipsAndUpdatesOutlinedIcon />} label="Two Pointer" variant='outlined' sx={{ marginRight: "10px" }} />
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

                    <div style={{ marginLeft: "-100px" }}>
                        <Chart left={items[index].left} right={items[index].right} heights={heights} />
                    </div>

                    <div style={{ marginTop: 10 }}></div>

                    <div><Stats /></div>

                    <div style={{ marginTop: "40px" }} />
                    <ToggleButtonGroup size="medium" disabled={success}>
                        <ToggleButton
                            value="right"
                            onClick={() => {
                                setLeftButtonColor("inherit");
                                setRightButtonColor("inherit");
                                if (items[index].action === Action.Left) {
                                    setIndex(i => i + 1);
                                    if (index === items.length - 2) {
                                        setSuccess(true);
                                    }
                                } else {
                                    setLeftButtonColor("error");
                                }
                            }}>
                            <ArrowCircleRightOutlinedIcon fontSize='large' color={leftButtonColor} />
                        </ToggleButton>
                        <ToggleButton
                            color="info"
                            value="left"
                            onClick={() => {
                                setLeftButtonColor("inherit");
                                setRightButtonColor("inherit");
                                if (items[index].action === Action.Right) {
                                    setIndex(i => i + 1);
                                    if (index === items.length - 2) {
                                        setSuccess(true);
                                    }
                                } else {
                                    setRightButtonColor("error");
                                }
                            }}>
                            <ArrowCircleLeftOutlinedIcon fontSize='large' color={rightButtonColor} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
