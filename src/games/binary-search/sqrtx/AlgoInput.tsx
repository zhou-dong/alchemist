import * as React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Divider, TextField } from '@mui/material';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { mySqrt } from './algo';

const Submit: React.FC<{
    value: number,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setAnchorEl }) => {
    const { setState, setIndex, setSteps, setX } = useAlgoContext();

    const num: number = +value;
    const disabled: boolean = num <= 0;

    const handleSubmit = async () => {
        setIndex(0);
        setSteps(mySqrt(num));
        setX(num);
        setState(State.Playing);
        setAnchorEl(null);
    };

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function getRandomInt(from: number, to: number) {
    const distance = to - from;
    return from + Math.floor(Math.random() * distance);
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const defaultValue = 8;
    const from = 4;
    const size = 11;
    const [value, setValue] = React.useState(defaultValue);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.target.value;
        setValue(+text);
    };

    const values = Array.from(Array(size).keys()).map(num => num + from);

    return (
        <Paper
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: "center"
            }}
        >
            <TextField
                select
                defaultValue={defaultValue}
                size="small"
                sx={{ width: 80 }}
                onChange={handleValueChange}
                value={value}
            >
                {
                    values.map((num, i) =>
                        <MenuItem key={i} value={num}>
                            {num}
                        </MenuItem>)
                }
            </TextField>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                setValue(getRandomInt(from, from + size));
            }}>
                <RefreshIcon />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <Submit value={value} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}
