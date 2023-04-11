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
import { ListNode, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildMinHeap } from './styles';

const input1 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
const input2 = [[1, 5, 8], [2, 3, 9], [4, 6, 7]];
const input3 = [[2, 5], [1, 6], [3, 5, 8], [2, 4, 9], [3, 4, 7]];

const arrayToString = (input: number[][]): string => {
    return "[" + input.map(a => "[" + a.join(",") + "]").join(",") + "]";
};

const buildLists = (input: string): ListNode[] => {
    const lists: ListNode[] = [];
    const nums: number[][] = JSON.parse(input);
    let i = 0;
    nums.forEach(array => {
        const head = new ListNode(-1, -1);
        let tail = head;
        array.forEach(num => {
            tail.next = new ListNode(i, num);
            tail = tail.next;
            i++
        });
        if (head.next) {
            lists.push(head.next);
        }
    })
    return lists;
};

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setLists: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setLists }) => {

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
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setLists(arrayToString(item));
                        }}
                        sx={{ width: "488px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "120px" }}>
                            {arrayToString(item)}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const Submit: React.FC<{
    lists: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ lists, setAnchorEl }) => {
    const { setLists, scene, animate, cancelAnimate, setState, setMinHeap, setResults, setKey } = useAlgoContext();

    const disabled = lists.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        const list = buildLists(lists)
        setLists(list);
        setKey(-1);
        setResults([]);
        animate();
        clearScene(scene);
        const minHeap = buildMinHeap(list.length, scene);
        setMinHeap(minHeap);
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

    const [lists, setLists] = React.useState("");

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLists(e.currentTarget.value);
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
                    placeholder={`lists, for example: ${arrayToString(input1)}`}
                    value={lists}
                    onChange={handleNodesChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setLists("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit lists={lists} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setLists={setLists}
            />
        </>
    );
}
