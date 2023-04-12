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
import MenuIcon from '@mui/icons-material/Menu';
import { State } from './AlgoState';
import { useAlgoContext } from "./AlgoContext";
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildMinHeap } from './styles';

const input1 = { matrix: [[1, 4, 7], [2, 5, 8], [3, 6, 9]], k: 4 };
const input2 = { matrix: [[1, 5, 8], [2, 6, 9], [4, 6, 9]], k: 6 };
const input3 = { matrix: [[1, 5, 8, 9], [2, 6, 9, 12], [4, 6, 10, 15], [7, 7, 11, 19]], k: 7 };

const arrayToString = (input: number[][]): string => {
    return "[" + input.map(a => "[" + a.join(",") + "]").join(",") + "]";
};

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setMatrix: React.Dispatch<React.SetStateAction<string>>,
    setK: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setMatrix, setK }) => {

    const buildInInputs = [
        input1,
        input2,
        input3
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
                    Sorted Matrix
                </ListItemText>
                <ListItemText>
                    K
                </ListItemText>
            </MenuItem>
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setMatrix(arrayToString(item.matrix));
                            setK(item.k + "");
                        }}
                        sx={{ width: "488px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "120px" }}>
                            {arrayToString(item.matrix)}
                        </ListItemText>
                        <ListItemText>
                            {item.k}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </Menu >
    );
}

const Submit: React.FC<{
    matrix: string,
    k: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ matrix: inputString, k, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setMinHeap, setK, setMatrix, setCurrent, setCompleted, setResult } = useAlgoContext();

    const disabled = inputString.trim().length === 0 || k.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        animate();
        clearScene(scene);
        const matrix: number[][] = JSON.parse(inputString);
        const minHeap = buildMinHeap(matrix.length, scene);
        setMinHeap(minHeap);
        setMatrix(matrix);
        setK(+k);
        setResult(undefined);
        setCurrent({ row: 0, col: 0 });
        setCompleted([]);
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

    const [matrix, setMatrix] = React.useState("");
    const [k, setK] = React.useState("");

    const handleMatrixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatrix(e.currentTarget.value);
    };

    const handleKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setK(e.currentTarget.value);
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
                    placeholder={`Matrix, for example: ${arrayToString(input1.matrix)}`}
                    value={matrix}
                    onChange={handleMatrixChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ width: 60 }}
                    placeholder='K'
                    value={k}
                    onChange={handleKChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                    setMatrix("");
                    setK("");
                }}>
                    <ClearIcon />
                </IconButton>

                <Submit matrix={matrix} k={k} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setMatrix={setMatrix}
                setK={setK}
            />
        </>
    );
}
