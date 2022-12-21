import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { defaultValue, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { romanToInt } from "./algo";

const Submit: React.FC<{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl }) => {

    const { setInput, setState, setResult, setIndex } = useAlgoContext();

    const handleSubmit = () => {
        let newValue: string = (!value) ? defaultValue : value;
        setIndex(0);
        setInput(newValue);
        setResult(() => romanToInt(newValue))
        setState(State.Playing);

        setValue("");
        setAnchorEl(null);
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

const symbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

const Main = ({ setAnchorEl }: Props) => {

    const [value, setValue] = React.useState("");

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.currentTarget.value
            .split("")
            .map(ch => ch.toLocaleUpperCase())
            .filter(ch => symbols.includes(ch))
            .join("")

        setValue(newValue);
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 250,
                alignItems: "center"
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={defaultValue}
                value={value}
                onChange={handleTextFieldChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => setValue("")}>
                <ClearIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit value={value} setValue={setValue} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
