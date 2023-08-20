import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Chip, Divider, InputBase } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { solution } from './algo';

interface Input {
    n: number;
    bad: number;
}

const defaultInputs: Input[] = [
    { n: 5, bad: 4 },
    { n: 9, bad: 5 },
    { n: 9, bad: 8 },
    { n: 10, bad: 2 }
];

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setN: React.Dispatch<React.SetStateAction<string>>,
    setBad: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setN, setBad }) => {

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
        >
            {
                defaultInputs.map((defaultInput, i) =>
                    <MenuItem
                        key={i}
                        onClick={() => {
                            handleMenuClose();
                            setN(defaultInput.n + "");
                            setBad(defaultInput.bad + "");
                        }}
                        sx={{ width: "288px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            <Chip label={"n: " + defaultInput.n} variant="outlined" />
                        </ListItemText>
                        <ListItemText>
                            <Chip label={"bad: " + defaultInput.bad} variant="outlined" />
                        </ListItemText>
                    </MenuItem>
                )
            }
        </Menu >
    );
}

const Submit: React.FC<{
    n: string,
    bad: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ n, setAnchorEl, bad }) => {
    const { setState, setIndex, setBad, setN, setSteps } = useAlgoContext();

    const numN = +n;
    const numBad = +bad;
    const disabled: boolean = numN < 0 || numBad < 0 || numN < numBad;

    const handleSubmit = async () => {
        setN(numN);
        setBad(numBad);
        setIndex(0);
        setSteps(solution(numN, numBad));
        setAnchorEl(null);
        setState(State.Playing);
    };

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const [bad, setBad] = React.useState("");
    const [n, setN] = React.useState("");

    const reference = React.useRef(null);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setN(text);
    };

    const handleBadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setBad(text);
    };

    return (
        <>
            <Paper
                ref={reference}
                variant="elevation"
                elevation={8}
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    width: 280,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='n'
                    value={n}
                    onChange={handleNChange}
                    type='number'
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ width: 65 }}
                    placeholder='bad'
                    value={bad}
                    onChange={handleBadChange}
                    type="number"
                />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setBad("");
                    setN("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit n={n} bad={bad} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setN={setN}
                setBad={setBad}
            />
        </>
    );
}
