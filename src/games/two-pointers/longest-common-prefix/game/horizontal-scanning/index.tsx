import { title } from "../../description/Title";
import { Stack, Typography, useTheme } from '@mui/material';
import Table from '../../../../dp/_components/Table';
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';

const Main = () => {

    const theme = useTheme();
    const { table, setTable, tableStyle, steps, index, setIndex, setTableStyle, state, setState } = useAlgoContext();

    const handleClick = () => {
        if (state === State.Finished) {
            return;
        }
        const step = steps[index];
        const { row, col } = step;
        table[row + 2][col + 2] = "-";
        setTable(table);

        // const style = createHelperStyle(haystack, needle, step);
        // setTableStyle(style);

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(index + 1);

    }

    const Body = () => (
        <Stack
            direction="column"
            spacing={5}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                variant='h5'
                display="inline-flex"
                sx={{
                    verticalAlign: 'middle',
                    fontWeight: 300,
                }}
            >
                {title}
            </Typography>

            <Table
                table={table}
                tableStyles={tableStyle}
            />

            <StyledButton
                disabled={state !== State.Playing}
                onClick={handleClick}
                size='large'
                color='primary'
            >
                {state === State.Finished ? <CheckIcon sx={{ color: 'green' }} /> : <MouseIcon />}
            </StyledButton>
        </Stack>
    );

    return (
        <Body />
    );
}

export default Main;
