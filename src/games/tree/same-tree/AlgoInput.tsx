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
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildPTree, buildQTree } from './styles';
import { buildSteps } from './algo';

const inputOne = {
    p: [3, 9, 2, 5, 6, 7, 1, 4, null, null, 8],
    q: [3, 9, 2, 5, 6, 7, 1, 4,]
}

const inputTwo = {
    p: [3, 9, 8, 5, 1, 2, 6, null, null, 7],
    q: [3, 9, 8, 5, 1, 2, 6, null, null, 4]
}

const inputThree = {
    p: [1, 2, 4, 8, 9, 5, 3, 6, 7],
    q: [1, 2, 4, 8, 9, 5, 0, 6, 7]
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
                    p
                </ListItemText>
                <ListItemText>
                    q
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setPreorder(item.p.join(","));
                            setInorder(item.q.join(","));
                        }}
                        sx={{ width: "508px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item.p.join(",")}
                        </ListItemText>
                        <ListItemText>
                            {item.q.join(",")}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const parseInput = (input: string): (string | null)[] => {
    return input.split(",").map(ch => {
        const c = ch.trim();
        switch (c) {
            case undefined: return null;
            case "": return null;
            case "null": return null;
            case "undefined": return null;
            default: return c;
        }
    })
}

const Submit: React.FC<{
    p: string,
    q: string,
    setP: React.Dispatch<React.SetStateAction<string>>,
    setQ: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ p, q, setP, setQ, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setP: setPRoot, setQ: setQRoot, setIndex, setFalseNodes, setSteps } = useAlgoContext();

    const disabled: boolean = p.trim().length === 0 || q.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        animate();
        clearScene(scene);

        const pRoot = buildPTree(parseInput(p), scene);
        const qRoot = buildQTree(parseInput(q), scene);
        const steps = buildSteps(pRoot, qRoot);
        setPRoot(pRoot);
        setQRoot(qRoot);
        setSteps(steps);

        setFalseNodes([]);
        setIndex(0);
        setP("");
        setQ("");
        setAnchorEl(null);

        await wait(0.3);
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

    const [p, setP] = React.useState("");
    const [q, setQ] = React.useState("");

    const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setP(text);
    }

    const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text: string = e.currentTarget.value;
        setQ(text);
    }

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
                    width: 500,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='p, seprate by ","'
                    value={p}
                    onChange={handlePChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='q, seprate by ","'
                    value={q}
                    onChange={handleQChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setP("");
                    setQ("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit p={p} q={q} setP={setP} setQ={setQ} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setPreorder={setP}
                setInorder={setQ}
            />
        </>
    );
}
