import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formula from "../_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { IconButton, Tooltip, Typography } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';
import Refresh from "../_components/Refresh";
import { createTableMatrix, createButtonsStyles, createTableStyles } from "./init";
import Table from '../_components/Table';

const bases = 'ACGT';
const random = (max: number) => Math.floor(Math.random() * max);

const createRandom = (): string => {
    return Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
}

const buildTableAndStyles = () => {
    const stringOne = createRandom();
    const stringTwo = createRandom();
    const table = createTableMatrix(stringOne, stringTwo);
    const tableStyles = createTableStyles(stringOne, stringTwo);
    return { table, tableStyles };
}

const EditDistance = () => {

    const tableAndStyles = buildTableAndStyles();

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    const [table, setTable] = React.useState(tableAndStyles.table);
    const [tableStyles, setTableStyles] = React.useState(tableAndStyles.tableStyles);

    const handleRefresh = () => {
        const newTableAndStyles = buildTableAndStyles();
        setTable(newTableAndStyles.table);
        setTableStyles(newTableAndStyles.tableStyles);
    }

    return (
        <GameWrapper path="/dp/edit-distance">
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
            </Centered>
        </GameWrapper>
    );
}

export default EditDistance;
