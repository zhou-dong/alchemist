import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { Centered } from "../_components/Centered";
import { Typography } from '@mui/material';
import { addHelperStyles } from "./init";
import { updateTable, nonCorrect, isLastCell, createNewTableStyles, getLastCell, getNextPoint } from "./update";
import { errorStyle, helperStyle } from "../_commons/styles";
import Table from '../_components/Table';
import Buttons from '../_components/Buttons';
import Toolbox from './toolbox';
import { State } from './AlgoState';
import Title from './description/Title';
import { useAlgoContext } from './AlgoContext';

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
    } = useAlgoContext();


    const handleClick = (value: number) => {
        if (success) {
            return;
        }

        if (nonCorrect(comparedTable, current, value)) {
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

    return (
        <>
            <Toolbox current={State.Playing} />
            <Centered>
                <div style={{ marginTop: "100px" }}></div>
                <Typography
                    variant='h6'
                    display="inline-flex"
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Title icon={<SportsEsportsOutlinedIcon />} success={success} />
                </Typography>

                <div style={{ marginTop: "25px" }} />

                <Table table={table} tableStyles={tableStyle} />
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
        </>
    );
}

export default Main;
