import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { buildDefaultMap, defaultIndex, defaultInput, defaultLeft, defaultMax, defaultRange, defaultSuccess, useAlgoContext } from './AlgoContext';

const Submit: React.FC<{
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
}> = ({ data, setData, setAnchorEl }) => {

    const { setInput, setRange, setMap, setIndex, setSuccess, setLeft, setMax } = useAlgoContext();

    const handleSubmit = () => {
        if (data.length === 0) {
            setInput(defaultInput);
        } else {
            setInput(data);
        }
        setRange(defaultRange);
        setIndex(defaultIndex);
        setSuccess(defaultSuccess);
        setLeft(defaultLeft);
        setMax(defaultMax);
        setMap(buildDefaultMap());
        setData("");
        setAnchorEl(null);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function isLetter(character: string) {
    return character.length === 1 && character.match(/[a-z]/i);
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const [data, setData] = React.useState("");

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        let value = "";
        for (let i = 0; i < text.length; i++) {
            const character = text.charAt(i);
            if (isLetter(character)) {
                value += character;
            }
        }
        setData(value);
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 300,
                alignItems: "center"
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={defaultInput}
                inputProps={{ 'aria-label': 'Input Parentheses' }}
                value={data}
                onChange={handleTextFieldChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => setData("")}>
                <ClearIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit
                data={data}
                setData={setData}
                setAnchorEl={setAnchorEl}
            />
        </Paper>
    );
}
