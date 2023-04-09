import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { maxSlidingWindow } from "./algo";

const input1 = { array: [15, 7, 30, 4, 9, 10, 2, 11, 8], k: 3 };
const input2 = { array: [10, 7, 18, 5, 9, 14, 16, 4, 6, 17, 15], k: 4 };
const input3 = { array: [12, 8, 15, 6, 10, 13, 17, 4], k: 3 };

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setK: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setValue, setK }) => {

    const buildInInputs = [
        input1,
        input2,
        input3,
    ];

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <ListItemIcon>
                    <DoNotDisturbIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ width: "120px" }}>
                    nums
                </ListItemText>
                <ListItemText>
                    k
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setValue(item.array.join(","));
                            setK(item.k + "");
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "120px" }}>
                            {item.array.join(",")}
                        </ListItemText>
                        <ListItemText>
                            {item.k}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const parseInput = (input: string): number[] => {
    return input.split(",")
        .map(ch => ch.trim())
        .map(ch => +ch);
}

const Submit: React.FC<{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    k: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl, k }) => {
    const { setState, setInput, setIndex, setSteps, setK } = useAlgoContext();

    const disabled = value.trim().length === 0 || k.trim().length === 0 || +k === 0;


    const handleSubmit = async () => {
        const input = parseInput(value);
        setState(State.Typing);
        setK(+k);
        setInput(input);
        setIndex(0);
        setSteps(maxSlidingWindow(input, +k));
        setValue("");
        setAnchorEl(null);
        setState(State.Playing);
    }

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

    const [value, setValue] = React.useState("");
    const [k, setK] = React.useState("");

    const reference = React.useRef(null);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setValue(text);
    };

    const handleKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setK(e.currentTarget.value);
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
                    width: 400,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='nums, seprate by ","'
                    value={value}
                    onChange={handleValueChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ width: 60 }}
                    placeholder='K'
                    value={k}
                    onChange={handleKChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setValue("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit value={value} setValue={setValue} setAnchorEl={setAnchorEl} k={k} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setValue={setValue}
                setK={setK}
            />
        </>
    );
}
