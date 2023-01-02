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
    postorder: [9, 1, 6, 7, 5, 3, 0, 4, 8],
    inorder: [9, 5, 1, 7, 6, 8, 4, 3, 0]
}

const inputTwo = {
    postorder: [4, 8, 9, 5, 2, 0, 6, 7, 3, 1],
    inorder: [4, 2, 8, 5, 9, 1, 6, 0, 3, 7]
}

const inputThree = {
    postorder: [9, 6, 5, 7, 2, 3],
    inorder: [9, 3, 5, 6, 2, 7]
}

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setInorder: React.Dispatch<React.SetStateAction<string>>,
    setPostorder: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setPostorder, setInorder }) => {

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
                    inorder
                </ListItemText>
                <ListItemText>
                    postorder
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setInorder(item.inorder.join(""));
                            setPostorder(item.postorder.join(""));
                        }}
                        sx={{ width: "508px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item.inorder.join(" ")}
                        </ListItemText>
                        <ListItemText>
                            {item.postorder.join(" ")}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const Submit: React.FC<{
    inorder: string,
    setInorder: React.Dispatch<React.SetStateAction<string>>,
    postorder: string,
    setPostorder: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ postorder, inorder, setPostorder, setInorder, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setInputOutput, setIndex, setMap } = useAlgoContext();

    const disabled: boolean = postorder.length === 0 || inorder.length === 0 || postorder.length !== inorder.length;

    const handleSubmit = async () => {
        setState(State.Typing);
        animate();

        clearScene(scene);
        const i: number[] = inorder.split("").map(num => parseInt(num));
        const p: number[] = postorder.split("").map(num => parseInt(num));

        setInputOutput(buildTree(i, p, scene));
        setMap(new Map());
        setIndex(0);
        setInorder("");
        setPostorder("");
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

    const [inorder, setInorder] = React.useState("");
    const [postorder, setPostorder] = React.useState("");

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handlePostorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setPostorder(text);
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
                    placeholder="inorder"
                    value={inorder}
                    onChange={handleInorderChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="postorder"
                    value={postorder}
                    onChange={handlePostorderChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setInorder("");
                    setPostorder("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit postorder={postorder} inorder={inorder} setPostorder={setPostorder} setInorder={setInorder} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setPostorder={setPostorder}
                setInorder={setInorder}
            />
        </>
    );
}
