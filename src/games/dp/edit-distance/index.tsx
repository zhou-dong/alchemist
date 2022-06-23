import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { IconButton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import { createTableMatrix, createTableStyles, createButtons, createButtonsStyles } from "./init";
import Table from '../_components/Table';
import theme from '../_commons/theme';
import Buttons from '../_components/Buttons';

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
    return { buttons, buttonsStyles, table, tableStyles };
}

const EditDistance = () => {

    const data = buildData();

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    const [table, setTable] = React.useState(data.table);
    const [tableStyles, setTableStyles] = React.useState(data.tableStyles);
    const [buttons, setButtons] = React.useState(data.buttons);
    const [buttonsStyles, setButtonsStyles] = React.useState(data.buttonsStyles);

    const handleRefresh = () => {
        const data = buildData();
        setTable(data.table);
        setTableStyles(data.tableStyles);
        setButtons(data.buttons);
        setButtonsStyles(data.buttonsStyles);
    }

    return (
        <GameWrapper path="/dp/edit-distance">
            <ThemeProvider theme={theme}>
                <Centered>
                    <Typography display="inline" variant='body1'>
                        {title.toUpperCase()}
                    </Typography>
                    <div>
                        <Steps steps={steps} />
                        <Errors errors={errors} />
                        <Description success={success} title={title} example={example} usecases={usecases} description={description} />
                        <Formula title={title} formula={formula} />
                        <Refresh handleRefresh={handleRefresh} />
                    </div>
                    <Table table={table} tableStyles={tableStyles} />
                    <div>
                        <Buttons buttons={buttons} buttonsStyles={buttonsStyles} handleButtonClick={function (data: string | number | boolean) {
                            throw new Error('Function not implemented.');
                        }} />
                    </div>
                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default EditDistance;
