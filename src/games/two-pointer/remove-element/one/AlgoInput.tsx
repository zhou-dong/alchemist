import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { plusOne } from "./algo";

function getRandomInt() {
    const max = 9;
    return Math.floor(Math.random() * max) + 1;
}

const buildNums = () => new Array(10).fill(0).map(() => getRandomInt());

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
        let newValue: string = "";

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
    const [target, setTarget] = React.useState("");

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    }

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarget(e.currentTarget.value);
    }

    // nums 
    // val
    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 400,
                alignItems: "center"
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='nums, seprate by ","'
                value={input}
                onChange={handleTextFieldChange}
                type='text'
            />

            <Divider sx={{ height: 28, }} orientation="vertical" />

            <InputBase
                placeholder='val'
                value={target}
                onChange={handleTargetChange}
                type='number'
                inputProps={{ style: { textAlign: 'center' } }}
                sx={{ width: 50 }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                setInput(() => buildNums().join(", "));
                setTarget(() => getRandomInt() + "");
            }}>
                <RefreshIcon />
            </IconButton>

            <Submit input={input} setInput={setInput} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
