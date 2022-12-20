import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import { defaultInput, useAlgoContext } from "./AlgoContext";
import { State } from '../_common/AlgoState';

const Submit: React.FC<{
    value: string | undefined,
    setValue: React.Dispatch<React.SetStateAction<string | undefined>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl }) => {

    const { setInput, setState, } = useAlgoContext();

    const handleSubmit = () => {

        let input: number = (!value) ? defaultInput : +value;
        if (input < 1) {
            input = 1
        } else if (input > 3999) {
            input = 3999;
        }

        setInput(input);
        setState(State.Playing);
        setValue(undefined);
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

const Main = ({ setAnchorEl }: Props) => {

    const [input, setInput] = React.useState<string>();

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
                placeholder={defaultInput + ""}
                value={input || ""}
                onChange={handleTextFieldChange}
                type="number"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit value={input} setValue={setInput} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
