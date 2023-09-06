import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { defaultValue, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { myAtoi } from "./algo";

const Submit: React.FC<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ input, setInput, setAnchorEl }) => {

    const { setValue, setState, setResult, setIndex } = useAlgoContext();

    const handleSubmit = () => {
        let newValue: string = (!input) ? defaultValue : input;
        setIndex(0);
        setValue(newValue);
        setState(State.Playing);
        setInput("");
        setAnchorEl(null);
        setResult(() => myAtoi(newValue))
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

const Main = ({ setAnchorEl }: Props) => {

    const [input, setInput] = React.useState("");

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 200,
                alignItems: "center"
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={defaultValue + ""}
                value={input}
                onChange={handleTextFieldChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => setInput("")}>
                <ClearIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit input={input} setInput={setInput} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
