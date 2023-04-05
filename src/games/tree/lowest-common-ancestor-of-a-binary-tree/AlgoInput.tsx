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
import { buildSteps } from "./algo";
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildTree, pqColor } from "./styles";
import TreeNode from '../../../data-structures/tree/nodes/v1/node';

const input1 = {
    array: [15, 7, 30, 4, 9, 20, 35, 2, null, 8, 12, null, null, 32, 40],
    p: 8,
    q: 32
}

const input2 = {
    array: [15, 7, 30, 4, 9, 20, 35, 2, null, 8, 12, null, null, 32, 40],
    p: 9,
    q: 40
}

const input3 = {
    array: [15, 7, 30, 4, 9, 20, 35, 2, null, 8, 12, null, null, 32, 40],
    p: 4,
    q: 8
}

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    setP: React.Dispatch<React.SetStateAction<string>>,
    setQ: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setNodes, setP, setQ }) => {

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
                            const { array, p, q } = item;
                            handleMenuClose();
                            setNodes(array.join(","));
                            setP(p + "");
                            setQ(q + "");
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item.array.join(",")}
                        </ListItemText>
                        <ListItemText>
                            {item.p}
                        </ListItemText>
                        <ListItemText>
                            {item.q}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const parseInput = (input: string): (number | null)[] => {
    return input.split(",").map(ch => {
        const c = ch.trim();
        switch (c) {
            case "": return null;
            case "null": return null;
            case "undefined": return null;
            case undefined: return null;
            default: return +c;
        }
    });
}

const enablePQColor = (p: number, q: number, node?: TreeNode<number>) => {
    if (node === undefined) {
        return;
    }

    if (node.val.value === p || node.val.value === q) {
        node.sphereColor = pqColor;
    }

    enablePQColor(p, q, node.left);
    enablePQColor(p, q, node.right);

}

const findNode = (value: number, root?: TreeNode<number>,): TreeNode<number> | undefined => {
    if (root === undefined) {
        return undefined;
    }

    if (root.val.value === value) {
        return root;
    }

    return findNode(value, root.left) || findNode(value, root.right);
}

const Submit: React.FC<{
    nodes: string,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    p: string,
    setP: React.Dispatch<React.SetStateAction<string>>,
    q: string,
    setQ: React.Dispatch<React.SetStateAction<string>>
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nodes, p, q, setNodes, setP, setQ, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setRoot, setSteps, setIndex, setCommonAncestors } = useAlgoContext();

    const disabled = nodes.trim().length === 0 || p.trim().length === 0 || q.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        const array = parseInput(nodes);
        animate();
        clearScene(scene);
        const root = buildTree(array, scene);
        const steps = buildSteps(+p, +q, root);
        setRoot(root);
        setSteps(steps);
        enablePQColor(+p, +q, root);
        const pNode = findNode(+p, root);
        const qNode = findNode(+q, root);
        if (pNode) {
            setCommonAncestors(nodes => {
                nodes.push(pNode);
                return nodes;
            });
        }
        if (qNode) {
            setCommonAncestors(nodes => {
                nodes.push(qNode);
                return nodes;
            });
        }
        setIndex(0);
        setNodes("");
        setP("");
        setQ("");
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

    const [nodes, setNodes] = React.useState("");
    const [p, setP] = React.useState("");
    const [q, setQ] = React.useState("");

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodes(e.currentTarget.value);
    };

    const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setP(e.currentTarget.value);
    };

    const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQ(e.currentTarget.value);
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
                    width: 500,
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
                    sx={{ ml: 1, width: 50, }}
                    placeholder='p'
                    value={p}
                    onChange={handlePChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ ml: 1, width: 50, }}
                    placeholder='q'
                    value={q}
                    onChange={handleQChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setNodes("");
                    setP("");
                    setQ("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit nodes={nodes} setNodes={setNodes} p={p} q={q} setP={setP} setQ={setQ} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setNodes={setNodes}
                setP={setP}
                setQ={setQ}
            />
        </>
    );
}
