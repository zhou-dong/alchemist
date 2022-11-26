import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Range from "./range";

export const defaultMax = 0;
export const defaultLeft = -1;
export const defaultIndex = -1;
export const defaultRange: Range = { left: -1, right: -1 };
export const buildDefaultMap = () => { return new Map<string, number>() };

const Submit: React.FC<{
    defaultInput: string,
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    setRange: React.Dispatch<React.SetStateAction<Range>>,
    setMap: React.Dispatch<React.SetStateAction<Map<string, number>>>,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    setLeft: React.Dispatch<React.SetStateAction<number>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setMax: React.Dispatch<React.SetStateAction<number>>
}> = ({ data, setData, setInput, setAnchorEl, defaultInput, setRange, setMap, setIndex, setSuccess, setLeft, setMax }) => {

    const handleSubmit = () => {
        if (data.length === 0) {
            setInput(defaultInput);
        } else {
            setInput(data);
        }
        setRange(defaultRange);
        setMap(buildDefaultMap());
        setIndex(defaultIndex);
        setSuccess(false);
        setLeft(defaultLeft);
        setMax(defaultMax);
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
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setRange: React.Dispatch<React.SetStateAction<Range>>;
    setMap: React.Dispatch<React.SetStateAction<Map<string, number>>>;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    setLeft: React.Dispatch<React.SetStateAction<number>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setMax: React.Dispatch<React.SetStateAction<number>>;
}

function isLetter(character: string) {
    return character.length === 1 && character.match(/[a-z]/i);
}

export default function AlgoInput({
    setAnchorEl,
    setInput,
    setRange,
    setMap,
    setIndex,
    setLeft,
    setSuccess,
    setMax
}: Props) {

    const defaultInput = "abcabbcdef";
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
                defaultInput={defaultInput}
                setInput={setInput}
                setIndex={setIndex}
                setRange={setRange}
                setMap={setMap}
                setLeft={setLeft}
                setSuccess={setSuccess}
                setMax={setMax}
            />
        </Paper>
    );
}
