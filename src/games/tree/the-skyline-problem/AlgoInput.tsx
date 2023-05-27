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
import { Building, useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildHeap, } from "./styles";
import { buildLines, compareFn, buildSteps } from './algo';
import { SxProps } from '@mui/system';

const input1 = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]
const input2 = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]
const input3 = [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]

const randomColor = (): string => Math.floor(Math.random() * 16777215 + 1).toString(16);

const getRandomColor = (excludes: string[]): string => {
    let color = randomColor();
    while (color.length < 6 || excludes.indexOf(color) > -1) {
        color = randomColor();
    }
    return color;
}

const arrayToString = (buildings: number[][]): string => {
    return "[" + buildings.map(building => "[" + building.join(",") + "]").join(",") + "]";
}

export const buildDefaultStyles = (rows: number, cols: number): SxProps[][] => {
    const defaultStyle: SxProps = {
        border: "none",
        minWidth: "10px",
        minHeight: "10px",
        width: "15px",
        height: "15px"
    }

    const styles: SxProps[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: SxProps[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(defaultStyle);
        }
        styles.push(row);
    }

    return styles;
}

export const dummyBuilding: Building = { left: 0, right: 0, height: 0, };

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setNodes }) => {

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
                <ListItemText sx={{ width: "120px" }}>
                    buildings
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setNodes(arrayToString(item));
                        }}
                        sx={{ width: "458px", overflow: "hidden" }}
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

const buildStyles = (buildings: Building[]): SxProps[][] => {
    const rows = buildings.reduce((a, b) => (a.height > b.height) ? a : b, dummyBuilding).height;
    const cols = buildings.reduce((a, b) => (a.right > b.right) ? a : b, dummyBuilding).right + 1;

    const styles: SxProps[][] = buildDefaultStyles(rows, cols);
    const colors: string[] = [];

    buildings.forEach(building => {
        const { left, right, height } = building;
        const color = getRandomColor(colors);
        colors.push(color);
        for (let i = 0; i < height; i++) {
            const row = rows - 1 - i;
            for (let col = left; col < right; col++) {
                let style: SxProps = styles[row][col];
                style = { ...style, backgroundColor: "#" + color };
                const border = "1px solid #" + color;
                if (col === left) {
                    style = { ...style, borderLeft: border };
                }
                if (col === right - 1) {
                    style = { ...style, borderRight: border };
                }
                if (i === height - 1) {
                    style = { ...style, borderTop: border }
                }
                styles[row][col] = style;
            }
        }
    });

    return styles;
}

const Submit: React.FC<{
    nodes: string,
    setNodes: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nodes, setNodes, setAnchorEl }) => {
    const {
        scene,
        animate,
        cancelAnimate,
        setState,
        setBuildings,
        setLines,
        setSteps,
        setIndex,
        setMaxHeap,
        setSkyline,
        setBuildingsStyles,
        setHeapRoot,
        setPrevHeight
    } = useAlgoContext();

    const disabled = nodes.trim().length === 0;

    const handleSubmit = async () => {
        setAnchorEl(null);

        setState(State.Typing);
        setIndex(0);
        setSkyline([]);
        setPrevHeight(0);
        setHeapRoot(0);

        try {
            const array: number[][] = JSON.parse(nodes);

            const buildings: Building[] = array.map(building => {
                const [left, right, height] = building;
                return { left, right, height, }
            });
            setBuildings(buildings);

            const buildingsStyles = buildStyles(buildings);
            setBuildingsStyles(buildingsStyles);

            const lines = buildLines(buildings);
            lines.sort(compareFn);
            setLines(lines);

            const steps = buildSteps(lines);
            setSteps(steps);
        } catch (error) {
            console.error(error);
        }

        setNodes("");
        clearScene(scene);

        const maxHeap = buildHeap(scene, 4);
        setMaxHeap(maxHeap);

        animate();
        try {
            await wait(0.2);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setState(State.Ready);
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
                    width: 450,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1, }}
                    placeholder='buildings format: [left, right, height]'
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
