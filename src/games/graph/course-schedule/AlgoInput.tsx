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
import { Graph, SimpleDirectedGraph } from '../../../data-structures/graph';
import { edgeColor, nodeOriginalSkinColor, nodeOriginalTextColor } from './styles';

const input1 = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3]];
const input2 = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 0]];
const input3 = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [4, 0]];
const input4 = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [4, 2]];

const displayMatrix = (matrix: number[][]): string => {
    return "[" + matrix.map(array => "[" + array.join(",") + "]").join(",") + "]";
};

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setValue, }) => {

    const buildInInputs = [input1, input2, input3, input4];

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
                            setValue(displayMatrix(item));
                        }}
                        sx={{ width: "408px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {displayMatrix(item)}
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
    const { scene, animate, cancelAnimate, setState, setVisitedSet, setGraph } = useAlgoContext();

    let disabled: boolean = value.length === 0;
    let matrix: number[][] = [];
    try {
        if (value.length > 0) {
            matrix = JSON.parse(value);
            matrix = matrix.map(array => array.reverse());
        }
    } catch (error) {
        disabled = true;
    }

    const handleSubmit = async () => {
        setState(State.Typing);
        setValue("");
        setAnchorEl(null);
        setVisitedSet(new Set());
        clearScene(scene);

        const grpah: Graph<number> = new SimpleDirectedGraph<number>(
            nodeOriginalSkinColor,
            nodeOriginalTextColor,
            edgeColor,
            matrix,
            scene,
        );

        setGraph(grpah);
        animate();
        try {
            grpah.show();
            await wait(0.2);
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();
        setState(State.Playing);
    };

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
