import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Divider, FormControl, InputLabel, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useAlgoContext, defaultInputString, defaultNumRows } from './AlgoContext';
import { State } from './AlgoState';
import { convert } from "./algo";

const TextInput: React.FC<{
    setValue: React.Dispatch<React.SetStateAction<string>>
}> = ({ setValue }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            size='small'
            required
            label="Input String"
            onChange={handleChange}
            sx={{ flex: 1 }}
            placeholder={defaultInputString}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

const RowsSelection: React.FC<{
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
}> = ({ value, setValue }) => {

    const htmlId = "select-num-rows";
    const label = "rows";

    const handleChange = (event: SelectChangeEvent) => {
        setValue(+event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
            <InputLabel id={htmlId}>{label}</InputLabel>
            <Select
                labelId={htmlId}
                id={htmlId}
                value={value + ""}
                label={label}
                onChange={handleChange}
            >
                {
                    Array.from(Array(9).keys()).map(item =>
                        <MenuItem key={item} value={item + 1}>
                            {item + 1}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

const Submit: React.FC<{
    text: string,
    num: number,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ setAnchorEl, text, num }) => {

    const { setNumRows, setInputString, setState, setRows, setRow, setFlag, setIndex, setConverted } = useAlgoContext();

    const handleSubmit = () => {
        const inputString = (text.trim().length === 0) ? defaultInputString : text
        const { converted, maxCols } = convert(inputString, num);
        const rows: (string | number)[][] = [];
        for (let i = 0; i < num; i++) {
            const row: (string | number)[] = [];
            for (let j = 0; j < maxCols; j++) {
                row[j] = -1;
            }
            rows.push(row);
        }
        setConverted(converted);
        setInputString(inputString);
        setFlag(-1);
        setIndex(0);
        setRow(0);
        setRows(rows);
        setAnchorEl(null);
        setNumRows(num);
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const [text, setText] = React.useState(defaultInputString);
    const [num, setNum] = React.useState(defaultNumRows);

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 392,
                alignItems: "center",
                paddingLeft: "12px",
            }}
        >
            <TextInput setValue={setText} />
            <RowsSelection value={num} setValue={setNum} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit setAnchorEl={setAnchorEl} text={text} num={num} />
        </Paper>
    );
}
