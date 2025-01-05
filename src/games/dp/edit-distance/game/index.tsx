import React from 'react';
import { IconButton, Stack, styled } from '@mui/material';
import { addHelperStyles } from "../init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getLastCell, getNextPoint } from "../update";
import { errorStyle, helperStyle } from "../../_commons/styles";
import Table from '../../_components/Table';
import Buttons from '../../_components/Buttons';
import Toolbox from '../toolbox';
import { State } from '../AlgoState';
import Title from '../description/Title';
import Steps from '../../_components/Steps';
import Errors from '../../_components/Errors';
import { useAlgoContext } from '../AlgoContext';
import Formula from './Formula';
import CodeIcon from '@mui/icons-material/Code';

const Location = styled(Stack)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'fixed',
    top: '45%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
});

const Main = () => {

    const {
        comparedTable,
        buttons,
        buttonsStyles,
        table,
        tableStyle,
        setTable,
        setTableStyle,
        current,
        setCurrent,
        success,
        setSuccess,
        steps,
        setSteps,
        errors,
        setErrors,
    } = useAlgoContext();

    const [displayFormula, setDisplayFormula] = React.useState(false);

    const handleClick = (value: number) => {
        if (success) {
            return;
        }

        setSteps(steps => steps + 1);

        if (nonCorrect(comparedTable, current, value)) {
            setErrors(errors => errors + 1);
            setTable((t) => updateTable(t, current, value));
            setTableStyle(tableStyles => {
                tableStyles[current.row][current.col] = errorStyle;
                return tableStyles;
            })
            return;
        }

        if (isLastCell(table, current)) {
            setTable((t) => updateTable(t, current, value));

            setTableStyle(() => {
                const lastCell = getLastCell(table);
                const newTableStyles = createNewTableStyles(tableStyle);
                newTableStyles[lastCell.row][lastCell.col] = helperStyle;
                return newTableStyles;
            });

            setSuccess(true);
            return;
        }

        const nextPoint = getNextPoint(table, current);

        setTable((t) => {
            const t1 = updateTable(t, current, value);
            const t2 = updateTable(t1, nextPoint, "?");
            return t2;
        })

        setTableStyle(() => {
            const newTableStyles = createNewTableStyles(tableStyle);
            addHelperStyles(newTableStyles, nextPoint)
            return newTableStyles;
        });

        setCurrent(nextPoint);
    }

    const handleDisplayFormulaClick = () => {
        setDisplayFormula(display => !display);
    }

    return (
        <>
            <Toolbox current={State.Playing} />

            <Location spacing={5}>

                <Title
                    success={success}
                />

                <div style={{
                    width: "100%",
                    margin: 'auto',
                    textAlign: 'center'
                }}>
                    <Stack
                        spacing={1}
                        direction="row"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <Steps steps={steps} />
                        <Errors errors={errors} />
                        <IconButton onClick={handleDisplayFormulaClick}>
                            <CodeIcon fontSize='medium' color={displayFormula ? "success" : "inherit"} />
                        </IconButton>
                    </Stack>

                    <Table table={table} tableStyles={tableStyle} />
                </div>

                <Buttons
                    buttons={buttons}
                    buttonsStyles={buttonsStyles}
                    handleButtonClick={function (data: number | string | boolean) {
                        handleClick(Number(data))
                    }}
                />

                {displayFormula && <Formula setDisplayFormula={setDisplayFormula} />}
            </Location>
        </>
    );
}

export default Main;
