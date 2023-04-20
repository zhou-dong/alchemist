import * as React from 'react';
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
import InputIcon from '@mui/icons-material/Input';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildTree, } from "./styles";

const sentences: string[] = [
    "apple orange banana apple grapefruit orange orange banana apple banana apple",
    "the cat in the hat sat on the mat with the cat and the hat and the mat",
    "how much wood would a wood chuck chuck if a wood chuck could chuck wood a wood chuck would chuck all the wood he could if a woodchuck could chuck wood"
].map(sentence => sentence.replaceAll(",", ""));

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setWords: React.Dispatch<React.SetStateAction<string>>,
}> = ({ anchorEl, setAnchorEl, open, setWords }) => {

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const MenuItems = () => (
        <>
            {
                sentences.map((sentence, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setWords(sentence)
                        }}
                        sx={{ width: "608px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText sx={{ width: "120px" }}>
                            {sentence}
                        </ListItemText>
                    </MenuItem>
                ))
            }
        </>
    );

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
        >
            <MenuItem disabled>
                <ListItemIcon>
                    <MenuIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText sx={{ width: "120px" }}>
                    sentence
                </ListItemText>
            </MenuItem>
            <MenuItems />
        </Menu>
    );
};

const Submit: React.FC<{
    words: string,
    k: number,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ words, setAnchorEl, k }) => {
    const { scene, animate, cancelAnimate, setState, setHeap, setK, setMap, setHeapItemsIndex, setResult, setWords, setWordsIndex } = useAlgoContext();

    const disabled = words.trim().length === 0 || k <= 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        const array: string[] = words.trim().split(" ");
        setWords(array);
        setWordsIndex(0);
        setK(k);
        setMap(new Map<string, number>());
        setHeapItemsIndex(-1);
        setResult([]);
        animate();
        clearScene(scene);
        setHeap(buildTree(scene, k + 1));
        await wait(0.2);
        cancelAnimate();
        setState(State.Count);
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

    const [words, setWords] = React.useState("");
    const [k, setK] = React.useState(3);

    const handleNodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWords(e.currentTarget.value);
    };

    const handleKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        if (value > 0) {
            setK(value);
        }
    };

    const reference = React.useRef(null);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handleClear = () => {
        setWords("");
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
                    width: 600,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1, }}
                    placeholder='words'
                    value={words}
                    onChange={handleNodesChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <InputBase
                    sx={{ width: 35 }}
                    placeholder='K'
                    value={k}
                    onChange={handleKChange}
                    type="number"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleClear}>
                    <ClearIcon />
                </IconButton>

                <Submit words={words} setAnchorEl={setAnchorEl} k={k} />
            </Paper >

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setWords={setWords}
            />
        </>
    );
}
