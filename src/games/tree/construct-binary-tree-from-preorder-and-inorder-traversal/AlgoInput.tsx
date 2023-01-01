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
import { buildTree } from "./algo";
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';

const inputOne = {
    preorder: [1, 2, 4, 8, 9, 5, 3, 6, 7],
    inorder: [8, 4, 9, 2, 5, 1, 6, 3, 7]
}

const inputTwo = {
    preorder: [3, 9, 8, 5, 1, 2, 6, 7],
    inorder: [5, 8, 1, 9, 3, 6, 2, 7]
}

const inputThree = {
    preorder: [3, 9, 2, 5, 6, 7],
    inorder: [9, 3, 5, 6, 2, 7]
}

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setPreorder: React.Dispatch<React.SetStateAction<string>>,
    setInorder: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setPreorder, setInorder }) => {

    const buildInInputs = [
        inputOne,
        inputTwo,
        inputThree
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
            <MenuItem sx={{ width: "508px", overflow: "hidden" }}  >
                <ListItemIcon>
                    {/* <InputIcon fontSize="small" /> */}
                </ListItemIcon>
                <ListItemText>
                    preorder
                </ListItemText>
                <ListItemText>
                    inorder
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setPreorder(item.preorder.join(""));
                            setInorder(item.inorder.join(""));
                        }}
                        sx={{ width: "508px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item.preorder.join(" ")}
                        </ListItemText>
                        <ListItemText>
                            {item.inorder.join(" ")}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const Submit: React.FC<{
    preorder: string,
    inorder: string,
    setPreorder: React.Dispatch<React.SetStateAction<string>>,
    setInorder: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ preorder, inorder, setPreorder, setInorder, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setInputOutput, setIndex, setMap } = useAlgoContext();


    const disabled: boolean = preorder.length === 0 || inorder.length === 0 || preorder.length !== inorder.length;

    const handleSubmit = async () => {
        setState(State.Typing);
        animate();

        clearScene(scene);
        const p: number[] = preorder.split("").map(num => parseInt(num));
        const i: number[] = inorder.split("").map(num => parseInt(num));
        setInputOutput(buildTree(p, i, scene));
        setMap(new Map());
        setIndex(0);
        setInorder("");
        setPreorder("");
        setAnchorEl(null);

        await wait(0.2);
        cancelAnimate();
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

    const reference = React.useRef(null);

    const [preorder, setPreorder] = React.useState("");
    const [inorder, setInorder] = React.useState("");

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handlePreorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setPreorder(text);
    }

    const handleInorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setInorder(text);
    }

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
                    placeholder="preorder"
                    value={preorder}
                    onChange={handlePreorderChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="inorder"
                    value={inorder}
                    onChange={handleInorderChange}
                    type="number"
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setPreorder("");
                    setInorder("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit preorder={preorder} inorder={inorder} setPreorder={setPreorder} setInorder={setInorder} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setPreorder={setPreorder}
                setInorder={setInorder}
            />
        </>
    );
}
