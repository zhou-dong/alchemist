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
import MenuIcon from '@mui/icons-material/Menu';
import { State } from './AlgoState';
import { useAlgoContext } from "./AlgoContext";
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildMinHeap } from './styles';

const input1 = { nums1: [1, 2, 5, 7], nums2: [2, 4, 6, 8], k: 4 };
const input2 = { nums1: [1, 5, 8], nums2: [2, 6, 9], k: 6 };
const input3 = { nums1: [1, 3, 5, 6, 9], nums2: [2, 3, 4, 8, 9], k: 7 };

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNums1: React.Dispatch<React.SetStateAction<string>>,
    setNums2: React.Dispatch<React.SetStateAction<string>>,
    setK: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setNums1, setNums2, setK }) => {

    const buildInInputs = [
        input1,
        input2,
        input3
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
            <MenuItem disabled>
                <ListItemIcon>
                    <MenuIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ width: "100px" }}>
                    nums1
                </ListItemText>
                <ListItemText sx={{ width: "100px" }}>
                    nums2
                </ListItemText>
                <ListItemText sx={{ width: 60 }}>
                    K
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setNums1(item.nums1.join(","));
                            setNums2(item.nums2.join(","));
                            setK(item.k + "");
                        }}
                        sx={{ width: "488px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "100px" }}>
                            {item.nums1.join(",")}
                        </ListItemText>
                        <ListItemText sx={{ width: "100px" }}>
                            {item.nums2.join(",")}
                        </ListItemText>
                        <ListItemText sx={{ width: 60 }}>
                            {item.k}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const parseNums = (nums: string): number[] => {
    try {
        return nums.split(",").map(ch => ch.trim()).map(num => +num)
    } catch (error) {
        console.log(error);
        return [];
    }
}

const Submit: React.FC<{
    nums1: string,
    nums2: string,
    k: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nums1, nums2, k, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setMinHeap, setK, setCurrent, setResults, setNums1, setNums2, setSeen } = useAlgoContext();

    const disabled = nums1.trim().length === 0 || nums2.trim().length === 0 || k.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        animate();
        clearScene(scene);
        setSeen(new Set());
        setNums1(parseNums(nums1));
        setNums2(parseNums(nums2));
        setK(+k);
        const minHeap = buildMinHeap(5, scene);
        setMinHeap(minHeap);
        setResults([]);
        setCurrent({ x: 0, y: 0 });
        await wait(0.2);
        cancelAnimate();
        setState(State.BuildingHeap);
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

    const [nums1, setNums1] = React.useState("");
    const [nums2, setNums2] = React.useState("");
    const [k, setK] = React.useState("");

    const handleNums1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums1(e.currentTarget.value);
    };

    const handleNums2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums2(e.currentTarget.value);
    };

    const handleKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setK(e.currentTarget.value);
    };

    const reference = React.useRef(null);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
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
                    width: 480,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1, }}
                    placeholder="nums1"
                    value={nums1}
                    onChange={handleNums1Change}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ ml: 1, flex: 1, }}
                    placeholder="nums2"
                    value={nums2}
                    onChange={handleNums2Change}
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
                    setNums1("");
                    setNums2("");
                    setK("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit nums1={nums1} nums2={nums2} k={k} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setNums1={setNums1}
                setNums2={setNums2}
                setK={setK}
            />
        </>
    );
}
