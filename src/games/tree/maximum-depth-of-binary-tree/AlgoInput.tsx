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
import { buildBinaryTree } from "../../../data-structures/tree/binaryTreeBuilder";
import {
    sphereGeometry,
    sphereMaterial,
    textMaterial,
    textGeometryParameters,
    lineMaterial,
    yDistance,
    center,
    xAxisAplha,
    duration,
    enabledSphereColor,
    depthTreeCenter
} from "./styles";
import TreeNode from '../../../data-structures/tree/node';

const inputOne = [3, 9, 20, null, null, 15, 7];
const inputTwo = [1, 2, 3, 4, 5, null, 7];
const inputThree = [3, 9, 2, 5, 6, 7, 1, 4, 8];

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setValue, }) => {

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
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setValue(item.join(","));
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item.join(",")}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const clearTreeValue = (node: TreeNode<any> | undefined) => {
    if (node === undefined) {
        return
    }
    node.val.value = "";
    clearTreeValue(node.left);
    clearTreeValue(node.right);
}

const Submit: React.FC<{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setRoot, setSteps, setIndex, setDepthTree, setDepthTreeSteps } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        const array = value.split(",").map(ch => {
            switch (ch) {
                case "": return null;
                case "null": return null;
                case "undefined": return null;
                default: return ch;
            }
        });

        animate();
        clearScene(scene);

        const root = buildBinaryTree<string | null>(
            sphereGeometry,
            sphereMaterial,
            textMaterial,
            textGeometryParameters,
            lineMaterial,
            scene,
            duration,
            center,
            yDistance,
            xAxisAplha,
            array,
            true
        );

        const depthTree = buildBinaryTree<string | null>(
            sphereGeometry,
            sphereMaterial,
            textMaterial,
            textGeometryParameters,
            lineMaterial,
            scene,
            duration,
            depthTreeCenter,
            yDistance,
            xAxisAplha,
            array,
            true
        );

        clearTreeValue(depthTree);

        if (root && depthTree) {
            setRoot(root);
            const steps = buildSteps(root);
            root.sphereColor = enabledSphereColor;
            setSteps(steps);

            setDepthTree(depthTree);
            const depthTreeSteps = buildSteps(depthTree);
            depthTree.sphereColor = enabledSphereColor;
            setDepthTreeSteps(depthTreeSteps);

            setIndex(1);
        }

        setValue("");
        setAnchorEl(null);
        await wait(0.2);
        cancelAnimate();
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={value.length === 0}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const [value, setValue] = React.useState("");

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
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Tree nodes, seprate by ","'
                    value={value}
                    onChange={handleValueChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setValue("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit value={value} setValue={setValue} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setValue={setValue}
            />
        </>
    );
}
