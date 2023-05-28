import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildTree, } from "./styles";

const input1 = { nums: [4, 6, 8, 2], k: 4 };
const input2 = { nums: [3, 5, 7, 9, 1], k: 4 };
const input3 = { nums: [8, 7, 5, 6, 4, 3, 2, 9], k: 5 };

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNums: React.Dispatch<React.SetStateAction<string>>,
    setK: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setNums, setK }) => {

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
            <MenuItem disabled>
                <ListItemIcon>
                    <MenuIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ width: "70px" }}>
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
                            setNums(item.nums.join(","));
                            setK(item.k + "");
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "70px" }}>
                            {item.nums.join(",")}
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

const parseInput = (input: string): (number)[] => {
    return input.split(",").map(ch => +ch);
}

const Submit: React.FC<{
    nums: string,
    k: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nums, setAnchorEl, k }) => {
    const { scene, animate, cancelAnimate, setState, setHeap, setK, setKthLargestValue } = useAlgoContext();

    const disabled = nums.trim().length === 0 || k.trim().length === 0 || +k === 0;

    const handleSubmit = async () => {
        setAnchorEl(null);
        setKthLargestValue(undefined);
        setState(State.Typing);
        const inputNums: number[] = parseInput(nums);
        const inputK: number = +k;
        setK(inputK);
        clearScene(scene);
        animate();
        try {
            await doSubmit(inputNums, inputK);
            await wait(0.2);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setState(State.Play);
    }

    const doSubmit = async (inputNums: number[], inputK: number) => {
        const heap = buildTree(scene, inputK);
        for (let i = 0; i < inputNums.length; i++) {
            await heap.push(inputNums[i]);
            const size = await heap.size();
            if (size > inputK) {
                await heap.pop();
            }
        }
        setHeap(heap);
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

    const [nums, setNums] = React.useState("");
    const [k, setK] = React.useState("");

    const handleNumsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums(e.currentTarget.value);
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
                    width: 400,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1, }}
                    placeholder='nums, seprate by ","'
                    value={nums}
                    onChange={handleNumsChange}
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
                    setNums("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit nums={nums} setAnchorEl={setAnchorEl} k={k} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setNums={setNums}
                setK={setK}
            />
        </>
    );
}
