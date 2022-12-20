import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import { defaultValue, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { intToRoman } from "./greedyAlgo";

const Submit: React.FC<{
    input: number | undefined,
    setInput: React.Dispatch<React.SetStateAction<number | undefined>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ input, setInput, setAnchorEl }) => {

    const { setValue, setState, setResult, setIndex } = useAlgoContext();

    const handleSubmit = () => {
        const value = (!input) ? defaultValue : input;
        setIndex(0);
        setValue(value);
        setState(State.Playing);
        setInput(undefined);
        setAnchorEl(null);
        setResult(() => intToRoman(value));
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

    const [input, setInput] = React.useState<number>();

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = +(e.currentTarget.value);

        if (value < 1) {
            value = 1;
        } else if (value > 3999) {
            value = 3999;
        }

        setInput(value);
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
                type="number"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit input={input} setInput={setInput} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
