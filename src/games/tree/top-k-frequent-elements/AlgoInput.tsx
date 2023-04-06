import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
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

const input1 = { array: [3, 3, 3, 1, 1, 2, 2, 2, 3], k: 2 };
const input2 = { array: [3, 3, 3, 6, 1, 6, 1, 2, 6, 2, 2, 3, 6], k: 3 };
const input3 = { array: [2, 8, 5, 6, 1, 3, 1, 2, 2, 3, 5], k: 4 };

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    setK: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setNodes, setK }) => {

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
                            setNodes(item.array.join(","));
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

const parseInput = (input: string): (number)[] => {
    return input.split(",").map(ch => +ch);
}

const Submit: React.FC<{
    nodes: string,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    k: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nodes, setNodes, setAnchorEl, k }) => {
    const { scene, animate, cancelAnimate, setState, setHeap, setK, setMap, setNums, setIndex, setMapIndex, setResult } = useAlgoContext();

    const disabled = nodes.trim().length === 0 || k.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        const array = parseInput(nodes);
        animate();
        clearScene(scene);
        setK(+k);
        setNums(array);
        setIndex(-1);
        setMapIndex(-1);
        setResult([]);
        setHeap(buildTree(array, scene, +k));
        setNodes("");
        setMap(new Map<number, number>());
        await wait(0.2);
        cancelAnimate();
        setState(State.Count);
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

    const [nodes, setNodes] = React.useState("");
    const [k, setK] = React.useState("");

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodes(e.currentTarget.value);
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
                    placeholder='Tree nodes, seprate by ","'
                    value={nodes}
                    onChange={handleNodesChange}
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
                    setNodes("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit nodes={nodes} setNodes={setNodes} setAnchorEl={setAnchorEl} k={k} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setNodes={setNodes}
                setK={setK}
            />
        </>
    );
}
