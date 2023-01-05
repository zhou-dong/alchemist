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
} from "./styles";
import Position from '../../../data-structures/_commons/params/position';
import { buildSteps } from './algo';

const inputOne = [10, 7, 18, 5, 9, 14, 25, 4, 6, null, null, 11, 15];

const inputTwo = [5, 8, 1, 9, 3, 6, 2, 7];

const inputThree = [9, 3, 5, 6, 2, 7];

const buildTree = (array: (number | null)[], scene: THREE.Scene, startPosition: Position) => {
    return buildBinaryTree<number>(
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        lineMaterial,
        scene,
        duration,
        startPosition,
        yDistance,
        xAxisAplha,
        array,
        true
    );
}

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setValue }) => {

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

const Submit: React.FC<{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ value, setValue, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setSteps, setIndex, } = useAlgoContext();

    const disabled: boolean = value.length === 0 || value.trim().length === 0;

    const handleSubmit = async () => {
        if (value.trim().length === 0) {
            return;
        }

        setState(State.Typing);
        animate();
        clearScene(scene);

        const array: (number | null)[] = value.split(",").map(num => {
            switch (num.trim()) {
                case "": return null;
                case undefined: return null;
                case null: return null;
                case "undefined": return null;
                case "null": return null;
                default: return +(num);
            }
        });

        const root = buildTree(array, scene, center);
        const steps = buildSteps(root);
        setSteps(steps);
        setIndex(0);
        setValue("");
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
    const [value, setValue] = React.useState("");
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
                    width: 400,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Tree, seprate by ","'
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
