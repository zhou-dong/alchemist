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
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { searchInsert } from './algo';

const target = 12;
const nums = [1, 3, 5, 6, 7, 8, 10, 12, 15, 20, 21, 22, 24, 33];

const displayNums = (nums: number[]): string => {
    return "[" + nums.join(",") + "]";
};

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setTarget: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setValue, setTarget }) => {

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    setValue(displayNums(nums));
                    setTarget(target + "");
                }}
                sx={{ width: "508px", overflow: "hidden" }}
            >
                <ListItemIcon>
                    <InputIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ width: "165px", }}>
                    {displayNums(nums)}
                </ListItemText>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <ListItemText>
                    {target}
                </ListItemText>
            </MenuItem>
        </Menu >
    );
}

const Submit: React.FC<{
    value: string,
    target: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl, target }) => {
    const { setState, setIndex, setSteps, setTarget, setNums } = useAlgoContext();

    let disabled: boolean = value.length === 0 || target.length === 0;
    let nums: number[] = [];
    try {
        if (value.length > 0) {
            nums = JSON.parse(value);
        }
        disabled = nums.length === 0 || target.length === 0;
    } catch (error) {
        disabled = true;
    }

    const handleSubmit = async () => {
        setIndex(0);
        setNums(nums);
        setTarget(+target);
        setSteps(searchInsert(nums, +target));
        setValue("");
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

    const [value, setValue] = React.useState("");
    const [target, setTarget] = React.useState("");

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

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setTarget(text);
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
                    width: 500,
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
                    sx={{ width: 65 }}
                    placeholder='target'
                    value={target}
                    onChange={handleTargetChange}
                    type="number"
                />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setValue("");
                    setTarget("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit value={value} setValue={setValue} setAnchorEl={setAnchorEl} target={target} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setValue={setValue}
                setTarget={setTarget}
            />
        </>
    );
}
