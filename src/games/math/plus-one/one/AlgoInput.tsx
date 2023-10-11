import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { defaultValue, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { plusOne } from "./algo";
interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ input, setInput, setAnchorEl }) => {

    const { setValue, setState, setIndex, setActions } = useAlgoContext();

    const handleSubmit = () => {
        let newValue: string = (!input) ? defaultValue + "" : input;

        const digits = newValue.split("").map(num => +num);

        setValue(+newValue);
        setState(State.Playing);
        setInput("");
        setAnchorEl(null);

        setIndex(0);
        setActions(plusOne(digits))
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit}>
            <OutputIcon />
        </IconButton>
    );
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
                type='number'
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
