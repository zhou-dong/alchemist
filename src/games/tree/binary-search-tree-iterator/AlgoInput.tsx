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
import { buildTree, } from "./styles";
import { duration, minShellSize, stackPosition } from "./stackStyles";
import StackShellBuilder from "./stackShellBuilder";
import Stack from '../../../data-structures/stack';
import StackName from './stackName';
import TreeNode from '../../../data-structures/tree/nodes/v1/node';
import StackItemBuilder from './stackItemBuilder';

const input2 = [8, 5, 11, 4, 7, 10, 13, null, null, 6, null, 9, null, 12];
const input1 = [8, 5, 11, 4, 7, 10, 13, 3, null, 6, null, 9, null, 12];

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNodes: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setNodes }) => {

    const buildInInputs = [
        input1,
        input2,
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
                            setNodes(item.join(","));
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "180px" }}>
                            {item.join(",")}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const parseInput = (input: string): (string | null)[] => {
    return input.split(",").map(ch => {
        switch (ch.trim()) {
            case "": return null;
            case "null": return null;
            case "undefined": return null;
            case undefined: return null;
            default: return ch.trim();
        }
    });
}

const Submit: React.FC<{
    nodes: string,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nodes, setNodes, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setRoot, setStackName, setTreeNodeStack, setStack } = useAlgoContext();

    const disabled = nodes.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        const array = parseInput(nodes);
        animate();
        clearScene(scene);
        const root = buildTree(array, scene);
        const stack = new Stack<string>(stackPosition.stack, duration);
        const treeNodeStack: TreeNode<string>[] = [];
        initStackShell(stack);
        setStack(stack);
        setTreeNodeStack(treeNodeStack);
        setStackName(new StackName("Stack", stackPosition.name, scene));
        setRoot(root);
        if (root) {
            await pushToStack(stack, treeNodeStack, root, scene);
        }
        setNodes("");
        setAnchorEl(null);
        await wait(0.2);
        cancelAnimate();
        setState(State.Playing);
    }

    const initStackShell = (stack: Stack<string>) => {
        for (let i = 0; i < minShellSize; i++) {
            stack.increaseShells(new StackShellBuilder(scene, true).build());
        }
    }

    const pushToStack = async (stack: Stack<string>, treeNodeStack: TreeNode<string>[], node: TreeNode<string>, scene: THREE.Scene) => {
        treeNodeStack.push(node);
        const stackItem = new StackItemBuilder(node.val.value, scene, true).build();
        await stack.push(stackItem);
        if (node.left) {
            await pushToStack(stack, treeNodeStack, node.left, scene);
        }
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

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodes(e.currentTarget.value);
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

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setNodes("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit nodes={nodes} setNodes={setNodes} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setNodes={setNodes}
            />
        </>
    );
}
